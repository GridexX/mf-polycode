FROM node:16-alpine
WORKDIR /build

ARG public_api_url
ENV NEXT_PUBLIC_API_URL=$public_api_url

# Install dependencies
COPY package.json package-lock.json ./ 
RUN npm ci

# Build the application
COPY . .
RUN npm run build

# Test the application
RUN npm run lint

# Run image as non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the files to the right location
WORKDIR /app
RUN mkdir -p /app/.next
RUN cp -R /build/.next/standalone/* /app/
RUN cp -R /build/.next /app
RUN cp -R /build/package.json /app/package.json
RUN cp -R /build/public /app/

# Cleanup and set permissions
RUN rm -rf /build
RUN chown -R 1001:1001 .

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
