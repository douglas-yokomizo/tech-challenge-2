FROM node:20.17.0 # Using Node.js version 20.17.0 as the base image

WORKDIR /src # Setting the working directory to /src

COPY package*.json ./ # Copying package.json and package-lock.json to the working directory

RUN npm install # Installing dependencies defined in package.json

COPY . . # Copying all files from the current directory to the working directory

RUN npm run build # Building the application (e.g., compiling TypeScript, bundling, etc.)

EXPOSE 8000 # Exposing port 8000 for the application

CMD ["npm", "dev"] # Defining the command to run the application in development mode
