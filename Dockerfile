FROM node:alpine as builder

WORKDIR /app

COPY . /app/

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/src/app

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80