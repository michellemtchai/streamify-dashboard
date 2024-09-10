FROM node:20-alpine

# Set working directory
WORKDIR /app

# copy package config
COPY ./package.json .
COPY ./yarn.lock .

# install packages
RUN yarn install
