FROM node:latest

COPY . /opt/app
WORKDIR /opt/app
RUN npm install
# ENV DATABASE_URL="postgresql://postgres:19960801@postgres:5432/remarkables"

CMD ["node", "main.js"]