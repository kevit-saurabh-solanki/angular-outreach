FROM node:22

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package*.json ./

# Run the application as a non-root user.
RUN npm install --legacy-peer-deps

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 4200

# Run the application.
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
