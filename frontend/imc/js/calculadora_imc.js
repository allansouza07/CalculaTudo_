
(() => {
    "use strict";

    const form = document.getElementById("form-imc");

    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");
    const erro = document.getElementById("erro");

    const elementos = {
        valor: document.getElementById("valor-imc"),
        classificacao: document.getElementById("classificacao"),
        peso: document.getElementById("peso-informado"),
        altura: document.getElementById("altura-informada"),
        mensagem: document.getElementById("mensagem-resultado"),
        marcador: document.getElementById("marcador")
    };

    // Aceita vírgula ou ponto como separador decimal.
    function lerNumero(valor) {
        return Number(
            String(valor).trim().replace(",", ".")
        );
    }

    // Classificação do IMC para adultos.
    function obterClassificacao(imc) {

        if (imc < 18.5) {
            return {
                nome: "Abaixo do peso",
                mensagem:
                    "O resultado está abaixo da faixa de referência para adultos."
            };
        }

        if (imc < 25) {
            return {
                nome: "Faixa adequada",
                mensagem:
                    "O resultado está na faixa de referência considerada adequada para adultos. "
            };
        }

        if (imc < 30) {
            return {
                nome: "Sobrepeso",
                mensagem:
                    "O resultado está na faixa de sobrepeso para adultos."
            };
        }

        if (imc < 35) {
            return {
                nome: "Obesidade grau I",
                mensagem:
                    "O resultado está na faixa de obesidade grau I para adultos."
            };
        }

        if (imc < 40) {
            return {
                nome: "Obesidade grau II",
                mensagem:
                    "O resultado está na faixa de obesidade grau II para adultos."
            };
        }

        return {
            nome: "Obesidade grau III",
            mensagem:
                "O resultado está na faixa de obesidade grau III para adultos."
        };
    }

    // Atualiza a mensagem de resultado.
    function exibirMensagem(texto) {

        elementos.mensagem.replaceChildren();

        const icone = document.createElement("span");

        icone.setAttribute("aria-hidden", "true");
        icone.textContent = "💡";

        const paragrafo = document.createElement("p");

        paragrafo.textContent = texto;

        elementos.mensagem.append(
            icone,
            paragrafo
        );
    }

    // Limpa os resultados.
    function limparResultado() {

        elementos.valor.textContent = "—";

        elementos.classificacao.textContent =
            "Aguardando seus dados";

        elementos.peso.textContent = "—";
        elementos.altura.textContent = "—";

        elementos.marcador.hidden = true;

        exibirMensagem(
            "Preencha os campos e selecione calcular para visualizar seu resultado."
        );
    }

    // Função principal.
    function calcular(evento) {

        evento.preventDefault();

        erro.textContent = "";

        const peso = lerNumero(pesoInput.value);
        const altura = lerNumero(alturaInput.value);

        // Verifica campos vazios.
        if (
            !pesoInput.value.trim() ||
            !alturaInput.value.trim()
        ) {

            erro.textContent =
                "Preencha seu peso e sua altura para continuar.";

            (
                !pesoInput.value.trim()
                    ? pesoInput
                    : alturaInput
            ).focus();

            return;
        }

        // Validação do peso.
        if (
            !Number.isFinite(peso) ||
            peso <= 0 ||
            peso > 500
        ) {

            erro.textContent =
                "Informe um peso válido, maior que 0 e até 500 kg.";

            pesoInput.focus();

            return;
        }

        // Validação da altura.
        if (
            !Number.isFinite(altura) ||
            altura < 0.5 ||
            altura > 2.8
        ) {

            erro.textContent =
                "Informe uma altura válida entre 0,50 m e 2,80 m.";

            alturaInput.focus();

            return;
        }

        // Fórmula do IMC.
        const imc = peso / (altura * altura);

        // Obtém a classificação.
        const classificacao = obterClassificacao(imc);

        // Atualiza os resultados.
        elementos.valor.textContent =
            imc.toFixed(1).replace(".", ",");

        elementos.classificacao.textContent =
            classificacao.nome;

        elementos.peso.textContent =
            peso.toLocaleString("pt-BR", {
                maximumFractionDigits: 2
            }) + " kg";

        elementos.altura.textContent =
            altura.toLocaleString("pt-BR", {
                maximumFractionDigits: 2
            }) + " m";

        // Posiciona o marcador na escala visual.
        const posicao = Math.max(
            2,
            Math.min(98, ((imc - 10) / 40) * 100)
        );

        elementos.marcador.style.left =
            posicao + "%";

        elementos.marcador.hidden = false;

        // Exibe a mensagem correspondente.
        exibirMensagem(classificacao.mensagem);
    }

    // Evento de cálculo.
    form.addEventListener("submit", calcular);

    // Evento de limpeza.
    document.getElementById("limpar").addEventListener(
        "click",
        () => {

            form.reset();

            erro.textContent = "";

            limparResultado();

            pesoInput.focus();
        }
    );

    // Remove erros enquanto o usuário digita.
    [pesoInput, alturaInput].forEach((campo) => {

        campo.addEventListener("input", () => {
            erro.textContent = "";
        });

    });

})();
