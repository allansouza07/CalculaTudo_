
(() => {
    "use strict";
    const API_BASE = "https://api.frankfurter.dev/v2";
    const REFRESH_INTERVAL = 15 * 60 * 1000;
    const CACHE_KEY = "calculatudo_cotacoes_v1";

    const valueInput = document.getElementById("valor");
    const resultOutput = document.getElementById("resultado");
    const rateDisplay = document.getElementById("taxa-destaque");
    const pairDisplay = document.getElementById("par-moedas");
    const dateDisplay = document.getElementById("data-cotacao");
    const statusDisplay = document.getElementById("status-api");
    const messageDisplay = document.getElementById("mensagem");
    const updateButton = document.getElementById("atualizar");
    const form = document.getElementById("form-conversao");
    if (!valueInput || !resultOutput || !form) return;

    const base = document.body.dataset.defaultBase;
    const quote = document.body.dataset.defaultQuote;
    let currentRate = null;
    let requestInProgress = false;

    function formatCurrency(currency, value) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2
        }).format(value);
    }
    function formatDate(dateString) {
        const [year, month, day] = dateString.split("-").map(Number);
        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit", month: "long", year: "numeric", timeZone: "UTC"
        }).format(new Date(Date.UTC(year, month - 1, day)));
    }
    function setStatus(type, text) {
        statusDisplay.className = `status ${type}`;
        const dot = document.createElement("span");
        dot.className = "ponto";
        statusDisplay.replaceChildren(dot, document.createTextNode(text));
    }
    function convert() {
        const raw = valueInput.value.trim();
        if (raw === "") { resultOutput.textContent = formatCurrency(quote, 0); return; }
        const amount = Number(raw);
        if (!Number.isFinite(amount) || amount < 0) {
            resultOutput.textContent = "Valor inválido";
            messageDisplay.textContent = "Digite um valor válido e maior ou igual a zero.";
            messageDisplay.className = "mensagem erro";
            return;
        }
        if (currentRate === null) { resultOutput.textContent = "Cotação indisponível"; return; }
        const converted = amount * currentRate;
        resultOutput.textContent = formatCurrency(quote, converted);
        messageDisplay.textContent = `${formatCurrency(base, amount)} = ${formatCurrency(quote, converted)}`;
        messageDisplay.className = "mensagem";
    }
    function readCache() {
        try {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
            if (!cached || cached.base !== base || cached.quote !== quote ||
                !Number.isFinite(Number(cached.rate)) || Number(cached.rate) <= 0 ||
                typeof cached.date !== "string") return null;
            return cached;
        } catch { return null; }
    }
    async function loadRate(silent = false) {
        if (requestInProgress) return;
        requestInProgress = true;
        updateButton.disabled = true;
        if (!silent) {
            setStatus("carregando", "Atualizando cotação");
            messageDisplay.textContent = "Consultando a fonte de cotações...";
            messageDisplay.className = "mensagem";
        }
        try {
            const response = await fetch(`${API_BASE}/rate/${base}/${quote}`, {
                headers: { Accept: "application/json" }, cache: "no-store"
            });
            if (!response.ok) throw new Error(`A API respondeu com status ${response.status}.`);
            const data = await response.json();
            const rate = Number(data.rate);
            if (!Number.isFinite(rate) || rate <= 0 ||
                typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
                throw new Error("A API retornou uma cotação inválida.");
            }
            currentRate = rate;
            rateDisplay.textContent = formatCurrency(quote, rate);
            pairDisplay.textContent = `1 ${base} equivale a`;
            dateDisplay.textContent = formatDate(data.date);
            setStatus("sucesso", "Cotação carregada");
            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify({ base, quote, rate, date: data.date }));
            } catch (error) { console.warn("Falha ao salvar cache local:", error); }
            convert();
            if (!valueInput.value) {
                messageDisplay.textContent = "Cotação atualizada. Informe um valor para converter.";
                messageDisplay.className = "mensagem";
            }
        } catch (error) {
            console.error("Erro ao consultar a cotação:", error);
            if (currentRate === null) {
                const cached = readCache();
                if (cached) {
                    currentRate = Number(cached.rate);
                    rateDisplay.textContent = formatCurrency(quote, currentRate);
                    pairDisplay.textContent = `1 ${base} equivale a`;
                    dateDisplay.textContent = `${formatDate(cached.date)} (salva neste navegador)`;
                    setStatus("aviso", "Usando cotação salva");
                    convert();
                    messageDisplay.textContent = "Sem conexão com a API. Exibindo a última cotação salva neste navegador.";
                    messageDisplay.className = "mensagem aviso-texto";
                } else {
                    setStatus("erro", "Falha na cotação");
                    rateDisplay.textContent = "--";
                    dateDisplay.textContent = "Indisponível";
                    resultOutput.textContent = "Tente novamente";
                    messageDisplay.textContent = "Não foi possível carregar a cotação. Verifique sua conexão e tente novamente.";
                    messageDisplay.className = "mensagem erro";
                }
            } else {
                setStatus("aviso", "Cotação anterior mantida");
                messageDisplay.textContent = "A atualização falhou. A última cotação carregada continua sendo utilizada.";
                messageDisplay.className = "mensagem aviso-texto";
            }
        } finally {
            requestInProgress = false;
            updateButton.disabled = false;
        }
    }
    form.addEventListener("submit", event => { event.preventDefault(); convert(); });
    valueInput.addEventListener("input", convert);
    updateButton.addEventListener("click", () => loadRate(false));
    loadRate(false);
    window.setInterval(() => loadRate(true), REFRESH_INTERVAL);
})();
