FROM node:12
COPY . /app
WORKDIR /app
RUN npm install
RUN npm i @angular/cli
RUN npm run build-prod
EXPOSE 8080
ENTRYPOINT [ "npm", "start"]
