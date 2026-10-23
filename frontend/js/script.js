
const API_URL = "https://refreshing-rejoicing-production-0ae5.up.railway.app";

const formulario = document.getElementById("form-feedback");

if (formulario) {
  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const botao = formulario.querySelector('button[type="submit"]');
    const textoOriginal = botao?.textContent || "Enviar feedback";

    const dados = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      feedback: document.getElementById("feedback").value.trim()
    };

    if (!dados.nome || !dados.email || !dados.feedback) {
      alert("Preencha nome, e-mail e feedback.");
      return;
    }

    if (botao) {
      botao.disabled = true;
      botao.textContent = "Enviando...";
    }

    try {
      const resposta = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.mensagem || `Erro HTTP ${resposta.status}`
        );
      }

      alert(resultado.mensagem || "Feedback enviado com sucesso!");
      formulario.reset();
    } catch (erro) {
      console.error("Erro ao enviar feedback:", erro);
      alert("Não foi possível enviar o feedback. Verifique a API.");
    } finally {
      if (botao) {
        botao.disabled = false;
        botao.textContent = textoOriginal;
      }
    }
  });
}
