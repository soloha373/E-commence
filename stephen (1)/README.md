# ArchDesign - Academic Architecture Design Platform

A professional web-based tool for designing scalable e-commerce system architectures. Built for students and academics to create comprehensive system designs with interactive diagrams, microservice definitions, and deployment planning.

## Features

### 🏗️ Architecture Builder
- Drag-and-drop interface for system components
- Support for multiple component types: API Gateway, Microservices, Databases, CDN, External APIs, and more
- Visual connection management with protocol labeling (HTTP/REST, gRPC, Message Queue)
- Real-time diagram updates

### 🔧 Microservice Designer
- Define services with detailed specifications
- Document responsibilities, entities, endpoints, and dependencies
- Database type selection for each service
- Pre-populated with example services

### 📊 Data Architecture
- Multiple database strategy options (Shared DB, Database per Service, Hybrid)
- ER diagram planning tools
- Data consistency strategy documentation
- Entity and relationship templates

### 🔄 Sequence Flow
- Visual request flow builder
- Service-to-service communication patterns
- Error handling and data flow documentation
- Support for synchronous and asynchronous patterns

### ☁️ Cloud Deployment
- Infrastructure components checklist
- Multi-region deployment strategies
- Deployment pattern documentation (Blue-Green, Canary, Rolling)
- Monitoring and observability tools
- Auto-scaling configuration

### 🔒 Security Planning
- Security measures checklist
- OWASP Top 10 vulnerabilities reference
- Authentication strategy (JWT, OAuth2, MFA)
- Data protection and compliance requirements
- PCI-DSS, GDPR compliance tracking

### 📤 Export & Report
- JSON export for project backup and data portability
- Markdown export for documentation
- Project progress tracking
- Professional report generation (PDF coming soon)

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd archdesign
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Run development server**
```bash
pnpm dev
# or
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── page.tsx                 # Landing page
│   ├── dashboard/
│   │   ├── page.tsx            # Main dashboard
│   │   ├── architecture/       # Architecture builder
│   │   ├── microservices/      # Microservice designer
│   │   ├── data-architecture/  # Data design tools
│   │   ├── sequence-flow/      # Flow diagrams
│   │   ├── cloud-deployment/   # Deployment planning
│   │   ├── security/           # Security planning
│   │   ├── export/             # Export functionality
│   │   └── settings/           # Project settings
│   ├── layout.tsx              # Root layout with theme
│   └── globals.css             # Global styles and design tokens
│
├── components/
│   ├── sidebar.tsx             # Main navigation
│   ├── theme-provider.tsx      # Theme configuration
│   └── ui/                     # shadcn/ui components
│
├── lib/
│   ├── store.ts               # Zustand project store
│   └── utils.ts               # Utility functions
│
└── public/                     # Static assets
```

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand with localStorage persistence
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## Key Features Explained

### Project Store
All project data is managed through Zustand store with automatic localStorage persistence. Data persists between sessions without backend requirements.

### Design Tokens
Modern dark/light mode support with OKLCH color space for better perceptual uniformity. Design tokens are customizable in `globals.css`.

### Local Storage
- No backend required
- Data stored entirely in browser
- Manual export for backups
- Works offline after initial load

## Usage Guide

### 1. Start with Dashboard
View project overview, track completion progress across 9 sections, and access all design tools.

### 2. Design Architecture
Add components (Client Layer, API Gateway, Microservices, Databases) and connect them with protocols.

### 3. Define Microservices
Document each service with responsibilities, entities, endpoints, and dependencies.

### 4. Plan Data Strategy
Choose between shared database or database-per-service patterns with documented trade-offs.

### 5. Document Flows
Create sequence diagrams showing request flows from customer order to notification.

### 6. Plan Deployment
Design cloud infrastructure, choose multi-region strategies, and plan deployment patterns.

### 7. Ensure Security
Check off security measures, review vulnerabilities, and document compliance requirements.

### 8. Export Documentation
Generate JSON backups or Markdown reports for academic submission.

## Ghana-Focused Features

The platform includes examples and references relevant to West African e-commerce:

