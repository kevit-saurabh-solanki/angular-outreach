ARG NODE_VERSION=22.17.1

FROM node:${NODE_VERSION}

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package*.json ./

# Run the application as a non-root user.
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 4200

# Run the application.
CMD ["ng", "serve"]
