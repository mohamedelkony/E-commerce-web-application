# Stage 1: Install dependencies (cached unless package.json changes)
FROM node:16 AS app_node_deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Stage 2: Build the app (when rebuilding uses cached deps if unchanged)
FROM app_node_deps AS build
COPY . .
RUN npm run build

# Stage 3: Production image (lean + only essentials)
# docker build --target app -t mohamedelkony/e-commerce-web-app:<tag> .
# docker push mohamedelkony/e-commerce-web-app:<tag>
FROM node:16-alpine AS app
# install crul and htop for debugging
RUN apk add --no-cache curl htop
WORKDIR /usr/src/app
# Copy Need to be optimaized to only copy the needed files and not the entire app code
COPY --from=build /usr/src/app . 
# Ensure ONLY production deps are kept
RUN npm prune --production
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]

# Stage 4: Tests (separate from production)
# docker build --target run_tests -t mohamedelkony/e-commerce-web-app-tests:0.0.2 .
# docker push mohamedelkony/e-commerce-web-app-tests:<tag>
FROM node:16-alpine AS run_tests
WORKDIR /usr/src/app
# Copy Need to be optimaized to only copy the test files and not the entire app 
COPY --from=build /usr/src/app .
CMD ["npm", "run", "test:cart"]