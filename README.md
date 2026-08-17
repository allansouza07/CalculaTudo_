# CalculaTudo 

Um site com diferentes calculadoras e ferramentas úteis para realizar cálculos de forma simples, rápida e intuitiva.

> **Status do projeto:** Em desenvolvimento, o site ainda não possui deploy do backend em produção.
> Para utilizar o formulário de feedback do `index`, é necessário executar o backend localmente.

---

## 🚀 Tecnologias utilizadas

### Front-end

* HTML5
* CSS3
* JavaScript

### Back-end

* Python
* Flask
* Flask-CORS

### Banco de dados

* MySQL

---



# 💻 Como executar localmente

Para utilizar o projeto completo, principalmente o formulário presente no `index`, é necessário executar o backend.

## 1. Clone o repositório

No terminal:

```bash
git clone https://github.com/allansouza07/CalculaTudo_.git
```

Entre na pasta do projeto:

```bash
cd CalculaTudo_
```

---

## 2. Instale as dependências do Python

Tenha o **Python** instalado.

Depois, execute:

```bash
pip install -r requirements.txt
```

As principais dependências utilizadas pelo backend são:

```text
Flask
Flask-CORS
mysql-connector-python
python-dotenv
```

---

## 3. Configure o banco de dados

O backend utiliza um banco de dados **MySQL** para armazenar as informações enviadas pelo formulário.

Crie o banco de dados e a tabela necessários para o projeto.

Depois, configure as informações de conexão no arquivo `.env`.

Exemplo:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

# ▶️ 4. Inicie o backend

Entre na pasta onde está o arquivo responsável pelo Flask e execute:

```bash
python app.py
```

Se estiver tudo correto, o Flask ficará disponível em:

```text
http://localhost:5000
```

Você deverá manter esse terminal **aberto enquanto estiver utilizando o formulário**.

---

# 📝 5. Execute o site

Depois de iniciar o backend, abra o site normalmente no navegador.

O formulário do `index` enviará os dados para o servidor Flask através do endereço local:

```text
http://localhost:5000/feedback
```


# 👨‍💻 Autor

**Allan Souza**

Estudante de Análise e Desenvolvimento de Sistemas.

Desenvolvido como projeto para praticar desenvolvimento **Front-end, Back-end e Banco de Dados**.

---

# LICENÇA

MIT Lisence
