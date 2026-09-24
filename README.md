# 🧮 CalculaTudo

> **Uma plataforma web com calculadoras e ferramentas práticas para situações do dia a dia, estudos e simulações financeiras.**

O **CalculaTudo** é uma aplicação web desenvolvida para reunir diferentes ferramentas de cálculo em um único ambiente, com uma interface simples, intuitiva e responsiva.

O projeto foi construído como uma aplicação **Full Stack**, permitindo colocar em prática conhecimentos de **HTML, CSS, JavaScript, Python, Flask, MySQL, APIs e integração entre Front-end e Back-end**.

---

## 🌐 Sobre o projeto

O objetivo do CalculaTudo é transformar fórmulas e operações que normalmente seriam realizadas manualmente em ferramentas interativas e fáceis de utilizar.

Atualmente, a plataforma conta com calculadoras para:

* 🔢 Operações matemáticas
* 📊 Porcentagens
* 🎂 Idade
* 🌡️ Temperaturas
* 💱 Conversão de moedas
* 🪪 Validação matemática de CPF
* ⚖️ IMC
* 💰 Juros compostos
* 🎓 Média escolar

Além das calculadoras, o projeto possui um **sistema de feedback**, integrado a um backend desenvolvido em Flask e a um banco de dados MySQL.

---

## ✨ Funcionalidades

| Ferramenta            | Descrição                                                         |
| --------------------- | ----------------------------------------------------------------- |
| 🔢 Calculadora Básica | Realiza operações de adição, subtração, multiplicação e divisão   |
| 📊 Porcentagem        | Calcula porcentagens, aumentos e descontos                        |
| 🎂 Idade              | Calcula a idade a partir da data de nascimento                    |
| 🌡️ Temperatura       | Converte valores entre Celsius, Fahrenheit e Kelvin               |
| 💱 Moedas             | Realiza conversões entre Real, Dólar e Euro                       |
| 🪪 CPF                | Verifica a validade matemática de um CPF                          |
| ⚖️ IMC                | Calcula o Índice de Massa Corporal                                |
| 💰 Juros Compostos    | Simula o crescimento de um capital ao longo do tempo              |
| 🎓 Média Escolar      | Calcula médias a partir de notas                                  |
| 📝 Feedback           | Permite enviar avaliações através do sistema integrado ao backend |

---

# 🧮 Calculadoras

## 🔢 Calculadora Básica

Uma calculadora para operações matemáticas fundamentais.

O usuário pode inserir números e operadores através da interface e realizar operações de:

* Adição
* Subtração
* Multiplicação
* Divisão

Também existem funções para **limpar a expressão** e **apagar o último caractere**.

### Objetivo

Aplicar conceitos de JavaScript, manipulação do DOM e lógica de programação na criação de uma calculadora funcional diretamente no navegador.

---

## 📊 Calculadora de Porcentagem

Permite realizar cálculos percentuais de maneira rápida.

Pode ser utilizada para:

* Descontos
* Aumentos
* Proporções
* Comparações
* Exercícios matemáticos

### Objetivo

Transformar operações envolvendo porcentagem em uma ferramenta simples para situações acadêmicas e do cotidiano.

---

## 🎂 Calculadora de Idade

Calcula a idade de uma pessoa utilizando sua data de nascimento.

O sistema trabalha com **datas e diferenças temporais**, permitindo automatizar um cálculo que normalmente seria realizado manualmente.

### Objetivo

Praticar manipulação de datas em JavaScript e desenvolver uma ferramenta útil para situações que envolvem informações temporais.

---

## 🌡️ Conversor de Temperatura

Realiza conversões entre diferentes escalas de temperatura:

**Celsius ↔ Fahrenheit ↔ Kelvin**

O usuário informa o valor, seleciona as escalas desejadas e recebe o resultado automaticamente.

### Objetivo

Aplicar fórmulas matemáticas em uma interface interativa e facilitar conversões utilizadas em estudos e situações práticas.

