import { writeFileSync } from 'fs';
import path from 'path';
import { getSupabaseClient } from '../models/db';
import { getCategories } from '../models/category';

async function generateSitemaps() {
  console.log('🔄 Starting sitemap generation...');
  
  try {
    const supabase = getSupabaseClient();
    const baseUrl = 'https://1stlab.org';
    const today = new Date().toISOString().split('T')[0];

    // Get all active projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('name, updated_at')
      .eq('status', 'active')
      .order('updated_at', { ascending: false });

    if (projectsError) {
      throw projectsError;
    }

    // Get all active categories
    const categories = await getCategories(1, 1000);

    console.log(`📊 Found ${projects.length} active MCP servers`);
    console.log(`📊 Found ${categories.length} active categories`);

    // Generate main sitemap index
    let sitemapIndex = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapIndex += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    sitemapIndex += `  <sitemap>\n`;
    sitemapIndex += `    <loc>${baseUrl}/sitemap_index_1.xml</loc>\n`;
    sitemapIndex += `  </sitemap>\n`;
    
    sitemapIndex += `  <sitemap>\n`;
    sitemapIndex += `    <loc>${baseUrl}/sitemap_categories_1.xml</loc>\n`;
    sitemapIndex += `  </sitemap>\n`;
    
    sitemapIndex += `  <sitemap>\n`;
    sitemapIndex += `    <loc>${baseUrl}/sitemap_projects_1.xml</loc>\n`;
    sitemapIndex += `  </sitemap>\n`;
    
    sitemapIndex += '</sitemapindex>';

    // Generate pages sitemap
    let pagesSitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    pagesSitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    const pages = [
      { url: '/', lastmod: today, changefreq: 'daily', priority: '1.0' },
      { url: '/categories', lastmod: today, changefreq: 'daily', priority: '0.9' }
    ];

    pages.forEach(page => {
      pagesSitemap += `  <url>\n`;
      pagesSitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
      pagesSitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
      pagesSitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      pagesSitemap += `    <priority>${page.priority}</priority>\n`;
      pagesSitemap += `  </url>\n`;
    });
    
    pagesSitemap += '</urlset>';

    // Generate categories sitemap
    let categoriesSitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    categoriesSitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    categories.forEach(category => {
      categoriesSitemap += `  <url>\n`;
      categoriesSitemap += `    <loc>${baseUrl}/category/${category.name}</loc>\n`;
      categoriesSitemap += `    <lastmod>${today}</lastmod>\n`;
      categoriesSitemap += `    <changefreq>weekly</changefreq>\n`;
      categoriesSitemap += `    <priority>0.8</priority>\n`;
      categoriesSitemap += `  </url>\n`;
    });
    
    categoriesSitemap += '</urlset>';

    // Generate projects sitemap
    let projectsSitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    projectsSitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    projects.forEach(project => {
      const lastmod = project.updated_at ? 
        new Date(project.updated_at).toISOString().split('T')[0] : 
        today;
      
      projectsSitemap += `  <url>\n`;
      projectsSitemap += `    <loc>${baseUrl}/server/${project.name}</loc>\n`;
      projectsSitemap += `    <lastmod>${lastmod}</lastmod>\n`;
      projectsSitemap += `    <changefreq>weekly</changefreq>\n`;
      projectsSitemap += `    <priority>0.7</priority>\n`;
      projectsSitemap += `  </url>\n`;
    });
    
    projectsSitemap += '</urlset>';

    // Write files
    const publicDir = path.join(process.cwd(), 'public');
    
    writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
    writeFileSync(path.join(publicDir, 'sitemap_index_1.xml'), pagesSitemap);
    writeFileSync(path.join(publicDir, 'sitemap_categories_1.xml'), categoriesSitemap);
    writeFileSync(path.join(publicDir, 'sitemap_projects_1.xml'), projectsSitemap);

    console.log('✅ Sitemaps generated successfully!');
    console.log(`📄 sitemap.xml - Main index`);
    console.log(`📄 sitemap_index_1.xml - ${pages.length} pages`);
    console.log(`📄 sitemap_categories_1.xml - ${categories.length} categories`);
    console.log(`📄 sitemap_projects_1.xml - ${projects.length} MCP servers`);

  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemaps();
}

export default generateSitemaps;