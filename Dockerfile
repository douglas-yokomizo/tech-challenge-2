# Using Node.js version 20.17.0 as the base image
FROM node:20.17.0

WORKDIR /src # Setting the working directory to /src

# Copying package.json and package-lock.json to the working directory
COPY package*.json ./

# Installing dependencies defined in package.json
RUN npm install

# Copying all files from the current directory to the working directory
COPY . .

# Building the application (e.g., compiling TypeScript, bundling, etc.)
RUN npm run build

#Exposing port 8000 for the application
EXPOSE 8000

# Defining the command to run the application in development mode
CMD ["npm", "dev"]