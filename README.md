# MCP Directory

A comprehensive directory for awesome MCP (Model Context Protocol) servers, curated by the FirstLab community.

**Live Preview:** [https://1stlab.org](https://1stlab.org)

![preview](./preview.png)

## About FirstLab

FirstLab is an international AI enthusiast community composed of developers from Chinese, English, and Japanese speaking regions. We're dedicated to advancing AI technology and fostering collaboration across language barriers.

### Our Projects
- **MCP Directory** - This comprehensive directory of MCP servers
- **Hello Dify** ([hellodify.com](https://hellodify.com)) - A guidebook to help newcomers quickly get started with Dify

### Join Our Community
- **Discord:** [https://discord.gg/PwZDHH4mv3](https://discord.gg/PwZDHH4mv3)
- **X (Twitter):** [@firstlab_ai](https://x.com/firstlab_ai)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/stvlynn/1stlab-mcp.git
cd 1stlab-mcp
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Database Setup

Create a database with [Supabase](https://supabase.com/)

Run the SQL file to set up the database schema:

```bash
# Execute the SQL file in your Supabase dashboard
data/install.sql
```

### 4. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
SUPABASE_URL="your-supabase-url"
SUPABASE_ANON_KEY="your-supabase-anon-key"
NEXT_PUBLIC_WEB_URL="http://localhost:3000"
OPENAI_MODEL="gpt-4o-mini"
```

### 5. Run Development Server

```bash
pnpm dev
# or
make dev
```

### 6. Preview the Site

Open [http://localhost:8051](http://localhost:8051) in your browser

## Features

- 🔍 **Smart Search** - Find MCP servers by category, tags, or keywords
- 🏷️ **Categorization** - Organized by functionality (Search Tools, Databases, etc.)
- ⭐ **Featured Projects** - Curated selection of outstanding MCP servers
- 🤖 **AI-Powered Summaries** - Automatic project summarization using OpenAI
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌐 **Multi-language Support** - Built for international community

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **AI Integration:** OpenAI for content processing
- **Deployment:** Cloudflare Pages
- **Package Manager:** pnpm

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Attribution

This project is based on [chatmcp/mcp-directory](https://github.com/chatmcp/mcp-directory). We extend our gratitude to the original authors for open-sourcing their work and making this project possible. All modifications and enhancements comply with the Apache License 2.0.

## Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting issues
- 💡 Suggesting new features
- 🤝 Joining our Discord community

---

**Built with ❤️ by the FirstLab Community**
