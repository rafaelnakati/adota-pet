# AdotaPet 🐾

Organizações e grupos voluntários de proteção animal frequentemente enfrentam dificuldades na gestão e divulgação dos animais resgatados, recorrendo ao uso de planilhas informais e redes sociais de forma descentralizada. Diante desse cenário, este projeto propõe o desenvolvimento do **AdotaPet**, uma plataforma web voltada a centralizar o cadastro e a exibição de animais disponíveis para adoção, com o intuito de facilitar a organização interna das instituições e padronizar o contato com possíveis adotantes. 

A abordagem metodológica pautou-se nas fases do Design Thinking (ouvir, criar e implementar). O trabalho iniciou-se com o mapeamento das dificuldades da comunidade externa, o que norteou os requisitos e a concepção do sistema. Como base tecnológica, optou-se pela utilização do framework **Next.js** para a construção da interface pública, do **Payload CMS** para a abstração do painel administrativo e do **MongoDB** para a persistência das informações. 

Os resultados alcançados contemplam a configuração inicial do banco de dados e a elaboração da arquitetura base do projeto. Ademais, concluiu-se a implementação das telas principais, abrangendo o painel administrativo para cadastro de animais e a página inicial que funciona como vitrine de adoção. As validações sugerem que a unificação das informações computacionais contribui para a redução do esforço manual dos voluntários e melhora a experiência de busca dos usuários interessados, indicando a viabilidade técnica da proposta.

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) (Frontend Público / App Router)
- [Payload CMS](https://payloadcms.com/) (Painel Administrativo Headless)
- [MongoDB](https://www.mongodb.com/) (Banco de Dados)

## 💻 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/rafaelnakati/adota-pet.git
   cd adota-pet
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Crie e configure o arquivo `.env` baseado no exemplo fornecido:
   ```bash
   cp .env.example .env
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

A aplicação estará disponível em `http://localhost:3000`. O painel administrativo fica localizado em `http://localhost:3000/admin`.
