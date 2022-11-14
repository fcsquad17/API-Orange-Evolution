# 🍊 API Orange Evolution

![Badge da Orange Juice](https://img.shields.io/badge/ORANGE-JUICE-orange?style=for-the-badge&logo=E) ![Badge issues](https://img.shields.io/github/issues/fcsquad17/API-Orange-Evolution?style=for-the-badge) ![Badge da licença](https://img.shields.io/github/license/fcsquad17/API-Orange-Evolution?style=for-the-badge)

 <p align="justify">Projeto da quarta edição do Hackathon da Orange Juice. O nosso objetivo com essa API é desenvolver uma comunicação eficiente do banco de dados com a plataforma de estudos Orange Evolution.
<p>Conheça a comunidade da Orange Juice e a plataforma de estudos que nos baseamos: <a href="https://digital.fcamara.com.br/orangejuice">Orange Juice</a></p>

> :construction: Projeto em construção :construction:

![Logo da Orange Evolution](https://d335luupugsy2.cloudfront.net/cms/files/107693/1663161547/$2c3a91bepr3)

---

## 📘 Pré-requisitos

- <a href="https://nodejs.org/en/">Node.Js</a>
- <a href="https://www.npmjs.com/">NPM</a>
- <a href="https://expressjs.com/pt-br/">Express</a>
- <a href="https://www.npmjs.com/package/sqlite3">SQLite</a>

---

## 📖 Iniciando da aplicação

 <p>Rode os comandos a seguir no terminal ou PoweShell.</p>

- Clone o repositório:

```
git clone https://github.com/fcsquad17/API-Orange-Evolution.git
```

- Acesse a pasta:

```
cd API-Orange-Evolution
```

- Instale os pacotes necessários:

```
npm i --production
```

- Crie e Popule o banco de dados (se necessário):

```
npm run db
```

- Inicie o servidor:

```
npm start
```

<p>Ao iniciar o projeto, o servidor será aberto em http://localhost:3000/, sendo 3000 a porta padrão. Caso necessário, a porta poderá ser alterada no arquivo server.js</p>

---

## 🛣️ Rotas HTTP

- [GET](#b-rota-get-b)
- [POST](#b-rota-post-b)
- [PUT](#b-rota-put-b)
- [DELETE](#b-rota-delete-b)

### <b> Rota GET </b>

#### 🫂Tabela Usuários

##### <b>/usuarios</b>

Lista todos os usuários do banco de dados.
Exemplo da resposta esperada:

```json
{
  "usuarios": [
    {
      "ID": 1,
      "NOME_COMPLETO": "Carlos Alberto Albuquerque",
      "EMAIL": "carlos.alb12@gmail.com",
      "SENHA": "@12345679",
      "ADMIN": 0
    },
    {
      "ID": 2,
      "NOME_COMPLETO": "Olívia Ribeiro Ferreira",
      "EMAIL": "olivia.rib1@outlook.com",
      "SENHA": "@12345679",
      "ADMIN": 0
    }
  ],
  "error": false
}
```

##### <b> /usuarios/id/{id do usuário}</b>

Lista o usuário de id especificado do banco de dados.
Exemplo da resposta esperada:

```json
{
  "usuario": {
    "ID": 1,
    "NOME_COMPLETO": "Carlos Alberto Albuquerque",
    "EMAIL": "carlos.alb12@gmail.com",
    "SENHA": "@12345679",
    "ADMIN": 0
  },
  "error": false
}
```

##### <b> /usuarios/email/{email do usuário}</b>

Lista o usuário de email especificado do banco de dados.
Exemplo da resposta esperada:

```json
{
  "usuario": {
    "ID": 1,
    "NOME_COMPLETO": "Carlos Alberto Albuquerque",
    "EMAIL": "carlos.alb12@gmail.com",
    "SENHA": "@12345679",
    "ADMIN": 0
  },
  "error": false
}
```

##### <b> /usuarios/trilhaPorId/{id do usuário}</b>

Lista as trilhas escolhidas pelo usuário de id especificado.
Exemplo da resposta esperada:

```json
{
  "trilhas": [
    {
      "ID": 1,
      "TITULO": "Desenvolvimento Full-Stack",
      "DESCRICAO": "Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!"
    }
  ],
  "error": false
}
```

#### 📚Tabela Conteudos

##### <b> /conteudos/id/{id do conteúdo}</b>

Lista o conteúdo de id especificado.
Exemplo da resposta esperada:

```json
{
  "conteudo": {
    "ID": 1,
    "TITULO": "Guia de como migrar para ux design",
    "TIPO": "Artigo",
    "DURACAO": 360,
    "FONTE": "https://medium.com/orangejuicefc/guia-definitivo-de-como-migrar-para-ux-design-5-passos-para-virar-um-ux-1675f71796b4",
    "DESCRICAO": "Se você quer saber de uma vez por todas qual é a fórmula mágica para conseguir fazer a migração de carreira para UX Design e começar a ganhar rios de dinheiro, este é o  para você…só que não.",
    "TAG": "migração",
    "MODULO_ID": 1
  },
  "error": false
}
```

##### <b> /conteudos/idTrilha/{id da trilha}</b>

Lista apenas o id do primeiro conteúdo da trilha de id especificado.
Exemplo da resposta esperada:

```json
{
  "conteudo": {
    "ID": 60
  },
  "error": false
}
```

##### <b> /conteudos/porIdModulo/{id do módulo}</b>

Lista todos os conteúdos do módulo de id especificado.
Exemplo da resposta esperada:

```json
{
  "conteudos": [
    {
      "ID": 1,
      "TITULO": "Guia de como migrar para ux design",
      "TIPO": "Artigo",
      "DURACAO": 360,
      "FONTE": "https://medium.com/orangejuicefc/guia-definitivo-de-como-migrar-para-ux-design-5-passos-para-virar-um-ux-1675f71796b4",
      "DESCRICAO": "Se você quer saber de uma vez por todas qual é a fórmula mágica para conseguir fazer a migração de carreira para UX Design e começar a ganhar rios de dinheiro, este é o  para você…só que não.",
      "TAG": "migração",
      "MODULO_ID": 1
    },
    {
      "ID": 2,
      "TITULO": "Design Thinking e carreira",
      "TIPO": "Artigo",
      "DURACAO": 300,
      "FONTE": "https://medium.com/orangejuicefc/design-thinking-e-carreira-como-migrei-de-psicologia-para-ux-design-cb79e8b47df5",
      "DESCRICAO": "Como migrei de Psicologia para UX Design. Bom, como o próprio título já entrega eu cursei Psicologia na universidade, e após concluir o curso era esperado que eu seguisse uma carreira \"tradicional da área\". Para quem não conhece muito de Psicologia, ela se subdivide em PsicologiaS. Isso mesmo, com S grande no final para dar destaque que são diversos campos de atuação e saber!",
      "TAG": "migração",
      "MODULO_ID": 1
    }
  ],
  "error": false
}
```

##### <b> /conteudos/porIdTrilha/{id da trilha}</b>

Lista todos os conteúdos da trilha de id especificado.
Exemplo da resposta esperada:

```json
{
  "conteudos": [
    {
      "ID": 1,
      "TITULO": "Guia de como migrar para ux design",
      "TIPO": "Artigo",
      "DURACAO": 360,
      "FONTE": "https://medium.com/orangejuicefc/guia-definitivo-de-como-migrar-para-ux-design-5-passos-para-virar-um-ux-1675f71796b4",
      "DESCRICAO": "Se você quer saber de uma vez por todas qual é a fórmula mágica para conseguir fazer a migração de carreira para UX Design e começar a ganhar rios de dinheiro, este é o  para você…só que não.",
      "TAG": "migração",
      "MODULO_ID": 1
    },
    {
      "ID": 2,
      "TITULO": "Design Thinking e carreira",
      "TIPO": "Artigo",
      "DURACAO": 300,
      "FONTE": "https://medium.com/orangejuicefc/design-thinking-e-carreira-como-migrei-de-psicologia-para-ux-design-cb79e8b47df5",
      "DESCRICAO": "Como migrei de Psicologia para UX Design. Bom, como o próprio título já entrega eu cursei Psicologia na universidade, e após concluir o curso era esperado que eu seguisse uma carreira \"tradicional da área\". Para quem não conhece muito de Psicologia, ela se subdivide em PsicologiaS. Isso mesmo, com S grande no final para dar destaque que são diversos campos de atuação e saber!",
      "TAG": "migração",
      "MODULO_ID": 1
    }
  ],
  "error": false
}
```

##### <b> /conteudos/idTrilha/{id da trilha}</b>

Lista apenas o id do primeiro conteúdo da trilha de id especificado.
Exemplo da resposta esperada:

```json
{
  "conteudo": {
    "ID": 60
  },
  "error": false
}
```

##### <b> /conteudos/idModulo/{id do módulo}</b>

Lista apenas o id do primeiro conteúdo do módulo de id especificado.
Exemplo da resposta esperada:

```json
{
  "conteudo": {
    "ID": 1
  },
  "error": false
}
```

#### 🚞Tabela Trilhas

##### <b> /trilhas</b>

Lista todas as trilhas existentes no banco de dados.
Exemplo da resposta esperada:

```json
{
  "trilhas": [
    {
      "ID": 1,
      "TITULO": "Desenvolvimento Full-Stack",
      "DESCRICAO": "Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!"
    },
    {
      "ID": 2,
      "TITULO": "UX/UI Design",
      "DESCRICAO": "Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!"
    },
    {
      "ID": 3,
      "TITULO": "Quality Assurance",
      "DESCRICAO": "Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!"
    }
  ],
  "error": false
}
```

##### <b> /trilhas/id/{id da trilha}</b>

Lista a trilha de id especificado.
Exemplo da resposta esperada:

```json
{
  "trilha": {
    "ID": 1,
    "TITULO": "Desenvolvimento Full-Stack",
    "DESCRICAO": "Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!"
  },
  "error": false
}
```

#### 🔖Tabela Módulos

##### <b> /modulos</b>

Lista todas os módulos existentes no banco de dados.
Exemplo da resposta esperada:

```json
{
  "modulos": [
    {
      "ID": 1,
      "TITULO": "O inicio",
      "DESCRICAO": "Aqui é a base de todas as trilhas, para você aprender mais sobre todos os caminhos da tecnologia.",
      "TRILHA_ID": 1
    },
    {
      "ID": 2,
      "TITULO": "Conceitos básicos",
      "DESCRICAO": "Bem vindo a trilha de desenvolvimento full stack! Aqui irá aprender mais sobre os conceitos base da programação e do desenvolvimento web.",
      "TRILHA_ID": 1
    },
    {
      "ID": 3,
      "TITULO": "Opcional",
      "DESCRICAO": "Esse módulo é designado a conteudos opcionais recomendados por nós!",
      "TRILHA_ID": 1
    }
  ],
  "error": false
}
```

##### <b> /modulos/id/{id do módulo}</b>

Lista o módulo de id especificado.
Exemplo da resposta esperada:

```json
{
  "modulo": {
    "ID": 1,
    "TITULO": "O inicio",
    "DESCRICAO": "Aqui é a base de todas as trilhas, para você aprender mais sobre todos os caminhos da tecnologia.",
    "TRILHA_ID": 1
  },
  "error": false
}
```

##### <b> /modulos/porIdTrilha/{id da trilha}</b>

Lista todos os módulos da trilha de id especificado.
Exemplo da resposta esperada:

```json
{
  "modulos": [
    {
      "ID": 1,
      "TITULO": "O inicio",
      "DESCRICAO": "Aqui é a base de todas as trilhas, para você aprender mais sobre todos os caminhos da tecnologia.",
      "TRILHA_ID": 1
    },
    {
      "ID": 2,
      "TITULO": "Conceitos básicos",
      "DESCRICAO": "Bem vindo a trilha de desenvolvimento full stack! Aqui irá aprender mais sobre os conceitos base da programação e do desenvolvimento web.",
      "TRILHA_ID": 1
    },
    {
      "ID": 3,
      "TITULO": "Opcional",
      "DESCRICAO": "Esse módulo é designado a conteudos opcionais recomendados por nós!",
      "TRILHA_ID": 1
    }
  ],
  "error": false
}
```

#### Tabela usuário↔️conteúdo

##### <b> /usuario-conteudo</b>

Lista todos os conteúdos relacionados a usuarios existentes no banco de dados.
Exemplo da resposta esperada:

```json
{
  "conteudos": [
    {
      "ID": 1,
      "USUARIO_ID": 1,
      "CONTEUDO_ID": 1,
      "DONE": 0
    },
    {
      "ID": 2,
      "USUARIO_ID": 1,
      "CONTEUDO_ID": 2,
      "DONE": 0
    },
    {
      "ID": 3,
      "USUARIO_ID": 1,
      "CONTEUDO_ID": 3,
      "DONE": 0
    }
  ],
  "error": false
}
```

##### <b> /usuario-conteudo/conteudo-concluido/idUsuario/{id do usuário}/idTrilha/{id da trilha}</b>

Lista apenas os id's dos conteúdos concluidos pelo usuario de id especificado na trilha de id especificado.
Exemplo da resposta esperada:

```json
{
  "conteudos": [
    {
      "ID": 1
    },
    {
      "ID": 2
    },
    {
      "ID": 3
    },
    {
      "ID": 5
    }
  ],
  "error": false
}
```

##### <b> /usuario-conteudo/conteudo-concluido/idUsuario/{id do usuário}/idModulo/{id do módulo}</b>

Lista apenas os id's dos conteúdos concluidos pelo usuario de id especificado no módulo de id especificado.
Exemplo da resposta esperada:

```json
{
  "conteudos": [
    {
      "ID": 1
    },
    {
      "ID": 2
    }
  ],
  "error": false
}
```

##### <b> /usuario-conteudo/ultimo-concluido/idUsuario/{id do usuário}/idModulo/{id do módulo}</b>

Lista apenas o id do último conteúdo concluidos pelo usuario de id especificado no módulo de id especificado.
Exemplo da resposta esperada:

```json
{
  "conteudos": [
    {
      "ID": 1
    },
    {
      "ID": 2
    }
  ],
  "error": false
}
```

### <b> Rota POST </b>

#### 🫂Tabela Usuários

##### <b>/usuarios</b>

Cria um usuário e insere no banco de dados.
Exemplo de corpo a ser enviado como requisição:

```json
{
  "NOME_COMPLETO": "Bruno Souza",
  "EMAIL": "bruno.souza23@gmail.com",
  "SENHA": "1asda268",
  "ADMIN": false
}
```

Exemplo da resposta esperada:

```json
{
  "msg": "Usuario Bruno Souza criado com sucesso!",
  "usuario": {
    "nome_completo": "Bruno Souza",
    "email": "bruno.souza23@gmail.com",
    "senha": "1asda269",
    "admin": false
  },
  "error": false
}
```

#### 📚Tabela Conteudos

##### <b> /conteudos</b>

Cria um conteúdo e insere no banco de dados.
Exemplo de corpo a ser enviado como requisição:

```json
{
  "TITULO": "Aprenda Java em 2 horas",
  "TIPO": "Vídeo",
  "DURACAO": 7200,
  "FONTE": "https://youtube.com.br",
  "DESCRICAO": "Curso de java gratuito para aprender em duas horas.",
  "TAG": "curso",
  "MODULO_ID": 1
}
```

Exemplo da resposta esperada:

```json
{
  "msg": "Conteudo adicionado com sucesso!",
  "conteudo": {
    "titulo": "Aprenda Java em 2 horas",
    "tipo": "Vídeo",
    "duracao": 7200,
    "fonte": "https://youtube.com.br",
    "descricao": "Curso de java gratuito para aprender em duas horas.",
    "tag": "curso",
    "moduloId": 1
  },
  "error": false
}
```

#### 🚞Tabela Trilhas

##### <b> /trilhas</b>

Cria uma trilha e insere no banco de dados.
Exemplo de corpo a ser enviado como requisição:

```json
{
  "TITULO": "Desenvolvimento Back-End",
  "DESCRICAO": "Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!"
}
```

Exemplo da resposta esperada:

```json
{
  "msg": "Trilha criada com sucesso!",
  "trilha": {
    "titulo": "Desenvolvimento Back-End",
    "descricao": "Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!"
  },
  "error": true
}
```

#### 🔖Tabela Módulos

##### <b> /modulos</b>

Cria um módulo e insere no banco de dados.
Exemplo de corpo a ser enviado como requisição:

```json
{
  "TITULO": "Conceitos avançados",
  "DESCRICAO": "Chegou a hora de decolar, já que aprendeu os conceitos básicos, vamos dar uma reforçada no que aprendeu!",
  "TRILHA_ID": 1
}
```

Exemplo da resposta esperada:

```json
{
  "msg": "Modulo criado com sucesso!",
  "modulo": {
    "titulo": "Conceitos avançados",
    "descricao": "Chegou a hora de decolar, já que aprendeu os conceitos básicos, vamos dar uma reforçada no que aprendeu!",
    "trilhaId": 1
  },
  "error": false
}
```

#### Tabela usuário↔️conteúdo

##### <b> /usuario-conteudo</b>

Cria uma relação do conteúdo com o usuário e insere no banco de dados.
Exemplo de corpo a ser enviado como requisição:

```json
{
  "idUser": 2,
  "idContent": 50,
  "done": 1
}
```

Exemplo da resposta esperada:

```json
{
  "msg": "Registro de conteudo inserido com sucesso!",
  "error": false
}
```

### <b> Rota PUT </b>

#### 🫂Tabela Usuários

##### <b>/usuarios/id/{id do usuário}</b>

Atualiza o usuário do id especificado e insere no banco de dados.
Exemplo de corpo a ser enviado como requisição:

```json
{
  "NOME_COMPLETO": "Bruno Souza Lima",
  "EMAIL": "bruno.souza67@gmail.com",
  "SENHA": "lirio1234",
  "ADMIN": false
}
```

Exemplo da resposta esperada:

```json
{
  "msg": "Usuario de id 1 atualizado com sucesso!",
  "usuario": {
    "nome_completo": "Bruno Souza Lima",
    "email": "bruno.souza67@gmail.com",
    "senha": "lirio1234",
    "admin": false
  },
  "error": false
}
```

#### 📚Tabela Conteudos

##### <b> /conteudos/id/{id do conteúdo}</b>

Atualiza o conteúdo de id especificado e insere no banco de dados.
Exemplo de corpo a ser enviado como requisição:

```json
{
  "TITULO": "Aprenda Java em 3 horas",
  "TIPO": "Vídeo",
  "DURACAO": 10800,
  "FONTE": "https://youtube.com.br/3",
  "DESCRICAO": "Curso de java gratuito para aprender em três horas.",
  "TAG": "curso",
  "MODULO_ID": 1
}
```

Exemplo da resposta esperada:

```json
{
  "msg": "Conteudo de id 1 atualizado com sucesso!",
  "conteudo": {
    "titulo": "Aprenda Java em 3 horas",
    "tipo": "Vídeo",
    "duracao": 10800,
    "fonte": "https://youtube.com.br/3",
    "descricao": "Curso de java gratuito para aprender em três horas.",
    "tag": "curso",
    "moduloId": 1
  },
  "error": false
}
```

#### 🚞Tabela Trilhas

##### <b> /trilhas/id/{id da trilha}</b>

Atualiza a trilha de id especificado e insere no banco de dados.
Exemplo de corpo a ser enviado como requisição:

```json
{
  "TITULO": "Desenvolvimento Front-End",
  "DESCRICAO": "Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!"
}
```

Exemplo da resposta esperada:

```json
{
  "msg": "Trilha de id 1 atualizado com sucesso!",
  "trilha": {
    "titulo": "Desenvolvimento Front-End",
    "descricao": "Essa trilha foi montada pensando em quem está começando na área, ou passando por uma migração de carreira e ainda não sabe exatamente o que é esse mundo. Então, aperta o cinto e vem com a gente nessa jornada!"
  },
  "error": false
}
```

#### 🔖Tabela Módulos

##### <b> /modulos/id/{id do módulo}</b>

Atualiza o módulo de id especificado e insere no banco de dados.
Exemplo de corpo a ser enviado como requisição:

```json
{
  "TITULO": "Conceitos medianos",
  "DESCRICAO": "Módulo para reforçar o que já vimos até aqui!",
  "TRILHA_ID": 1
}
```

Exemplo da resposta esperada:

```json
{
  "msg": "Modulo de id 1 atualizado com sucesso!",
  "modulo": {
    "titulo": "Conceitos medianos",
    "descricao": "Módulo para reforçar o que já vimos até aqui!",
    "trilhaId": 1
  },
  "error": false
}
```

### <b> Rota DELETE </b>

#### 🫂Tabela Usuários

##### <b>/usuarios/id/{id do usuário}</b>

Deleta o usuário do id especificado.

Exemplo da resposta esperada:

```json
{
  "msg": "Usuario de id 1 deletado com sucesso!",
  "error": false
}
```

#### 📚Tabela Conteudos

##### <b> /conteudos/id/{id do conteúdo}</b>

Deleta o conteúdo do id especificado.

Exemplo da resposta esperada:

```json
{
  "msg": "Conteudo de id 1 deletado com sucesso!",
  "error": false
}
```

#### 🚞Tabela Trilhas

##### <b> /trilhas/id/{id da trilha}</b>

Deleta a trilha do id especificado.

Exemplo da resposta esperada:

```json
{
  "msg": "Trilha de id 1 deletado com sucesso!",
  "error": false
}
```

#### 🔖Tabela Módulos

##### <b> /modulos/id/{id do módulo}</b>

Deleta o módulo do id especificado.

Exemplo da resposta esperada:

```json
{
  "msg": "Modulo de id 1 deletado com sucesso!",
  "error": false
}
```

#### Tabela usuário↔️conteúdo

##### <b> /usuario-conteudo/idUser/{id do usuário}/idContent/{id do conteúdo}</b>

Deleta o relacionamento do contéudo com o usuário de id's especificados.

Exemplo da resposta esperada:

```json
{
  "msg": "Registro de usuario 2 e conteudo 3 removido com sucesso!"
}
```

---

## 🖇️ Checklist das endpoints

![Badge do status](https://img.shields.io/badge/STATUS-CONCLUIDO-green?style=for-the-badge)

##### CRUD da Entidade /usuarios

- [x] Create;
- [x] Read;
- [x] Update;
- [x] Delete;
- Funcionalidades extras:
  - [x] Login;
  - [x] Buscar trilhas do usuário;

##### CRUD da Entidade /trilhas

- [x] Create;
- [x] Read;
- [x] Update;
- [x] Delete;

##### CRUD da Entidade /conteudos

- [x] Create;
- [x] Read;
- [x] Update;
- [x] Delete;
- Funcionalidades extras:
  - [x] Buscar conteúdos da trilha;

##### CRUD da Entidade /conteudo-usuario

- [x] Create;
- [x] Read;
- [x] Delete;
- Funcionalidades extras:
  - [x] Buscar conteúdos concluidos do usuário por trilha;
  - [x] Buscar conteúdos concluidos do usuário por módulo;
  - [x] Buscar último contéudo concluido do usuário por módulo;

##### CRUD da Entidade /modulos

- [x] Create;
- [x] Read;
- [x] Update;
- [x] Delete;
- Funcionalidades extras:
  - [x] Buscar módulos por trilha;

---

## Meu time 🥇

<img src="https://media-exp1.licdn.com/dms/image/D4D03AQG2u97vSTMEHw/profile-displayphoto-shrink_200_200/0/1664583517795?e=1673481600&v=beta&t=DsTeCXuJg8p-NSveBftATVMDXBpj6NxTNC_i5EXScdo" />

<a href="https://www.linkedin.com/in/hudson-lima-uchoa/" >Hudson Lima</a>
