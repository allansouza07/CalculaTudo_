
const campoCPF = document.getElementById("cpf");
const botaoValidar = document.getElementById("btnValidar");
const resultado = document.getElementById("resultado");

const botaoGerar = document.getElementById("btnGerar");
const cpfGerado = document.getElementById("cpfGerado");
const botaoCopiar = document.getElementById("btnCopiar");
const mensagemCopia = document.getElementById("mensagemCopia");

// Mantém somente os dígitos.
function somenteNumeros(valor) {
    return valor.replace(/\D/g, "");
}

// Aplica a máscara 000.000.000-00.
function formatarCPF(cpf) {
    const numeros = somenteNumeros(cpf).slice(0, 11);

    return numeros
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

// Calcula um dígito verificador.
function calcularDigito(base, pesoInicial) {
    let soma = 0;

    for (let i = 0; i < base.length; i++) {
        soma += Number(base[i]) * (pesoInicial - i);
    }

    const resto = (soma * 10) % 11;

    return resto === 10 ? 0 : resto;
}

// Valida o CPF pelo algoritmo oficial dos dígitos verificadores.
function validarCPF(valor) {
    const cpf = somenteNumeros(valor);

    if (cpf.length !== 11) {
        return false;
    }

    // Rejeita sequências como 00000000000 e 11111111111.
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    const base = cpf.slice(0, 9);

    const primeiroDigito = calcularDigito(base, 10);
    const baseComPrimeiro = base + primeiroDigito;
    const segundoDigito = calcularDigito(baseComPrimeiro, 11);

    const cpfCalculado = base + primeiroDigito + segundoDigito;

    return cpf === cpfCalculado;
}

// Gera dígitos aleatórios usando o gerador criptográfico do navegador.
function numeroAleatorio(maximo) {
    if (window.crypto && window.crypto.getRandomValues) {
        const limite = Math.floor(4294967296 / maximo) * maximo;
        const array = new Uint32Array(1);
        let numero;

        do {
            window.crypto.getRandomValues(array);
            numero = array[0];
        } while (numero >= limite);

        return numero % maximo;
    }

    return Math.floor(Math.random() * maximo);
}

// Gera um CPF matematicamente válido.
function gerarCPF() {
    let base = "";

    for (let i = 0; i < 9; i++) {
        base += numeroAleatorio(10);
    }

    const primeiroDigito = calcularDigito(base, 10);
    const segundoDigito = calcularDigito(
        base + primeiroDigito,
        11
    );

    return base + primeiroDigito + segundoDigito;
}

// Mostra o resultado da validação.
function mostrarResultado(mensagem, tipo) {
    resultado.textContent = mensagem;
    resultado.className = `resultado visivel ${tipo}`;
}

// Máscara automática enquanto a pessoa digita.
campoCPF.addEventListener("input", function () {
    campoCPF.value = formatarCPF(campoCPF.value);
    resultado.className = "resultado";
});

// Botão para validar.
botaoValidar.addEventListener("click", function () {
    const cpf = somenteNumeros(campoCPF.value);

    if (cpf.length !== 11) {
        mostrarResultado(
            "Digite um CPF com 11 dígitos.",
            "erro"
        );
        return;
    }

    if (validarCPF(cpf)) {
        mostrarResultado(
            "CPF válido!",
            "sucesso"
        );
    } else {
        mostrarResultado(
            "CPF inválido. Confira os números digitados.",
            "erro"
        );
    }
});

// Permite pressionar Enter no campo.
campoCPF.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoValidar.click();
    }
});

// Gera um novo CPF.
botaoGerar.addEventListener("click", function () {
    const novoCPF = gerarCPF();

    cpfGerado.textContent = formatarCPF(novoCPF);
    mensagemCopia.textContent = "";
});

// Copia o CPF gerado.
botaoCopiar.addEventListener("click", async function () {
    const texto = cpfGerado.textContent;

    try {
        await navigator.clipboard.writeText(texto);
        mensagemCopia.textContent = "CPF copiado!";
    } catch (erro) {
        // Alternativa para ambientes em que a API Clipboard não funciona.
        const auxiliar = document.createElement("textarea");
        auxiliar.value = texto;
        auxiliar.style.position = "fixed";
        auxiliar.style.opacity = "0";

        document.body.appendChild(auxiliar);
        auxiliar.select();

        const copiou = document.execCommand("copy");
        auxiliar.remove();

        mensagemCopia.textContent = copiou
            ? "CPF copiado!"
            : "Não foi possível copiar. Selecione o número e copie manualmente.";
    }
});
