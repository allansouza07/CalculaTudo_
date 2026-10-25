
const seletorQuantidade = document.getElementById("quantidadeNotas");
const formulario = document.getElementById("formMedia");
const camposNotas = document.getElementById("camposNotas");

const resultado = document.getElementById("resultado");
const valorMedia = document.getElementById("valorMedia");
const situacao = document.getElementById("situacao");
const detalhes = document.getElementById("detalhes");
const botaoLimpar = document.getElementById("limpar");

// Cria somente a quantidade de campos selecionada.
function criarCamposNotas() {
    const quantidade = Number(seletorQuantidade.value);

    camposNotas.innerHTML = "";

    for (let i = 1; i <= quantidade; i++) {
        const grupo = document.createElement("div");
        grupo.className = "campo-nota";

        const label = document.createElement("label");
        label.htmlFor = `nota${i}`;
        label.textContent = `Nota ${i}`;

        const input = document.createElement("input");
        input.id = `nota${i}`;
        input.name = `nota${i}`;
        input.type = "text";
        input.inputMode = "decimal";
        input.placeholder = "Ex.: 8,5";
        input.autocomplete = "off";
        input.required = true;
        input.setAttribute("aria-label", `Nota ${i}`);

        grupo.append(label, input);
        camposNotas.appendChild(grupo);
    }

    resultado.hidden = true;
}

// Lê e valida cada nota. Aceita vírgula ou ponto decimal.
function lerNota(input) {
    const texto = input.value.trim().replace(",", ".");

    if (texto === "") {
        return {
            valido: false,
            motivo: "Preencha todas as notas."
        };
    }

    const nota = Number(texto);

    if (!Number.isFinite(nota)) {
        return {
            valido: false,
            motivo: "Digite um número válido para cada nota."
        };
    }

    if (nota < 0 || nota > 10) {
        return {
            valido: false,
            motivo: "Cada nota deve estar entre 0 e 10."
        };
    }

    return {
        valido: true,
        valor: nota
    };
}

// Calcula a média aritmética simples.
function calcularMedia(evento) {
    evento.preventDefault();

    const quantidade = Number(seletorQuantidade.value);
    const notas = [];

    for (let i = 1; i <= quantidade; i++) {
        const input = document.getElementById(`nota${i}`);
        const leitura = lerNota(input);

        if (!leitura.valido) {
            resultado.hidden = false;

            valorMedia.textContent = "—";
            situacao.className = "situacao atencao";
            situacao.textContent = leitura.motivo;
            detalhes.textContent = "";

            input.focus();
            return;
        }

        notas.push(leitura.valor);
    }

    const soma = notas.reduce((total, nota) => total + nota, 0);
    const media = soma / notas.length;

    resultado.hidden = false;

    valorMedia.textContent = media.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Referência visual: média 6,0.
    // Ajuste este limite conforme a regra da instituição.
    if (media >= 6) {
        situacao.className = "situacao aprovado";
        situacao.textContent = "Média igual ou superior a 6,0";
    } else {
        situacao.className = "situacao atencao";
        situacao.textContent = "Média abaixo de 6,0";
    }

    detalhes.textContent =
        `Soma das notas: ${soma.toLocaleString("pt-BR", {
            maximumFractionDigits: 2
        })} · ${notas.length} avaliação(ões).`;
}

// Atualiza os campos ao escolher 2, 3 ou 4 notas.
seletorQuantidade.addEventListener("change", criarCamposNotas);

// Calcula quando o formulário é enviado.
formulario.addEventListener("submit", calcularMedia);

// Limpa os campos e reinicia o formulário.
botaoLimpar.addEventListener("click", () => {
    criarCamposNotas();
    resultado.hidden = true;
    document.getElementById("nota1").focus();
});

// Inicializa a calculadora com quatro notas.
criarCamposNotas();
