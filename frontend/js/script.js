// Após o deploy, substitua pela URL pública da API Railway, sem barra no final.
const API_URL = "https://refreshing-rejoicing-production-0ae5.up.railway.app.up.railway.app";

fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nome: nome,
        email: email,
        feedback: feedback
    })
});
const formulario = document.getElementById("form-feedback");

if (formulario) {
  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const botao = formulario.querySelector('button[type="submit"]');
    const textoOriginal = botao?.textContent || "";
    const dados = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      feedback: document.getElementById("feedback").value.trim()
    };
    if (botao) { botao.disabled = true; botao.textContent = "Enviando..."; }
    try {
      const resposta = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
      const resultado = await resposta.json();
      if (!resposta.ok) throw new Error(resultado.mensagem || "Falha ao enviar feedback.");
      alert(resultado.mensagem || "Feedback enviado com sucesso!");
      formulario.reset();
    } catch (erro) {
      console.error("Falha ao enviar feedback:", erro);
      alert(erro.message || "Erro ao enviar feedback. Tente novamente.");
    } finally {
      if (botao) { botao.disabled = false; botao.textContent = textoOriginal; }
    }
  });
}
