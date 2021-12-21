FROM node:12-alpine

RUN apk add --no-cache python2 g++ make
WORKDIR /backend
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
