from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

CORS(app)

def conectar_banco():

    conexao = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

    return conexao


@app.route("/feedback", methods=["POST"])
def receber_feedback():

    dados = request.get_json()

    nome = dados["nome"]
    email = dados["email"]
    feedback = dados["feedback"]

    conexao = conectar_banco()

    cursor = conexao.cursor()

    sql = """
        INSERT INTO feedbacks
        (nome, email, feedback)
        VALUES (%s, %s, %s)
    """

    valores = (nome, email, feedback)

    cursor.execute(sql, valores)

    conexao.commit()

    cursor.close()
    conexao.close()

    return jsonify({
        "mensagem": "Feedback enviado com sucesso!"
    })


if __name__ == "__main__":
    app.run(debug=True)
    
