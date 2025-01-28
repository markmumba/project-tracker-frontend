
# Use the official Node.js image as the base image for the build stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the project directory into the Docker image
COPY . .

# Build the Next.js application
RUN pnpm run build

# Final stage: Use a smaller base image for runtime
FROM node:18-alpine AS runtime

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built files from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Install sharp for image optimization
RUN pnpm add sharp

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the application with a non-root user for security
USER node

CMD ["pnpm", "start"]