
const form = document.getElementById('temperature-form');

const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');

const temperatureInput = document.getElementById('temperature-value');

const inputUnit = document.getElementById('input-unit');

const resultValue = document.getElementById('result-value');
const resultDescription = document.getElementById('result-description');

const errorMessage = document.getElementById('error-message');

const copyButton = document.getElementById('copy-result');
const swapButton = document.getElementById('swap-units');

// UNIDADES DE TEMPERATURA

const units = {
    celsius: {
        label: 'Celsius',
        symbol: '°C'
    },

    fahrenheit: {
        label: 'Fahrenheit',
        symbol: '°F'
    },

    kelvin: {
        label: 'Kelvin',
        symbol: 'K'
    }
};

let lastResult = '';


// CONVERTE QUALQUER ESCALA PARA CELSIUS

function toCelsius(value, unit) {

    if (unit === 'fahrenheit') {
        return (value - 32) * 5 / 9;
    }

    if (unit === 'kelvin') {
        return value - 273.15;
    }

    return value;
}


// CONVERTE CELSIUS PARA A ESCALA DESEJADA

function fromCelsius(value, unit) {

    if (unit === 'fahrenheit') {
        return (value * 9 / 5) + 32;
    }

    if (unit === 'kelvin') {
        return value + 273.15;
    }

    return value;
}


// FUNÇÃO PRINCIPAL DE CONVERSÃO

function convertTemperature(value, source, target) {

    const celsius = toCelsius(value, source);

    return fromCelsius(celsius, target);
}


// FORMATAÇÃO DOS RESULTADOS

function formatNumber(value) {

    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4
    }).format(value);

}


// ATUALIZA A UNIDADE AO LADO DO INPUT

function updateUnitLabels() {

    inputUnit.textContent = units[fromUnit.value].symbol;

    temperatureInput.setAttribute(
        'aria-label',
        `Valor em ${units[fromUnit.value].label}`
    );

}


// EXIBE MENSAGEM DE ERRO

function showError(message) {

    errorMessage.textContent = message;

    resultValue.innerHTML =
        `— <span>${units[toUnit.value].symbol}</span>`;

    resultDescription.textContent =
        'Verifique o valor informado.';

    copyButton.disabled = true;

    lastResult = '';

}


// EVENTO DE CONVERSÃO

form.addEventListener('submit', (event) => {

    event.preventDefault();

    errorMessage.textContent = '';

    const rawValue = temperatureInput.value.trim();

    const value = Number(rawValue);

    // VERIFICA SE O VALOR É VÁLIDO

    if (rawValue === '' || !Number.isFinite(value)) {

        showError(
            'Digite um número válido para realizar a conversão.'
        );

        return;

    }

    // VERIFICA O ZERO ABSOLUTO

    const celsiusValue = toCelsius(value, fromUnit.value);

    if (celsiusValue < -273.15 - 1e-10) {

        showError(
            'Essa temperatura está abaixo do zero absoluto (0 K).'
        );

        return;

    }

    // REALIZA A CONVERSÃO

    const converted = convertTemperature(
        value,
        fromUnit.value,
        toUnit.value
    );

    const rounded = Number(converted.toFixed(4));

    const formatted = formatNumber(rounded);

    const sourceSymbol = units[fromUnit.value].symbol;

    const targetSymbol = units[toUnit.value].symbol;

    // EXIBE O RESULTADO

    resultValue.innerHTML =
        `${formatted} <span>${targetSymbol}</span>`;

    resultDescription.textContent =
        `${formatNumber(value)} ${sourceSymbol} equivalem a ${formatted} ${targetSymbol}.`;

    lastResult = `${formatted} ${targetSymbol}`;

    copyButton.disabled = false;

});


// ATUALIZA A UNIDADE QUANDO O USUÁRIO ALTERAR A ORIGEM

fromUnit.addEventListener('change', () => {

    updateUnitLabels();

    errorMessage.textContent = '';

});


// LIMPA ERROS AO ALTERAR O DESTINO

toUnit.addEventListener('change', () => {

    errorMessage.textContent = '';

});


// INVERTE AS ESCALAS

swapButton.addEventListener('click', () => {

    const previousFrom = fromUnit.value;

    fromUnit.value = toUnit.value;

    toUnit.value = previousFrom;

    updateUnitLabels();

    errorMessage.textContent = '';

});


// COPIA O RESULTADO

copyButton.addEventListener('click', async () => {

    if (!lastResult) return;

    try {

        await navigator.clipboard.writeText(lastResult);

        copyButton.textContent = 'Copiado!';

        window.setTimeout(() => {

            copyButton.textContent = 'Copiar resultado';

        }, 1600);

    } catch {

        copyButton.textContent = 'Não foi possível copiar';

    }

});


// INICIALIZA A UNIDADE DO INPUT

updateUnitLabels();
