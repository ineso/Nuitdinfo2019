# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

RUN npm install -g @angular/cli:latest

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0
