FROM node:latest

COPY ./ /

CMD [ "npm", "i" ]

CMD [ "node", "./index.js" ]
