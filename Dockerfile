FROM node:21-alpine as builder

WORKDIR /usr/src/app
COPY package.json yarn.lock tsconfig.json .env ./
RUN yarn install
COPY src/ ./src
COPY public/ ./public
RUN yarn build


FROM node:21-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build /usr/src/app/build
RUN yarn global add serve
EXPOSE 3000
CMD ["serve", "-s", "build"]