---

## 💱 Conversor de Moedas

Permite realizar conversões entre diferentes moedas, incluindo:

* 🇧🇷 Real
* 🇺🇸 Dólar Americano
* 🇪🇺 Euro

O projeto possui páginas específicas para diferentes direções de conversão.

### Objetivo

Demonstrar como operações matemáticas podem ser aplicadas em um contexto financeiro e criar uma ferramenta prática para conversão de valores.

> **Nota:** as taxas utilizadas atualmente são configuradas no projeto e não representam cotações em tempo real.

---

## 🪪 Verificador de CPF

Ferramenta responsável por verificar a **validade matemática** de um CPF.

O algoritmo utiliza os dígitos informados e realiza os cálculos necessários para verificar os dígitos verificadores.

### Objetivo

Aplicar lógica de programação e algoritmos matemáticos em uma situação semelhante às encontradas em sistemas reais de cadastro.

> A ferramenta verifica a estrutura matemática do CPF. Ela não consulta bases oficiais e não confirma a existência ou titularidade do documento.

---

## ⚖️ Calculadora de IMC

Calcula o **Índice de Massa Corporal** utilizando:

* Peso
* Altura

Após o cálculo, o sistema apresenta o resultado e sua classificação correspondente.

### Objetivo

Aplicar uma fórmula matemática em uma aplicação web interativa, trabalhando também com entrada e tratamento de dados.

> O IMC é um indicador geral e não substitui uma avaliação profissional de saúde.

---

## 💰 Calculadora de Juros Compostos

Permite realizar simulações envolvendo juros compostos.

O cálculo considera informações como:

* Capital inicial
* Taxa de juros
* Período

A partir desses dados, é possível visualizar como o capital pode evoluir ao longo do tempo.

### Objetivo

Demonstrar a aplicação de fórmulas financeiras em uma ferramenta web e facilitar o entendimento do efeito dos juros compostos.

Pode ser utilizada para:

* Simulações de investimentos
* Estudos financeiros
* Comparação de taxas
* Projeções de valores futuros

> Os resultados são simulações matemáticas e não representam recomendação ou garantia de rentabilidade.

---

## 🎓 Calculadora de Média Escolar

Permite inserir notas e calcular uma média de forma automática.

A ferramenta pode ser utilizada para:

* Calcular médias de disciplinas
* Acompanhar desempenho acadêmico
* Simular diferentes resultados
* Conferir notas

### Objetivo

Criar uma ferramenta simples para estudantes e, ao mesmo tempo, praticar lógica matemática e manipulação de dados através de JavaScript.

---

# 🏗️ Arquitetura

O projeto utiliza uma arquitetura dividida em **Front-end, Back-end e Banco de Dados**.

```text
CalculaTudo_
│
├── frontend/
│   ├── calculadora_numerica/
│   ├── calculadora_porcentagem/
│   ├── calculadora_idade/
│   ├── conversao_temp/
│   ├── calculadora_conversao/
│   ├── cpf/
│   ├── imc/
│   ├── juros_compostos/
│   └── media_escolar/
│
├── backend/
│   └── API Flask
│
├── img/
│   └── imagens e elementos visuais
│
├── requirements.txt
├── index.html
└── README.md
```

A comunicação do sistema pode ser representada da seguinte forma:

```text
┌─────────────────────┐
│      Front-end      │
│  HTML + CSS + JS    │
└──────────┬──────────┘
           │
           │ HTTP
           ▼
┌─────────────────────┐
│      Flask API      │
│       Python        │
└──────────┬──────────┘
           │
           │ SQL
           ▼
┌─────────────────────┐
│       MySQL         │
│  Dados de feedback  │
└─────────────────────┘
```

---

# 🛠️ Tecnologias

### Front-end

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)

### Back-end

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge\&logo=flask\&logoColor=white)

