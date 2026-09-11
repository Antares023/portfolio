import { notFound } from 'next/navigation';
import { supabaseAdmin } from '../../../lib/supabase';
import ProjectDetailView from './ProjectDetailView';

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slugOrId = resolvedParams.slug;

  // First, try to fetch by slug (for pretty URLs if they exist)
  let { data: project } = await supabaseAdmin
    .from('Project')
    .select('*')
    .eq('slug', slugOrId)
    .single();

  // If not found by slug, try fetching by ID (which is what MilestoneItem currently passes)
  if (!project) {
    const { data: projectById } = await supabaseAdmin
      .from('Project')
      .select('*')
      .eq('id', slugOrId)
      .single();
      
    project = projectById;
  }

  if (!project) {
    return notFound();
  }

  // Tags are stored as JSONB array of strings in Supabase, parse them if they are stringified
  let parsedTags = project.tags;
  if (typeof parsedTags === 'string') {
    try {
      parsedTags = JSON.parse(parsedTags);
    } catch(e) {
      parsedTags = [];
    }
  }

  let parsedScreenshots = project.screenshots;
  if (typeof parsedScreenshots === 'string') {
    try {
      parsedScreenshots = JSON.parse(parsedScreenshots);
    } catch(e) {
      parsedScreenshots = [];
    }
  }
  
  let parsedHighlights = project.highlights;
  if (typeof parsedHighlights === 'string') {
    try {
      parsedHighlights = JSON.parse(parsedHighlights);
    } catch(e) {
      parsedHighlights = [];
    }
  }

  const projectProps = {
    ...project,
    tags: Array.isArray(parsedTags) ? parsedTags : [],
    screenshots: Array.isArray(parsedScreenshots) ? parsedScreenshots : [],
    highlights: Array.isArray(parsedHighlights) ? parsedHighlights : [],
  };

  return <ProjectDetailView project={projectProps} />;
}
