import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/models/db';
import { getCategories } from '@/models/category';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    
    // Get all active projects from database
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('name, updated_at')
      .eq('status', 'active')
      .order('updated_at', { ascending: false });

    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }

    // Get all active categories
    const categories = await getCategories(1, 1000);

    // Generate sitemap XML
    const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://mcp.1stlab.org';
    const today = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add main pages
    const mainPages = [
      { url: '/', lastmod: today, changefreq: 'daily', priority: '1.0' },
      { url: '/categories', lastmod: today, changefreq: 'daily', priority: '0.9' }
    ];

    mainPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add category pages
    categories.forEach(category => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/category/${category.name}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add individual project pages
    projects.forEach(project => {
      const lastmod = project.updated_at ? 
        new Date(project.updated_at).toISOString().split('T')[0] : 
        today;
      
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/server/${project.name}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += '</urlset>';

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 });
  }
}