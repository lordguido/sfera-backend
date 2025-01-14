# sfera-backend

Instalar:
 - Cors
 - Express
 - JWT
 - Bcrypt
 - uuid

Definir:
 - Qual lib para datas

### Estrutura de Pastas

sfera-backend/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   └── middlewares/
│   ├── config/
│   ├── jobs/
│   ├── reports/
│   ├── scripts/
│   ├── utils/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── models/
│   └── index.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .vscode/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── .env.example

### Explicação de Cada Pasta

#### 1. **src/** 
Pasta principal onde o código-fonte é organizado de maneira modular. É o núcleo do projeto.

- **api/**:
  - **controllers/**: Contém os controladores que recebem as requisições e delegam tarefas para serviços.
  - **services/**: Contém a lógica de negócios da aplicação.
  - **repositories/**: Implementa a comunicação com o banco de dados.
  - **routes/**: Define as rotas da aplicação, separando-as por funcionalidade.
  - **middlewares/**: Contém middlewares para validação, autenticação, etc.

- **config/**:
  Contém as configurações de ambiente, como conexão com o banco de dados, configurações de autenticação, etc.

- **jobs/**:
  Scripts para tarefas agendadas ou rotinas de manutenção, usando ferramentas como `node-cron`.

- **reports/**:
  Módulo para a geração de relatórios, incluindo templates e lógica relacionada.

- **scripts/**:
  Scripts utilitários, como scripts de inicialização, geração de dumps de banco, etc.

- **utils/**:
  Funções auxiliares e reutilizáveis, como formatação de datas, validação de entradas, etc.

- **database/**:
  - **migrations/**: Arquivos para controle de versão do banco de dados.
  - **seeders/**: Dados iniciais ou de teste para popular o banco.
  - **models/**: Definições das entidades e suas relações no banco.

- **index.js**:
  Ponto de entrada da aplicação, responsável por inicializar o servidor e carregar as configurações.

---

#### 2. **tests/** 
Pasta dedicada aos testes do projeto.

- **unit/**: Testes unitários, focados em funções ou métodos individuais.
- **integration/**: Testes de integração entre diferentes módulos.
- **e2e/**: Testes ponta-a-ponta, simulando o comportamento real do sistema.

---

#### 3. **.vscode/** 
Configurações específicas do VSCode, como linting, formatação e outras extensões.

---

#### 4. Arquivos de Configuração

- **.gitignore**: Lista de arquivos/pastas que não devem ser rastreados pelo Git.
- **package.json** e **package-lock.json**: Gerenciamento de dependências e informações do projeto.
- **README.md**: Documentação inicial do projeto.
- **.env.example**: Exemplo de arquivo de variáveis de ambiente para fácil configuração.
