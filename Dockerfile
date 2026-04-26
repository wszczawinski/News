# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Install vp (Vite+ CLI) which includes pnpm management
RUN npm install -g vite-plus@0.1.19

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN vp install --frozen-lockfile --ignore-scripts

# Copy source code and build
COPY . .
RUN vp build

# Production stage
FROM nginx:1.28-alpine

# Install wget for health check
RUN apk add --no-cache wget

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD wget -q --spider http://localhost/health || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
