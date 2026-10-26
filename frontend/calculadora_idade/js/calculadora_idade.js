
(() => {
    "use strict";

    const form = document.getElementById("form-idade");
    const nascimentoInput = document.getElementById("nascimento");
    const erro = document.getElementById("erro");

    // Obtém a data local de hoje, sem considerar o horário.
    function obterHoje() {
        const agora = new Date();

        return new Date(
            agora.getFullYear(),
            agora.getMonth(),
            agora.getDate()
        );
    }

    function formatarISO(data) {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }

    // Limita o calendário à data atual.
    nascimentoInput.max = formatarISO(obterHoje());

    // Converte a data do input sem erros de fuso horário.
    function lerDataISO(valor) {
        const partes = valor.split("-").map(Number);

        if (partes.length !== 3 || partes.some(Number.isNaN)) {
            return null;
        }

        const [ano, mes, dia] = partes;
        const data = new Date(ano, mes - 1, dia);

        // Confere se a data realmente existe.
        if (
            data.getFullYear() !== ano ||
            data.getMonth() !== mes - 1 ||
            data.getDate() !== dia
        ) {
            return null;
        }

        data.setHours(0, 0, 0, 0);
        return data;
    }

    function diasNoMes(ano, mes) {
        return new Date(ano, mes + 1, 0).getDate();
    }

    // Trata datas como 29 de fevereiro em anos não bissextos.
    function adicionarAnos(data, quantidade) {
        const anoDestino = data.getFullYear() + quantidade;
        const mes = data.getMonth();

        const dia = Math.min(
            data.getDate(),
            diasNoMes(anoDestino, mes)
        );

        return new Date(anoDestino, mes, dia);
    }

    function adicionarMeses(data, quantidade) {
        const totalMeses =
            data.getFullYear() * 12 +
            data.getMonth() +
            quantidade;

        const anoDestino = Math.floor(totalMeses / 12);
        const mesDestino = ((totalMeses % 12) + 12) % 12;

        const dia = Math.min(
            data.getDate(),
            diasNoMes(anoDestino, mesDestino)
        );

        return new Date(anoDestino, mesDestino, dia);
    }

    function formatarData(data) {
        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }).format(data);
    }

    function limparResultado() {
        document.getElementById("anos").textContent = "—";
        document.getElementById("meses").textContent = "—";
        document.getElementById("dias").textContent = "—";

        document.getElementById("data-formatada").textContent =
            "Aguardando data de nascimento";

        document.getElementById("aniversario").innerHTML =
            '<span aria-hidden="true">🎉</span>' +
            '<p>Seu próximo aniversário aparecerá aqui depois do cálculo.</p>';
    }

    // Retorna a idade em anos, meses completos e dias restantes.
    function calcularIdade(nascimento, hoje) {
        let anos =
            hoje.getFullYear() - nascimento.getFullYear();

        let aniversario = adicionarAnos(nascimento, anos);

        if (aniversario > hoje) {
            anos--;
            aniversario = adicionarAnos(nascimento, anos);
        }

        let meses = 0;

        // Avança mês a mês a partir do último aniversário.
        while (meses < 11) {
            const proximoMes = adicionarMeses(
                aniversario,
                meses + 1
            );

            if (proximoMes <= hoje) {
                meses++;
            } else {
                break;
            }
        }

        const inicioDoMesAtual = adicionarMeses(
            aniversario,
            meses
        );

        // Calcula os dias restantes usando datas normalizadas.
        const diferencaEmDias = Math.round(
            (hoje.getTime() - inicioDoMesAtual.getTime()) /
            86400000
        );

        return {
            anos,
            meses,
            dias: diferencaEmDias
        };
    }

    function obterProximoAniversario(nascimento, hoje) {
        const anoAtual = hoje.getFullYear();

        let proximo = new Date(
            anoAtual,
            nascimento.getMonth(),
            Math.min(
                nascimento.getDate(),
                diasNoMes(anoAtual, nascimento.getMonth())
            )
        );

        if (proximo < hoje) {
            const anoSeguinte = anoAtual + 1;

            proximo = new Date(
                anoSeguinte,
                nascimento.getMonth(),
                Math.min(
                    nascimento.getDate(),
                    diasNoMes(anoSeguinte, nascimento.getMonth())
                )
            );
        }

        return proximo;
    }

    function calcular() {
        erro.textContent = "";

        if (!nascimentoInput.value) {
            limparResultado();
            erro.textContent =
                "Selecione sua data de nascimento.";

            nascimentoInput.focus();
            return;
        }

        const nascimento = lerDataISO(nascimentoInput.value);
        const hoje = obterHoje();

        if (!nascimento) {
            limparResultado();
            erro.textContent =
                "Informe uma data de nascimento válida.";
            return;
        }

        if (nascimento > hoje) {
            limparResultado();
            erro.textContent =
                "A data de nascimento não pode estar no futuro.";
            return;
        }

        const idade = calcularIdade(nascimento, hoje);

        document.getElementById("anos").textContent =
            idade.anos;

        document.getElementById("meses").textContent =
            idade.meses;

        document.getElementById("dias").textContent =
            idade.dias;

        document.getElementById("data-formatada").textContent =
            formatarData(nascimento);

        const proximo = obterProximoAniversario(
            nascimento,
            hoje
        );

        const falta = Math.round(
            (proximo.getTime() - hoje.getTime()) / 86400000
        );

        let mensagem;

        if (falta === 0) {
            mensagem = "Feliz aniversário! Hoje é o seu dia! 🎂";
        } else if (falta === 1) {
            mensagem = "Falta 1 dia para o seu próximo aniversário.";
        } else {
            mensagem =
                `Faltam ${falta} dias para o seu próximo aniversário.`;
        }

        // O conteúdo inserido é uma mensagem fixa gerada pelo programa.
        const aniversario = document.getElementById("aniversario");
        aniversario.replaceChildren();

        const icone = document.createElement("span");
        icone.setAttribute("aria-hidden", "true");
        icone.textContent = "🎉";

        const texto = document.createElement("p");
        texto.textContent = mensagem;

        aniversario.append(icone, texto);
    }

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();
        calcular();
    });

    nascimentoInput.addEventListener("change", function () {
        if (nascimentoInput.value) {
            calcular();
        }
    });

    document.getElementById("limpar").addEventListener(
        "click",
        function () {
            nascimentoInput.value = "";
            erro.textContent = "";
            limparResultado();
            nascimentoInput.focus();
        }
    );
})();
