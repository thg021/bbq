# BBQ - Agenda de Churras

![Logo do BBQ](caminho-para-logo.png) <!-- Substitua pela sua logo ou uma imagem apropriada -->

**Versão:** 0.1.0
**Autor:** Seu Nome
**Data:** 29 de Agosto de 2023

## Descrição

O BBQ (Agenda de Churras) é um aplicativo web construído usando o Next.js 13, projetado para ajudá-lo a organizar e gerenciar eventos de churrasco. Seja planejando um pequeno encontro ou uma grande festa de churrasco, o BBQ tem tudo o que você precisa. Este README fornece um guia abrangente para configurar, executar e personalizar o aplicativo BBQ.

## Tabela de Conteúdo

- [Recursos](#recursos)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Licença](#licença)

## Recursos

- Autenticação e autorização de usuário usando o NextAuth.js.
- Componentes de interface interativos do ecossistema Radix UI e Tailwind CSS.
- Gerenciamento de dados perfeito e sincronização de estado com o React Query.
- Persistência e manipulação de dados com o ORM Prisma.
- Manipulação de formulários com o React Hook Form.
- Notificações de toast usando o componente Toast da Radix UI.
- Verificação de linting e qualidade de código usando ESLint e Prettier.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes pré-requisitos:

- Node.js (>=14.0.0)
- npm (>=6.0.0) ou Yarn (>=1.0.0)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/your-username/bbq.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd bbq
   ```

3. Instale as dependências usando npm:

   ```bash
   npm install
   ```

   Ou, se preferir o Yarn:

   ```bash
   yarn
   ```

## Configuração

1. Crie um arquivo `.env.local` na raiz do diretório do projeto.

2. Defina as variáveis de ambiente no arquivo `.env.local`. Por exemplo:

   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   AUTH_SECRET="secret"
   ```

   Substitua `file:./dev.db` pela URL real do seu banco de dados.

## Uso

1. Inicie o servidor de desenvolvimento:

  ```bash
   npm prisma migrate dev
   ```

   ```bash
   npm run dev
   ```

   Ou, usando o Yarn:

   ```bash
   yarn dev
   ```

2. Abra o seu navegador e vá para `http://localhost:3000` para acessar o aplicativo BBQ.

3. Siga as instruções na tela para criar uma conta e começar a planejar os seus eventos de churrasco!


## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

Divirta-se planejando e organizando os seus eventos de churrasco com o BBQ! Se encontrar algum problema ou tiver sugestões para melhorias, sinta-se à vontade para abrir uma issue no [repositório do GitHub](https://github.com/your-username/bbq).
