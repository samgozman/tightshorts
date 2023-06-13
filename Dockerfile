FROM node:16.13-alpine3.12 AS build-env
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
ENV NODE_ENV=production
RUN npm run build
RUN npm run rollup

FROM gcr.io/distroless/nodejs16-debian11
COPY --from=build-env /app /app
WORKDIR /app
ENV PORT=80
ENV API_URL=http://finra-short-api:3001
ENV COOKIE_KEY=''
ENV COOKIE_SESSION_KEY=''
ENV SENTRY_DSN=''
ENV SENTRY_TRACE_RATE=0.25
ENV NODE_ENV=production
EXPOSE ${PORT}
CMD ["build/main.js"]
