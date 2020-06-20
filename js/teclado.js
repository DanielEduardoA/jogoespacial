// Códigos de teclas
var SETA_ESQUERDA = 37;
var SETA_CIMA = 38;
var SETA_DIREITA = 39;
var SETA_BAIXO = 40;
var ESPACO = 32;

function Teclado(elemento) {
    this.elemento = elemento;
    this.pressionadas = [];
    this.disparadas = [];
    this.funcoesDisparo = [];

    var teclado = this;

    elemento.addEventListener('keydown', function(evento) {
        var tecla = evento.keyCode;
        teclado.pressionadas[tecla] = true;

        if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
            teclado.disparadas[tecla] = true;
            teclado.funcoesDisparo[tecla]();
        }
    });

    elemento.addEventListener('keyup', function(evento) {
        teclado.pressionadas[evento.keyCode] = false;
        teclado.disparadas[evento.keyCode] = false;
    });
}
Teclado.prototype = {
    pressionar: function(tecla) {
        return this.pressionadas[tecla];
    },
    disparar: function(tecla, callback) {
        this.funcoesDisparo[tecla] = callback;
    }
}