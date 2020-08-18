FROM node:lts
WORKDIR /app
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org && npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /app/build /usr/share/nginx/html