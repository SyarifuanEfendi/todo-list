# Use the official lightweight Node.js image (Alpine version)
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies required by Alpine
RUN apk add --no-cache bash

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code
COPY . .

# Copy .env.example to .env
COPY .env.example src/sequelize/.env
COPY .env.example .env

RUN chmod +x ./src/sequelize/scripts/migrate.sh
RUN chmod +x ./src/sequelize/scripts/seed.sh

RUN npm uninstall bcrypt 
RUN npm install bcryptjs 
RUN npm install bcrypt

# Expose the port that the app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "run", "dev"]
