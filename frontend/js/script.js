const formulario = document.getElementById("form-feedback");

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const feedback = document.getElementById("feedback").value;

    const dados = {
        nome: nome,
        email: email,
        feedback: feedback
    };

    try {

        const resposta = await fetch("http://localhost:5000/feedback", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)

        });

        const resultado = await resposta.json();

        alert(resultado.mensagem);

        formulario.reset();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao enviar o feedback.");

    }

});