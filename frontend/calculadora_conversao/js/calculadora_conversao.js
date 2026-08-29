function converter() {

    let valor = Number(document.getElementById("valor").value);

    let dolar = (valor / 5.19).toFixed(2);

    document.getElementById("resultado").textContent = `US$ ${dolar}`;


}
function converter_euro() {

    let valor = Number(document.getElementById("valor").value);

    let euro = (valor / 6.02).toFixed(2);

    document.getElementById("resultado").textContent = `€ ${euro}`;


}
function converter_real_dolar() {

    let valor = Number(document.getElementById("valor").value);

    let real = (valor * 5.19).toFixed(2);

    document.getElementById("resultado").textContent = `R$ ${real}`;


}

function converter_real_euro() {

    let valor = Number(document.getElementById("valor").value);

    let real = (valor * 6.02).toFixed(2);

    document.getElementById("resultado").textContent = `R$ ${real}`;


}