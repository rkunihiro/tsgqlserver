FROM node:12.18.1-alpine as build
ENV NODE_ENV=development
COPY . /build
WORKDIR /build
RUN npm install \
 && npm run build

FROM node:12.18.1-alpine
ENV NODE_ENV=production
COPY --from=build /build/dist /app
WORKDIR /app
EXPOSE 3000
CMD [ "node", "/app/server.js" ]
