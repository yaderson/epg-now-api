FROM node:14-alpine
WORKDIR /epg-now-api
# ENV NODE_ENV=production
COPY . .
RUN npm install
CMD ["npm", "start"]