- **Mobile Money Integration**: MTN Mobile Money, Vodafone Cash, AirtelTigo Money
- **Regional Platforms**: Jumia Ghana, local logistics providers
- **Compliance**: Local data protection laws, GDPR considerations
- **Deployment Regions**: Accra, Lagos, regional edge locations

## Customization

### Change Colors
Edit design tokens in `app/globals.css`:
```css
:root {
  --primary: oklch(0.55 0.18 262);  /* Purple blue */
  --accent: oklch(0.45 0.2 262);    /* Darker accent */
}
```

### Add New Sections
1. Create new page in `app/dashboard/[section]/page.tsx`
2. Add navigation item in `components/sidebar.tsx`
3. Update store if needed

### Modify Component Types
Edit `componentTypes` in `app/dashboard/architecture/page.tsx`

## Deployment

### Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications with zero configuration.

1. **Prepare Your Repository**
```bash
# Ensure code is committed and pushed to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Visit [vercel.com](https://vercel.com)
- Click "Add New..." > "Project"
- Import your GitHub repository
- Vercel auto-detects Next.js and configures build settings
- Click "Deploy"

3. **Configuration**
- **Environment Variables**: None required (local storage only)
- **Build Command**: Auto-detected as `next build`
- **Output Directory**: Auto-detected as `.next`
- **Install Command**: Auto-detected as `pnpm install`

4. **Post-Deployment**
- Your app will be live at `https://[project].vercel.app`
- Automatic deployments on every push to main
- Preview deployments for pull requests

### Option 2: Deploy to Netlify

1. **Build Locally**
```bash
pnpm install
pnpm build
```

2. **Connect to Netlify**
- Push code to GitHub
- Visit [netlify.com](https://netlify.com)
- Click "New site from Git"
- Select your repository
- Build command: `next build && next export`
- Publish directory: `out`

3. **Deploy**
- Click "Deploy site"
- Netlify builds and deploys automatically

### Option 3: Self-Hosted on Any Server

1. **Build for Production**
```bash
pnpm install
pnpm build
```

2. **Run Server**
```bash
pnpm start
```

3. **Using Docker** (optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

4. **Using PM2** (for process management)
```bash
npm install -g pm2
pnpm build
pm2 start "pnpm start" --name archdesign
pm2 startup
pm2 save
```

### Deployment Checklist

- [ ] All dependencies installed
- [ ] Environment configured
- [ ] Build succeeds locally
- [ ] Test application works
- [ ] Push to version control
- [ ] Configure hosting platform
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS
- [ ] Set up monitoring/logging (optional)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- First page load: ~50KB (gzipped)
- Fully static client-side app
- No API calls required
- Instant page navigation
- Responsive on mobile devices

## Data Persistence

All project data is stored in browser localStorage:
- Maximum size: ~5-10MB per domain (browser dependent)
- Persists across sessions
- Can be cleared with browser cache
- Exportable as JSON for backups

## Limitations & Future Enhancements

### Current Limitations
- Diagram canvas is simulated (visual display only)
- PDF export not yet implemented
- Real-time collaboration not supported
- No image/file attachments

### Planned Features
- PDF export with formatting
- Collaborative editing
- Cloud sync (optional)
- Advanced diagram features (drag-and-drop positioning)
- Template library
- Integration with architecture tools (miro, lucidchart)

## Academic Use

This tool is perfect for:
- University capstone projects
- System design courses
- Architecture documentation
- Technical interview preparation
- Software engineering portfolios

## Support & Help

### Getting Help
1. Check the in-app help tooltips on each page
2. Review the Getting Started section in the Dashboard
3. Refer to example data in Microservices section

### Tips for Success
- Save your work regularly (use Export feature)
- Complete sections sequentially (A → I)
- Use the reference materials provided
- Document your design decisions
- Export to backup before final submission

## License

This is an educational tool for academic purposes.

## Credits

Built with:
- Next.js - React framework
- shadcn/ui - Component library
- Tailwind CSS - Styling
- Zustand - State management
- Lucide - Icons

## Contributing

This is a single-user academic tool, but improvements are welcome!

---

**Start designing your scalable architecture today!**

Happy designing! 🏗️
