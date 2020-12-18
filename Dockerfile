FORM node:14-alpine
WORKDIR ./epg-now-api
COPY . .
RUN npm install
CMD ["npm", "start"]
