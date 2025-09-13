# Modern News Platform

A modern, responsive news platform built with React, TypeScript, and cutting-edge technologies for optimal performance and user experience.

## 🚀 Features

- **Type-safe Routing**: Implemented with TanStack Router for robust navigation
- **Efficient Data Management**: TanStack Query for client-side state management and caching
- **Modern UI Components**: Built with Shadcn/ui - Radix UI primitives and styled with Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Progressive Images**: Optimized image loading for better performance
- **Category Filtering**: Dynamic news categorization and filtering
- **Pagination**: Efficient content pagination for better UX
- **Gallery Support**: Interactive image galleries with carousel functionality
- **SEO Optimized**: Proper meta tags and structured data

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.9.2** - Type-safe development
- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Server state management
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Shadcn/ui** - UI components
- **Embla Carousel** - Touch-friendly carousels
- **Lucide React** - Beautiful icons
- **Zod** - Schema validation

### Build Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

### Deployment
- **Docker** - Containerization
- **Nginx** - Web server and reverse proxy
- **Self-hosted VPS** - Custom deployment infrastructure

## 📦 Installation

1. Install dependencies using pnpm:

```bash
pnpm install
```

2. Create environment file, then fill values:

```bash
cp .env.example .env
```

3. Start the development server:
```bash
pnpm run dev
```

## 🔗 Backend Integration

This frontend connects to a Spring Boot backend API (maintained in private repositories) that provides:
- News articles and content management
- Category management
- Image upload and processing
- Admin panel functionality

## 🌐 Production Deployment

The application is deployed using:
- **Docker containers** for consistent environments
- **Nginx** as reverse proxy and static file server
- **Self-hosted VPS** for full control over infrastructure

## 📱 Features Overview

### News Management
- Browse latest news articles
- Filter by categories
- Paginated content loading
- Individual post pages with full content

### User Experience
- Progressive image loading
- Responsive carousel galleries
- Smooth animations and transitions
- Mobile-optimized interface

### Performance Optimizations
- Client-side caching with TanStack Query
- Code splitting with lazy routes
- Optimized bundle sizes
- Progressive image loading
