# TECH-CHALLENGE-2

Tech Challenge 2 é uma API em Node.JS que integra um Banco de Dados MongoDB, desenvolvida como atividade que integra os conhecimentos adquiridos durante o módulo de Backend e Qualidade da Pós Tech FIAP Full Stack Development do Grupo 1 Turma 2FSDT.

- Clonar código no GitHub:

`git clone git@github.com:douglas-yokomizo/tech-challenge-2.git`

## Instalação Docker

- Subir a aplicação utilizando Docker:

`docker-compose up`

## Instalação Local

- Subir a aplicação local:

`npm install && npm run dev`

- Buildar o TypeScript e subir o servidor local:

`npm run build && npm run start`

- Para formatar o code:

`npm run format`

- Para verificar padronização do código:

`npm run lint`

## Endpoints

Executar via Postman utilizando url: `http://localhost:8000/`

- New Post

`POST /posts`

```typescript
{
  "title": "ChallengeNew",
  "content": "API criando um post."
}
```

- All Posts

`GET /posts`

- Single Post

`GET /posts/:id`

- Update Post

`PATCH /posts/:id`

```typescript
{
  "title": "ChallengeUpdate",
  "content": "API atualizando um post."
}
```

- Delete Post

`DELETE /posts/:id`
