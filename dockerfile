FROM node:alpine

# Create work directory
WORKDIR /usr/src/app

# Copy app dist to work directory
COPY . /usr/src/app

# Install app dependencies
RUN npm install

# Set up environment variables
ENV NODE_ENV=production

# Build and run the app
RUN npm run build
CMD npm start
EXPOSE 3000