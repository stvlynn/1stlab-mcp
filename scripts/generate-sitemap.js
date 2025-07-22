const fs = require('fs');
const path = require('path');

// Mock database connection - in real scenario, use actual DB
async function generateSitemaps() {
  console.log('🔄 Starting sitemap generation...');
  
  try {
    const baseUrl = 'https://mcp.1stlab.org';
    const today = new Date().toISOString().split('T')[0];

    // Mock data - replace with actual DB calls in production
    const mockProjects = [
      { name: 'github-mcp-server', updated_at: today },
      { name: 'notion-mcp', updated_at: today },
      { name: 'chatsum', updated_at: today },
      { name: 'mcp-financial-advisor', updated_at: today },
      { name: 'mcp-aoai-web-browsing', updated_at: today },
      { name: 'duckduckgo-web-search', updated_at: today },
      { name: 'openapi2mcptools', updated_at: today },
      { name: 'mcp-chat-demo', updated_at: today },
      { name: 'wcgw-vscode', updated_at: today },
      { name: 'mcp-google-calendar', updated_at: today },
      { name: 'model-context-protocol', updated_at: today },
      { name: 'mcp-server-sqlite', updated_at: today },
      { name: 'mcp-server-filesystem', updated_at: today },
      { name: 'mcp-server-fetch', updated_at: today },
      { name: 'mcp-server-brave-search', updated_at: today }
    ];

    const mockCategories = [
      { name: 'developer-tools', title: 'Developer Tools', projects_count: 45 },
      { name: 'ai-chatbot', title: 'AI Chatbot', projects_count: 32 },
      { name: 'productivity', title: 'Productivity', projects_count: 28 },
      { name: 'web-scraping', title: 'Web Scraping', projects_count: 24 },
      { name: 'database', title: 'Database', projects_count: 18 },
      { name: 'automation', title: 'Automation', projects_count: 35 },
      { name: 'file-management', title: 'File Management', projects_count: 22 },
      { name: 'api-integration', title: 'API Integration', projects_count: 30 }
    ];

    console.log(`📊 Using ${mockProjects.length} MCP servers`);
    console.log(`📊 Using ${mockCategories.length} categories`);

    // Generate sitemap XML
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
    
    mockCategories.forEach(category => {
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
    
    mockProjects.forEach(project => {
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
    const publicDir = path.join(__dirname, '..', 'public');
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
    fs.writeFileSync(path.join(publicDir, 'sitemap_index_1.xml'), pagesSitemap);
    fs.writeFileSync(path.join(publicDir, 'sitemap_categories_1.xml'), categoriesSitemap);
    fs.writeFileSync(path.join(publicDir, 'sitemap_projects_1.xml'), projectsSitemap);

    console.log('✅ Sitemaps generated successfully!');
    console.log(`📄 sitemap.xml - Main index`);
    console.log(`📄 sitemap_index_1.xml - ${pages.length} pages`);
    console.log(`📄 sitemap_categories_1.xml - ${mockCategories.length} categories`);
    console.log(`📄 sitemap_projects_1.xml - ${mockProjects.length} MCP servers`);
    console.log(`🔗 All URLs use base URL: ${baseUrl}`);

  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemaps();
}

module.exports = generateSitemaps;