"use server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Basic implementation without image upload for now
  const screenshotsRaw = formData.get('screenshots') as string;
  const screenshots = screenshotsRaw ? JSON.parse(screenshotsRaw) : [];

  const { error } = await supabaseAdmin.from('Project').insert({
    slug,
    title,
    date: formData.get('date') as string,
    category: formData.get('category') as string,
    status: formData.get('status') as string,
    shortDescription: formData.get('shortDescription') as string,
    overview: formData.get('overview') as string,
    repoUrl: formData.get('repoUrl') as string,
    codeSnippet: formData.get('codeSnippet') as string,
    codeLanguage: formData.get('codeLanguage') as string,
    highlights: (formData.get('highlights') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
    tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
    screenshots,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin-internal');
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const screenshotsRaw = formData.get('screenshots') as string;
  const screenshots = screenshotsRaw ? JSON.parse(screenshotsRaw) : [];

  // 1. Fetch old project to compare screenshots
  const { data: oldProject } = await supabaseAdmin.from('Project').select('screenshots').eq('id', id).single();
  
  // 2. Cleanup orphaned images
  if (oldProject?.screenshots) {
    let oldScreenshots = oldProject.screenshots;
    if (typeof oldScreenshots === 'string') {
      try { oldScreenshots = JSON.parse(oldScreenshots); } catch(e) { oldScreenshots = []; }
    }
    
    // Find URLs that exist in old but not in new
    const removedUrls = oldScreenshots.filter((url: string) => !screenshots.includes(url));
    
    if (removedUrls.length > 0) {
      // Extract file paths from public URLs
      // URL format: https://.../storage/v1/object/public/portfolio-assets/projects/filename.png
      const pathsToRemove = removedUrls.map((url: string) => {
        const parts = url.split('portfolio-assets/');
        return parts.length > 1 ? parts[1] : null;
      }).filter(Boolean) as string[];

      if (pathsToRemove.length > 0) {
        await supabaseAdmin.storage.from('portfolio-assets').remove(pathsToRemove);
      }
    }
  }

  const { error } = await supabaseAdmin.from('Project').update({
    slug,
    title,
    date: formData.get('date') as string,
    category: formData.get('category') as string,
    status: formData.get('status') as string,
    shortDescription: formData.get('shortDescription') as string,
    overview: formData.get('overview') as string,
    repoUrl: formData.get('repoUrl') as string,
    codeSnippet: formData.get('codeSnippet') as string,
    codeLanguage: formData.get('codeLanguage') as string,
    highlights: (formData.get('highlights') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
    tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
    screenshots,
  }).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin-internal');
}

export async function deleteProject(id: string) {
  // 1. Fetch project to cleanup images
  const { data: project } = await supabaseAdmin.from('Project').select('screenshots').eq('id', id).single();
  
  if (project?.screenshots) {
    let screenshots = project.screenshots;
    if (typeof screenshots === 'string') {
      try { screenshots = JSON.parse(screenshots); } catch(e) { screenshots = []; }
    }
    
    if (screenshots.length > 0) {
      const pathsToRemove = screenshots.map((url: string) => {
        const parts = url.split('portfolio-assets/');
        return parts.length > 1 ? parts[1] : null;
      }).filter(Boolean) as string[];

      if (pathsToRemove.length > 0) {
        await supabaseAdmin.storage.from('portfolio-assets').remove(pathsToRemove);
      }
    }
  }

  const { error } = await supabaseAdmin.from('Project').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath('/');
  revalidatePath('/admin-internal');
}
