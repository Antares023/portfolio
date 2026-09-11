import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '../../../lib/supabase';
import ProjectDetailView from './ProjectDetailView';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugOrId = resolvedParams.slug;

  let { data: project } = await supabaseAdmin
    .from('Project')
    .select('id, slug, title, shortDescription, overview, screenshots, tags')
    .eq('slug', slugOrId)
    .single();

  if (!project) {
    const { data: projectById } = await supabaseAdmin
      .from('Project')
      .select('id, slug, title, shortDescription, overview, screenshots, tags')
      .eq('id', slugOrId)
      .single();
    project = projectById;
  }

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = project.title;
  const description = project.shortDescription || project.overview;
  
  let screenshots: string[] = [];
  if (Array.isArray(project.screenshots)) {
    screenshots = project.screenshots;
  } else if (typeof project.screenshots === 'string') {
    try {
      screenshots = JSON.parse(project.screenshots);
    } catch {
      screenshots = [];
    }
  }
  const ogImage = screenshots.length > 0 ? screenshots[0] : '/og-image.png';

  let tags: string[] = [];
  if (Array.isArray(project.tags)) {
    tags = project.tags;
  } else if (typeof project.tags === 'string') {
    try {
      tags = JSON.parse(project.tags);
    } catch {
      tags = [];
    }
  }

  const canonicalUrl = `https://www.emham.my.id/project/${project.slug || project.id}`;

  return {
    title,
    description,
    keywords: tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Case Study`,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Case Study`,
      description,
      images: [ogImage],
      creator: '@Antares023',
    },
  };
}

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.shortDescription || project.overview,
    author: {
      '@type': 'Person',
      name: 'Muhammad Ilham Ramdhani',
      url: 'https://www.emham.my.id',
    },
    url: `https://www.emham.my.id/project/${project.slug || project.id}`,
    keywords: projectProps.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailView project={projectProps} />
    </>
  );
}
