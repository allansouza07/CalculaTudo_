
(() => {
    "use strict";

    const form = document.getElementById("form-juros");
    const capitalInput = document.getElementById("capital");
    const taxaInput = document.getElementById("taxa");
    const periodicidadeInput = document.getElementById("periodicidade");
    const tempoInput = document.getElementById("tempo");
    const unidadeInput = document.getElementById("unidade");
    const erro = document.getElementById("erro");

    const moeda = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const percentual = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    function dinheiro(valor) {
        return moeda.format(valor);
    }

    // Converte a duração para a unidade da taxa de juros.
    function obterPeriodos() {
        const tempo = Number(tempoInput.value);

        const diasPorUnidade = {
            dias: 1,
            meses: 30,
            anos: 365
        };

        const diasPorTaxa = {
            diaria: 1,
            mensal: 30,
            anual: 365
        };

        const duracaoEmDias =
            tempo * diasPorUnidade[unidadeInput.value];

        return duracaoEmDias / diasPorTaxa[periodicidadeInput.value];
    }

    function textoPeriodo() {
        const tempo = Number(tempoInput.value);
        const unidade = unidadeInput.value;

        if (unidade === "anos") {
            return tempo === 1 ? "1 ano" : `${tempo} anos`;
        }

        if (unidade === "meses") {
            return tempo === 1 ? "1 mês" : `${tempo} meses`;
        }

        return tempo === 1 ? "1 dia" : `${tempo} dias`;
    }

    // Validação dos valores digitados.
    function validar() {
        const capital = Number(capitalInput.value);
        const taxa = Number(taxaInput.value);
        const tempo = Number(tempoInput.value);

        if (
            capitalInput.value.trim() === "" ||
            !Number.isFinite(capital) ||
            capital <= 0
        ) {
            return "Informe um capital inicial maior que zero.";
        }

        if (
            taxaInput.value.trim() === "" ||
            !Number.isFinite(taxa) ||
            taxa < 0
        ) {
            return "Informe uma taxa igual ou maior que zero.";
        }

        if (
            tempoInput.value.trim() === "" ||
            !Number.isFinite(tempo) ||
            tempo <= 0
        ) {
            return "Informe um período maior que zero.";
        }

        if (tempo > 100000) {
            return "Informe um período de até 100.000 unidades.";
        }

        return "";
    }

    // Algoritmo principal dos juros compostos.
    function calcular() {
        const mensagem = validar();

        erro.textContent = mensagem;

        if (mensagem) {
            return;
        }

        const capital = Number(capitalInput.value);
        const taxaPercentual = Number(taxaInput.value);

        // Converte a taxa percentual para decimal.
        const taxa = taxaPercentual / 100;

        // Calcula a quantidade de períodos de capitalização.
        const periodos = obterPeriodos();

        /*
            Fórmula:
            M = C * (1 + i)^t

            M = montante final
            C = capital inicial
            i = taxa de juros em decimal
            t = número de períodos
        */

        const montante =
            capital * Math.pow(1 + taxa, periodos);

        if (!Number.isFinite(montante)) {
            erro.textContent =
                "Resultado muito alto. Reduza a taxa ou o período.";
            return;
        }

        // Juros obtidos durante todo o período.
        const juros = montante - capital;

        // Rentabilidade acumulada em porcentagem.
        const rentabilidade =
            ((montante / capital) - 1) * 100;

        // Atualiza os resultados na página.
        document.getElementById("montante").textContent =
            dinheiro(montante);

        document.getElementById("capital-resumo").textContent =
            dinheiro(capital);

        document.getElementById("juros").textContent =
            dinheiro(juros);

        document.getElementById("rentabilidade").textContent =
            percentual.format(rentabilidade) + "%";

        document.getElementById("periodo-resumo").textContent =
            "Em " + textoPeriodo();

        desenharGrafico(capital, taxa, periodos, montante);
    }

    // Desenha o gráfico usando o Canvas do HTML.
    function desenharGrafico(capital, taxa, periodos, montante) {
        const canvas = document.getElementById("grafico");
        const fallback = document.getElementById("grafico-fallback");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            fallback.style.display = "block";
            fallback.textContent =
                `Capital inicial: ${dinheiro(capital)}. ` +
                `Montante final: ${dinheiro(montante)}.`;
            return;
        }

        fallback.style.display = "none";

        const retangulo = canvas.getBoundingClientRect();
        const largura = Math.max(280, retangulo.width);
        const altura = Math.max(170, retangulo.height);
        const escala = window.devicePixelRatio || 1;

        canvas.width = Math.round(largura * escala);
        canvas.height = Math.round(altura * escala);

        ctx.setTransform(escala, 0, 0, escala, 0, 0);
        ctx.clearRect(0, 0, largura, altura);

        const margem = {
            superior: 12,
            direita: 12,
            inferior: 31,
            esquerda: 12
        };

        const areaLargura =
            largura - margem.esquerda - margem.direita;

        const areaAltura =
            altura - margem.superior - margem.inferior;

        const maximo = Math.max(montante, capital, 1) * 1.12;

        const quantidade = Math.min(
            60,
            Math.max(1, Math.ceil(periodos))
        );

        const pontos = [];

        // Calcula os pontos da curva de crescimento.
        for (let i = 0; i <= quantidade; i++) {
            const progresso = i / quantidade;
            const tempoAtual = periodos * progresso;

            const valor =
                capital * Math.pow(1 + taxa, tempoAtual);

            pontos.push({
                x: margem.esquerda + progresso * areaLargura,
                y: margem.superior + areaAltura -
                    (valor / maximo) * areaAltura
            });
        }

        // Linhas de referência.
        ctx.strokeStyle = "#e9edf5";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 5]);

        for (let i = 0; i < 4; i++) {
            const y =
                margem.superior + (areaAltura * i) / 3;

            ctx.beginPath();
            ctx.moveTo(margem.esquerda, y);
            ctx.lineTo(largura - margem.direita, y);
            ctx.stroke();
        }

        ctx.setLineDash([]);

        // Área preenchida abaixo da curva.
        const gradiente = ctx.createLinearGradient(
            0,
            margem.superior,
            0,
            altura - margem.inferior
        );

        gradiente.addColorStop(
            0,
            "rgba(37, 99, 235, 0.23)"
        );

        gradiente.addColorStop(
            1,
            "rgba(37, 99, 235, 0.015)"
        );

        ctx.beginPath();
        ctx.moveTo(
            pontos[0].x,
            margem.superior + areaAltura
        );

        pontos.forEach(ponto => {
            ctx.lineTo(ponto.x, ponto.y);
        });

        ctx.lineTo(
            pontos[pontos.length - 1].x,
            margem.superior + areaAltura
        );

        ctx.closePath();
        ctx.fillStyle = gradiente;
        ctx.fill();

        // Linha azul representando o crescimento.
        ctx.beginPath();

        pontos.forEach((ponto, indice) => {
            if (indice === 0) {
                ctx.moveTo(ponto.x, ponto.y);
            } else {
                ctx.lineTo(ponto.x, ponto.y);
            }
        });

        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();

        // Marcadores do início e do fim.
        [pontos[0], pontos[pontos.length - 1]].forEach(
            (ponto, indice) => {
                ctx.beginPath();

                ctx.arc(
                    ponto.x,
                    ponto.y,
                    4.5,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    indice === 0 ? "#f97316" : "#2563eb";

                ctx.fill();

                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        );

        // Legendas.
        ctx.font = "11px Arial, sans-serif";
        ctx.fillStyle = "#657086";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";

        ctx.fillText(
            "Início",
            margem.esquerda,
            altura - 21
        );

        ctx.textAlign = "right";

        ctx.fillText(
            textoPeriodo(),
            largura - margem.direita,
            altura - 21
        );
    }

    // Calcula ao enviar o formulário.
    form.addEventListener("submit", function (evento) {
        evento.preventDefault();
        form.dataset.calculado = "true";
        calcular();
    });

    // Restaura os valores iniciais.
    document.getElementById("limpar").addEventListener(
        "click",
        function () {
            capitalInput.value = "1000";
            taxaInput.value = "1";
            periodicidadeInput.value = "mensal";
            tempoInput.value = "12";
            unidadeInput.value = "meses";

            erro.textContent = "";
            form.dataset.calculado = "true";

            calcular();
        }
    );

    // Atualiza os resultados quando os campos mudarem,
    // depois da primeira simulação.
    [
        capitalInput,
        taxaInput,
        periodicidadeInput,
        tempoInput,
        unidadeInput
    ].forEach(function (campo) {
        campo.addEventListener("input", function () {
            if (form.dataset.calculado === "true") {
                calcular();
            }
        });

        campo.addEventListener("change", function () {
            if (form.dataset.calculado === "true") {
                calcular();
            }
        });
    });

    // Redesenha o gráfico quando a tela muda de tamanho.
    window.addEventListener("resize", function () {
        if (form.dataset.calculado === "true") {
            calcular();
        }
    });

    // Exibe a simulação inicial ao abrir a página.
    calcular();
})();
