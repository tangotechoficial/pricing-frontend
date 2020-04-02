FROM node as base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run-script build

FROM nginx
COPY --from=base /app/dist/martins-project /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
