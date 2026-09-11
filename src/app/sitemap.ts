import { MetadataRoute } from 'next';
import { supabaseAdmin } from '../lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.emham.my.id';

  // Fetch all projects to include their dynamic URLs
  let projectUrls: MetadataRoute.Sitemap = [];
  try {
    const { data: projects } = await supabaseAdmin
      .from('Project')
      .select('id, slug, updatedAt');

    if (projects) {
      projectUrls = projects.map((project) => ({
        url: `${baseUrl}/project/${project.slug || project.id}`,
        lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    }
  } catch (err) {
    console.error('Error generating dynamic sitemap:', err);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...projectUrls,
  ];
}
