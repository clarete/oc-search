FROM node:7.9.0

RUN apt-get update && apt-get install -y --no-install-recommends \
    mysql-client && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install yarn
RUN yarn

COPY . /usr/src/app
RUN npm run dist
RUN node_modules/.bin/webpack
COPY ./server/config/config.json /usr/src/app/dist/server/config/
