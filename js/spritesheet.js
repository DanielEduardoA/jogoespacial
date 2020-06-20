function Spritesheet(context, imagem, linhas, colunas) {
    this.context = context;
    this.imagem = imagem;
    this.numeroLinhas = linhas;
    this.numeroColunas = colunas;
    this.intervalo = 0;
    this.linha = 0;
    this.coluna = 0;
    this.finalizarCiclo = null;
}

Spritesheet.prototype = {
    desenhar: function(x, y) {
        var largura = this.imagem.width / this.numeroColunas;
        var altura = this.imagem.height / this.numeroLinhas;

        this.context.drawImage(this.imagem, largura * this.coluna, altura * this.linha, largura, altura, x, y, largura, altura);
    },
    definirProximoQuadro: function() {
        var tempoAtual = new Date().getTime();
        if (!this.ultimoTempo) this.ultimoTempo = tempoAtual;

        if (tempoAtual - this.ultimoTempo < this.intervalo)
            return;

        if (this.coluna < this.numeroColunas - 1) {
            this.coluna++;
        } else {
            this.coluna = 0;
            if (this.finalizarCiclo) this.finalizarCiclo();
        }

        this.ultimoTempo = tempoAtual;
    }
}