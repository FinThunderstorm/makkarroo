FROM public.ecr.aws/docker/library/node:18-alpine
WORKDIR /makkarroo

COPY . .
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "start:dev"]