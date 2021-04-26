FROM node:12

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY code/package*.json ./

RUN yarn run install:clean

COPY ./code /app

# RUN yarn build

CMD ["yarn", "run", "dev"]
