FROM node:18
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN yarn install

COPY . ./
EXPOSE 8000
CMD ["yarn", "run", "start"]