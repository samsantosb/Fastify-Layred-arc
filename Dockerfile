FROM node:20

WORKDIR /app

# Copiar apenas package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
