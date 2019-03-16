FROM node:8.9.4-alpine

ENV NODE_ENV=development
ENV PORT=9999

RUN npm install -g express-generator@4.16.0

WORKDIR /app

EXPOSE 9999
EXPOSE 8888

VOLUME /app

COPY entry_point.sh /usr/local/bin
RUN chmod 744 /usr/local/bin/entry_point.sh
ENTRYPOINT ["entry_point.sh"]

CMD ["npm", "start"]
