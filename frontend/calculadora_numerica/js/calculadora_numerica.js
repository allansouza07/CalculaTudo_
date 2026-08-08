document.getElementById('resultado').innerHTML = " ";
function inserir(num){
    let numero = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = numero + num;
}
function limpar(){
    document.getElementById('resultado').innerHTML = " ";

}
function apagar(){
    let resultado = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length -1);
}
function calculo(){
    let final = document.getElementById('resultado').innerHTML;
    if (final){
        document.getElementById('resultado').innerHTML = eval(final);
    }
    else{
        document.getElementById('resultado').innerHTML = '...'
    }
}