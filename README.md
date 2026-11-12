# Modern News Platform

A modern, responsive news platform built with React, TypeScript, and cutting-edge technologies for optimal performance and user experience.

## Features

- **Type-safe Routing**: File-based routing with TanStack Router and auto code splitting
- **Efficient Data Management**: TanStack Query with persistence for client-side caching
- **Modern UI Components**: Shadcn/ui built on Radix UI primitives, styled with Tailwind CSS v4
- **Responsive Design**: Mobile-first approach with smooth animations
- **Progressive Images**: Optimized image loading for better performance
- **Category Filtering**: Dynamic news categorization and filtering
- **Pagination**: Efficient content pagination
- **Gallery Support**: Interactive image galleries with Embla Carousel
- **Error Tracking**: Sentry integration for production monitoring

## Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript 6** - Type-safe development
- **TanStack Router** - File-based routing with type safety and auto code splitting
- **TanStack Query** - Server state management with local storage persistence
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - UI component library (Radix UI + Tailwind)
- **Embla Carousel** - Touch-friendly carousels with autoplay
- **Lucide React** - Icon library
- **Vaul** - Drawer component
- **Sentry** - Error tracking and monitoring

### Build Tools

- **Vite+** (`vp`) - Unified toolchain wrapping Vite, Oxlint, Oxfmt, and Vitest
- **TypeScript ESLint** - TypeScript-specific linting rules

### Deployment

- **Docker** - Containerization
- **Nginx** - Web server and reverse proxy
- **Self-hosted VPS** - Custom deployment infrastructure

## Installation

1. Install dependencies:

```bash
vp install
```

2. Create environment file, then fill in values:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
vp dev
```

## Available Commands

```bash
vp dev          # Start development server
vp build        # Type-check and build for production
vp preview      # Preview production build
vp check        # Run format, lint, and type checks
vp lint         # Lint source files
vp fmt          # Format source files
vp test         # Run tests
```

## Backend Integration

This frontend connects to a Spring Boot backend API (maintained in a private repository) that provides:

- News articles and content management
- Category management
- Image upload and processing
- Admin panel functionality

## Production Deployment

The application is deployed using:

- **Docker containers** for consistent environments
- **Nginx** as reverse proxy and static file server
- **Self-hosted VPS** for full control over infrastructure

## Routes

- `/` — Home / latest news
- `/news` — News listing with category filtering and pagination
- `/post/:postId/:slug` — Individual post page
- `/contact` — Contact page
- `/links` — Links page
