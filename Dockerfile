FROM node:16.13-alpine3.12

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

ARG PORT=80
ARG API_URL=http://finra-short-api:3001

ENV PORT ${PORT}
ENV API_URL=${API_URL}
ENV COOKIE_KEY=''
ENV COOKIE_SESSION_KEY=''
ENV SENTRY_DSN=''
ENV SENTRY_TRACE_RATE=0.25

EXPOSE ${PORT}

RUN npm run build

CMD ["npm", "run", "start:prod"]
