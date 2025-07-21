# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) Directory - a Next.js web application that serves as a directory for awesome MCP servers. The live site is hosted at https://1stlab.org.

## Common Development Commands

```bash
# Install dependencies
pnpm install

# Development server (standard)
pnpm dev

# Development server (with turbopack)
pnpm watch

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Cloudflare Pages deployment
pnpm pages:build
pnpm preview
pnpm deploy
```

## Environment Setup

Required environment variables in `.env`:
- `SUPABASE_URL` - Supabase database URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_WEB_URL` - Web URL (http://localhost:3000 for dev)
- `OPENAI_MODEL` - OpenAI model for content processing
- `OPENAI_API_KEY` - OpenAI API key

## Database Setup

1. Create a Supabase database
2. Run the SQL schema from `data/install.sql`
3. Set up the environment variables

## Architecture Overview

### Core Structure
- **Next.js 15** with App Router architecture
- **TypeScript** with strict configuration
- **Tailwind CSS** for styling
- **Supabase** for database operations
- **OpenAI** for content processing and summarization

### Key Directories
- `app/` - Next.js app router pages and API routes
- `components/` - Reusable React components
- `models/` - Database models and Supabase client
- `services/` - Business logic (project processing, LLM integration)
- `types/` - TypeScript type definitions
- `templates/tailspark/` - UI component templates

### Data Flow
1. Projects are submitted via `/api/submit-project` endpoint
2. GitHub URLs are parsed and validated in `services/project.ts`
3. README content is fetched using Jina Reader service
4. OpenAI processes content for categorization and summarization
5. Projects are stored in Supabase with categories and tags

### Project Processing Pipeline
- **parseProject()** - Validates and extracts GitHub project info
- **extractProject()** - Uses LLM to extract structured project data
- **sumProject()** - Fetches README and generates summary/categories
- **saveProject()** - Persists to database with deduplication

### UI Components
- Landing page with hero, projects grid, and categories
- Search functionality for filtering projects
- Theme provider for dark/light mode
- Responsive design with Tailwind

## Special Considerations

- The application specifically targets GitHub-hosted MCP servers
- Special handling for `modelcontextprotocol` organization repositories
- Edge runtime used for API routes
- Cloudflare Pages deployment support
- SEO optimization with sitemaps and structured data