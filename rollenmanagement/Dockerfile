# pull official base image
FROM node:16.8.0-alpine

# set working directory
WORKDIR /rollenmanagement

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /rollenmanagement/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install --silent
#RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]