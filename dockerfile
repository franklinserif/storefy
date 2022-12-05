# Stage 1 build
FROM node:14 as builder

WORKDIR /usr/src

COPY ["./api/package.json", "/usr/src"]
RUN npm install

COPY ["./api/", "/usr/src"]
RUN npm run build

WORKDIR /usr/src/client

COPY ["./client/package.json", "/usr/src/client"]
RUN npm install

COPY ["./client", "/usr/src/client"]
RUN npm run build

RUN ls

# Stage 2 start app
FROM node:14

WORKDIR /usr/app

COPY ["./api/package.json", "/usr/app"]
RUN npm install --only=production

WORKDIR /usr/app/client

COPY ["./client/package.json", "/usr/app/client"]
RUN npm install --only=production

WORKDIR /usr/app

COPY --from=builder ["/usr/src/client/build", "/usr/app/"]
COPY --from=builder ["/usr/src/dist", "/usr/app"]

RUN ls -la
RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime", "start", "/usrs/app/index.js"]