# Bazine image
FROM node:18-alpine

# Aplinkos nustatymai
ENV NODE_ENV=production
ENV PORT=8080

# Aplanko su programa nustatymas
WORKDIR /usr/src/app

# Kopijuojame tik package failus ir įdiegiame tik production dependencijas
COPY package*.json ./
RUN npm ci --omit=dev --silent

# Kopijuojame likusius failus ir priskiriame juos non-root vartotojui
COPY --chown=node:node . .

# Naudoti ne-root vartotoją (saugumo sumetimais)
USER node

# Portas
EXPOSE 8080

# Paleidimas
CMD ["node", "app/index.js"]