### Banco de Dados

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)

### Ferramentas

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)

---

# 🔌 Integração Back-end

Além das calculadoras executadas no navegador, o projeto possui um backend desenvolvido utilizando **Python + Flask**.

O backend é responsável por disponibilizar endpoints para comunicação com o Front-end.

Um dos recursos é o sistema de feedback:

```text
Usuário
   │
   ▼
Formulário HTML
   │
   ▼
JavaScript
   │
   │ HTTP Request
   ▼
Flask API
   │
   │ SQL
   ▼
MySQL
```

Essa integração permite praticar conceitos importantes de desenvolvimento Full Stack, como:

* APIs REST
* Requisições HTTP
* CORS
* Comunicação Front-end ↔ Back-end
* Persistência de dados
* Conexão Python ↔ MySQL

---

# 🚀 Como executar

## 1. Clone o repositório

```bash
git clone https://github.com/allansouza07/CalculaTudo_.git

cd CalculaTudo_
```

## 2. Instale as dependências

Com o Python instalado:

```bash
pip install -r requirements.txt
```

Principais dependências:

```text
Flask
Flask-CORS
mysql-connector-python
python-dotenv
```

## 3. Configure o banco

Configure as variáveis de ambiente no arquivo `.env`:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

## 4. Execute o backend

```bash
python app.py
```

O servidor será executado localmente, normalmente em:

```text
http://localhost:5000
```

## 5. Execute o Front-end

Abra o `index.html` no navegador ou utilize uma extensão como o **Live Server** no VS Code.

---

# 📚 Principais conceitos praticados

Durante o desenvolvimento do CalculaTudo, foram aplicados conceitos de diferentes áreas do desenvolvimento de software.

### Front-end

* HTML semântico
* CSS
* Responsividade
* JavaScript
* Manipulação do DOM
* Eventos
* Validação de entradas
* Funções
* Lógica de programação

### Back-end

* Python
* Flask
* APIs
* Rotas
* Requisições HTTP
* Flask-CORS
* Variáveis de ambiente

### Banco de Dados

* MySQL
* SQL
* INSERT
* SELECT
* Conexão com banco de dados
* Persistência de informações

### Desenvolvimento

* Git
* GitHub
* Organização de projetos
* Separação entre Front-end e Back-end
* Estruturação de aplicações web

---

# 🎯 Objetivos do projeto

O CalculaTudo foi desenvolvido principalmente como um projeto prático de aprendizado e evolução no desenvolvimento web.

Entre os objetivos estão:

* Transformar conhecimentos teóricos em aplicações funcionais.
* Praticar JavaScript através de diferentes problemas.
* Desenvolver uma aplicação Full Stack.
* Integrar Front-end, Back-end e Banco de Dados.
* Trabalhar com APIs.
* Melhorar a organização de projetos.
* Criar uma aplicação que possa evoluir continuamente com novas ferramentas.

---

# 🔮 Próximos passos

Algumas possibilidades de evolução para o projeto:

* [ ] Adicionar novas calculadoras.
* [ ] Melhorar a responsividade em dispositivos móveis.
* [ ] Criar um sistema de histórico de cálculos.
* [ ] Integrar APIs externas para obter cotações de moedas em tempo real.
* [ ] Melhorar o sistema de feedback.
* [ ] Criar testes automatizados.
* [ ] Melhorar a arquitetura do Back-end.
* [ ] Implementar autenticação de usuários.
* [ ] Criar uma interface administrativa para visualizar feedbacks.
* [ ] Realizar o deploy completo do Back-end e Banco de Dados.

---

# 👨‍💻 Autor

**Allan Souza**

Estudante de **Análise e Desenvolvimento de Sistemas — IFSP**.

Desenvolvedor em formação com interesse em **desenvolvimento de software, Back-end, bancos de dados e análise de dados**.

---

## 📄 Licença

Este projeto está disponível sob a licença **MIT**.
