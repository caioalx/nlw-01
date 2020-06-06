1 - (Windows) Instalar package package manager chocolatey
2 - Instalar NODE via chocolatey: choco install nodejs-lts
2 - Criar projeto NODE sem a exigência do package.json: No diretório do projeto digitar npm init -y
3 - Instalar dependência express no projeto: npm install express
4 - Instalar as definições de tipos do express caso precise. Obs.: o -D é apenas para desenvolvimento e não produção: npm install @types/express
5 - Instalar o Typescript: npm install typescript -D
6 - Instalar a excução do Typescript para node: npm install ts-node -D
7 - Criar o arquivo de configuração, tsconfig.json, utilizado pelo typescript: npx tsc --init
8 - Criar diretório: src
9 - Dentro do diretório src, criar o arquivo: server.ts(Onde ficarão os códigos para configurações e inicialização do app)
10 - Para executar o projeto: npx tsc-node src/server.ts
11 - Para subir o projeto automaticamente após alguma modificação no código, instalar o ts-node-dev: npm install ts-node-dev -D
12 - Para executar o projeto com o ts-node-dev: npx ts-node-dev src/server.ts
13 - Para facilitar, automatizar, o passo anterior entre no package.json, linha "scripts", criar atributo com algum nome intuitivo, como "dev" ou "banana" 
e atribuir o valor: "ts-node-dev src/server.ts"
14 - Subir o projeto usando o comando: npm run dev
15 - Instalar o knex para usar banco de dados: npm install knex
16 - Instalar o banco de dados sqlite3: npm install sqlite3
17 - Criar diretório database dentro de scr
18 - Criar arquivo routes.ts
19 - Criar arquivo connection.ts
20 - Criar o knexfile.ts na raiz
21 - Criar migrations(definição para a criação das tabelas no B.D): Criar em ordem. 00_create_TABELA.ts, 01_create_TABELA2.ts
22 - Comando para criar as tabelas do migration: npx knex migrate:latest --knexfile knexfile.ts migrate:latest
23 - Para automatizar o passo acima, no package.json, inclua no script: "knex:migrate": "knex --knexfile knexfile.ts migrate:latest"
24 - Criar os SEEDS(inserção de dados pré existentes para a aplicação) do projetos, criar diretório SEEDS, criar o create_items.ts, exemplo.
25 - Executar o comando para o passo acima: npx knex --knexfile knexfile.ts seed:run
26 - Para automatizar o passo acima, no package.json, inclua no script: "knex:seed": "knex --knexfile knexfile.ts seed:run"
27 - Instalar o CORS e suas definições: npm install cors e npm install @types/cors -D
28 - Instalar o multer para upload de arquivos, para upload não deve ser usado JSON no corpo, mas sim multipart form: npm install multer e npm install @types/multer -D

-------------------------------------------------------------------------
Exemplo simples abaixo do server.ts

//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessando do sistema

//GET: Buscar uma ou mais informações do back-end
//POST: Criar uma nova informação no back-end
//PUT: Atualizan uma informação existente no back-end
//DELETE: Remover uma informação no back-end

//POST: http://localhost:3333/users -- Criar um usuário
//GET: http://localhost:3333/users -- Listar usuários
//GET: http://localhost:3333/users/5 -- Buscar dados do usuário com id = 5

//Request Param: Parâmetros que vêm na própria rota que identificam o recurso
//Query Param: Parâmetros que vêm na própria rota geralmente opcionais para filtros, paginação
//Request Body: Parâmetros para criação / atualização de informações

// SELECT * FROM users WHERE name = 'Diego'
//knex(users).where('name', 'Diego').select(*)


import express from 'express';

const app = express();

app.use(express.json());

app.listen(3333);

const users = [
    'Diego',
    'Cleiton',
    'Robson', 
    'Daniel'
];

app.get('/users', (request, response)=> {
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    console.log(search);

    return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);

    return response.json(users[id]);
})

app.post('/users', (request, response) => {
    const data = request.body;

    const user = {
        name : data.name,
        email: data.email
    }

    console.log(user);

    //users.push(user)

    return response.json(users);
});

app.listen(3333);
	
