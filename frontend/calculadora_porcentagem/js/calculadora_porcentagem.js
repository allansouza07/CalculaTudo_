(() => {
  "use strict";
  const form = document.querySelector("#percentage-form");
  const fields = document.querySelector("#fields");
  const hint = document.querySelector("#hint");
  const error = document.querySelector("#error");
  const result = document.querySelector("#result");
  const resultLabel = document.querySelector("#result-label");
  const resultNumber = document.querySelector("#result-number");
  const resultDescription = document.querySelector("#result-description");
  const formula = document.querySelector("#formula");
  const copyButton = document.querySelector("#copy-result");
  const copyStatus = document.querySelector("#copy-status");
  const clearButton = document.querySelector("#clear");
  const tabs = [...document.querySelectorAll(".tab")];
  let mode = "part";
  let textToCopy = "";

  const numberFormat = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 6 });
  const currencyFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const percentFormat = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 });

  function parseNumber(raw) {
    const value = String(raw ?? "").trim().replace(/\s/g, "");
    if (!value) return NaN;
    // Com vírgula, interpreta ponto como separador de milhar (ex.: 1.234,56).
    const normalized = value.includes(",") ? value.replace(/\./g, "").replace(",", ".") : value;
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) return NaN;
    return Number(normalized);
  }

  function read(id, label) {
    const input = document.getElementById(id);
    const value = parseNumber(input?.value);
    if (!input?.value.trim() || !Number.isFinite(value)) {
      throw new Error(`Informe um valor válido para “${label}”. Use apenas números, por exemplo 125,50.`);
    }
    return value;
  }

  function showError(message) {
    error.textContent = message;
    error.hidden = false;
    result.hidden = true;
  }

  function showResult(label, main, description, math) {
    resultLabel.textContent = label;
    resultNumber.textContent = main;
    resultDescription.textContent = description;
    formula.textContent = math;
    textToCopy = `${label}: ${main}\n${description}\nCálculo: ${math}`;
    error.hidden = true;
    result.hidden = false;
    copyStatus.textContent = "";
  }

  function renderFields() {
    fields.innerHTML = "";
    const definitions = mode === "part"
      ? [
          { id: "percent", label: "Porcentagem (%)", placeholder: "Ex.: 20", suffix: "%" },
          { id: "base", label: "Valor total", placeholder: "Ex.: 150", prefix: "#" }
        ]
      : mode === "change"
        ? [
            { id: "base", label: "Valor original", placeholder: "Ex.: 150", prefix: "R$" },
            { id: "percent", label: "Percentual (%)", placeholder: "Ex.: 20", suffix: "%" }
          ]
        : [
            { id: "base", label: "Valor inicial", placeholder: "Ex.: 100", prefix: "R$" },
            { id: "final", label: "Valor final", placeholder: "Ex.: 125", prefix: "R$" }
          ];

    for (const definition of definitions) {
      const wrapper = document.createElement("div");
      wrapper.className = "field";
      const label = document.createElement("label");
      label.htmlFor = definition.id;
      label.textContent = definition.label;
      const inputWrap = document.createElement("div");
      inputWrap.className = "input-wrap";
      if (definition.prefix) {
        const prefix = document.createElement("span");
        prefix.className = definition.prefix === "#" ? "prefix" : "currency-prefix";
        prefix.textContent = definition.prefix;
        inputWrap.append(prefix);
      }
      const input = document.createElement("input");
      input.id = definition.id;
      input.name = definition.id;
      input.type = "text";
      input.inputMode = "decimal";
      input.autocomplete = "off";
      input.placeholder = definition.placeholder;
      input.setAttribute("aria-label", definition.label);
      inputWrap.append(input);
      if (definition.suffix) {
        const suffix = document.createElement("span");
        suffix.textContent = definition.suffix;
        inputWrap.append(suffix);
      }
      wrapper.append(label, inputWrap);
      fields.append(wrapper);
    }

    if (mode === "change") {
      const direction = document.createElement("fieldset");
      direction.id = "direction-field";
      direction.className = "direction-field";
      direction.innerHTML = `
        <legend>Tipo de alteração</legend>
        <label><input type="radio" name="direction" value="increase" checked> Aumento</label>
        <label><input type="radio" name="direction" value="decrease"> Desconto</label>`;
      fields.append(direction);
    }

    hint.textContent = mode === "part"
      ? "Descubra quanto uma porcentagem representa de um número."
      : mode === "change"
        ? "Calcule o novo valor aplicando um aumento ou um desconto percentual."
        : "Compare dois valores para descobrir o aumento ou a redução em porcentagem.";
    result.hidden = true;
    error.hidden = true;
    copyStatus.textContent = "";
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      mode = tab.dataset.mode;
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
      renderFields();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      if (mode === "part") {
        const percentage = read("percent", "Porcentagem");
        const base = read("base", "Valor total");
        const value = percentage / 100 * base;
        showResult(
          "VALOR PERCENTUAL", currencyFormat.format(value),
          `${percentFormat.format(percentage)}% de ${currencyFormat.format(base)} corresponde a ${currencyFormat.format(value)}.`,
          `${numberFormat.format(base)} × ${numberFormat.format(percentage)} ÷ 100 = ${numberFormat.format(value)}`
        );
      } else if (mode === "change") {
        const base = read("base", "Valor original");
        const percentage = read("percent", "Percentual");
        const decrease = document.querySelector('input[name="direction"]:checked')?.value === "decrease";
        const difference = base * percentage / 100;
        const finalValue = base + (decrease ? -difference : difference);
        showResult(
          decrease ? "VALOR COM DESCONTO" : "VALOR COM AUMENTO", currencyFormat.format(finalValue),
          `${currencyFormat.format(base)} ${decrease ? "com desconto de" : "com aumento de"} ${percentFormat.format(percentage)}% resulta em ${currencyFormat.format(finalValue)}.`,
          `${numberFormat.format(base)} ${decrease ? "−" : "+"} (${numberFormat.format(base)} × ${numberFormat.format(percentage)} ÷ 100) = ${numberFormat.format(finalValue)}`
        );
      } else {
        const initial = read("base", "Valor inicial");
        const finalValue = read("final", "Valor final");
        if (initial === 0) throw new Error("O valor inicial precisa ser diferente de zero para calcular a variação percentual.");
        const variation = (finalValue - initial) / Math.abs(initial) * 100;
        const absolute = percentFormat.format(Math.abs(variation));
        const classification = variation > 0 ? "aumento" : variation < 0 ? "redução" : "nenhuma variação";
        showResult(
          "VARIAÇÃO PERCENTUAL", `${variation > 0 ? "+" : variation < 0 ? "−" : ""}${absolute}%`,
          variation === 0
            ? `O valor permaneceu igual: ${currencyFormat.format(initial)}.`
            : `Houve ${classification} de ${absolute}%: de ${currencyFormat.format(initial)} para ${currencyFormat.format(finalValue)}.`,
          `((${numberFormat.format(finalValue)} − ${numberFormat.format(initial)}) ÷ |${numberFormat.format(initial)}|) × 100 = ${numberFormat.format(variation)}%`
        );
      }
    } catch (exception) {
      showError(exception instanceof Error ? exception.message : "Não foi possível calcular. Confira os valores informados.");
    }
  });

  clearButton.addEventListener("click", () => {
    fields.querySelectorAll("input").forEach((input) => {
      if (input.type === "radio") return;
      input.value = "";
    });
    const increase = document.querySelector('input[name="direction"][value="increase"]');
    if (increase) increase.checked = true;
    result.hidden = true;
    error.hidden = true;
    copyStatus.textContent = "";
    fields.querySelector('input:not([type="radio"])')?.focus();
  });

  copyButton.addEventListener("click", async () => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      copyStatus.textContent = "Resultado copiado!";
    } catch {
      copyStatus.textContent = "Não foi possível copiar automaticamente neste navegador.";
    }
  });

  renderFields();
})();
