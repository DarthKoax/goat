# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["node", "index.js"]


#docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 4000:4000 -e CHOKIDAR_USEPOLLING=true backend:dev