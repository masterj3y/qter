FROM node:22-alpine3.20 AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -r

COPY apps/auth apps/auth
COPY libs libs

RUN cd apps/auth && npm install

RUN npm run build auth

FROM node:22-alpine3.20 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --omit=dev

COPY --from=development /usr/src/app/dist ./dist

RUN ls ./dist/apps/auth/

ENTRYPOINT [ "node", "./dist/apps/auth/main.js" ]
