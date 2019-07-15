FROM node:12.6-alpine
EXPOSE 3000 9229

WORKDIR /home/app

RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm config set python /usr/bin/python

COPY backend/package.json /home/app/backend/
COPY backend/package-lock.json /home/app/backend/

COPY frontend/package.json /home/app/frontend/
COPY frontend/package-lock.json /home/app/frontend/

RUN npm ci --prefix backend/
RUN npm ci --prefix frontend/

COPY . /home/app

RUN npm run build --prefix frontend/
RUN cp -r frontend/build backend/

CMD [ "npm", "start", "--prefix", "backend/" ]