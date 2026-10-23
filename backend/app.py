import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.getenv("FRONTEND_ORIGIN", "*")}})

def conectar_banco():
    return mysql.connector.connect(
        host=os.getenv("MYSQLHOST") or os.getenv("DB_HOST", "127.0.0.1"),
        port=int(os.getenv("MYSQLPORT") or os.getenv("DB_PORT", "3306")),
        user=os.getenv("MYSQLUSER") or os.getenv("DB_USER"),
        password=os.getenv("MYSQLPASSWORD") or os.getenv("DB_PASSWORD"),
        database=os.getenv("MYSQLDATABASE") or os.getenv("DB_NAME"),
        connection_timeout=10,
    )

@app.get("/")
def inicio():
    return jsonify({"servico": "CalculaTudo API", "status": "online"})

@app.get("/health")
def health():
    return jsonify({"status": "ok"})

@app.get("/health/database")
def health_database():
    conexao = None
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()
        cursor.close()
        return jsonify({"status": "connected", "database": "ok"})
    except (Error, TypeError, ValueError):
        app.logger.exception("Falha ao conectar ao MySQL")
        return jsonify({"status": "unavailable", "message": "Banco indisponível"}), 503
    finally:
        if conexao and conexao.is_connected():
            conexao.close()

@app.post("/feedback")
def receber_feedback():
    dados = request.get_json(silent=True) or {}
    nome = str(dados.get("nome", "")).strip()
    email = str(dados.get("email", "")).strip()
    feedback = str(dados.get("feedback", "")).strip()
    if not nome or not email or not feedback:
        return jsonify({"mensagem": "Preencha nome, e-mail e feedback."}), 400
    if len(nome) > 120 or len(email) > 254 or len(feedback) > 5000:
        return jsonify({"mensagem": "Um ou mais campos excedem o tamanho permitido."}), 400

    conexao = cursor = None
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        cursor.execute(
            "INSERT INTO feedbacks (nome, email, feedback) VALUES (%s, %s, %s)",
            (nome, email, feedback)
        )
        conexao.commit()
        return jsonify({"mensagem": "Feedback enviado com sucesso!"}), 201
    except Error:
        app.logger.exception("Erro ao salvar feedback")
        if conexao and conexao.is_connected():
            conexao.rollback()
        return jsonify({"mensagem": "Não foi possível salvar o feedback. Tente novamente."}), 500
    finally:
        if cursor:
            cursor.close()
        if conexao and conexao.is_connected():
            conexao.close()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=False)
