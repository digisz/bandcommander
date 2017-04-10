# Create image based on the official Node 6 image from dockerhub
FROM node:7

RUN ls

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app
COPY .angular-cli.json /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Install dependecies
RUN npm install

RUN npm install -g @angular/cli@latest

# Get all the code needed to run the app
COPY . /usr/src/app

# create the app
RUN ng build -prod

EXPOSE 3000

CMD ["node","server.js"]
