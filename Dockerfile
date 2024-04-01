FROM node:18.17.0-alpine
WORKDIR /home/node/app
COPY package*.json ./ 
RUN npm install
USER node
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "app.js"]
