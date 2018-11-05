FROM node:latest
COPY . .

RUN npm install --production

RUN npm build --production

EXPOSE 3333
CMD ["npm", "start"]