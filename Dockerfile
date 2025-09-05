FROM node:18-alpine AS base

# Disabling Telemetry
ENV NEXT_TELEMETRY_DISABLED 1
RUN apk add --no-cache libc6-compat curl

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM base AS builder
ARG NEXT_STORYBLOK_SPACE_ID
ENV NEXT_STORYBLOK_SPACE_ID=$NEXT_STORYBLOK_SPACE_ID
ARG NEXT_STORYBLOK_API_TOKEN
ENV NEXT_STORYBLOK_API_TOKEN=$NEXT_STORYBLOK_API_TOKEN
ARG NEXT_STORYBLOK_OAUTH_TOKEN
ENV NEXT_STORYBLOK_OAUTH_TOKEN=$NEXT_STORYBLOK_OAUTH_TOKEN
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown 1001:1001 .next

COPY --from=builder --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --chown=1001:1001 /app/.next/static ./.next/static

USER nextjs

EXPOSE 3030

ENV PORT 3030
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
