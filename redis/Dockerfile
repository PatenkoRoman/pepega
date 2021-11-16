FROM node:14.17.0-buster-slim AS base

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .


RUN yarn build
CMD node ./build/index.js