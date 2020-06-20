function Fundo(context, imagem) {
    this.context = context;
    this.imagem = imagem;
    this.velocidade = 0;
    this.emenda = 0;
}

Fundo.prototype = {
    desenhar: function () {
        var imagem = this.imagem;
        var posicaoY = this.emenda - imagem.height;
        this.context.drawImage(imagem, 0, posicaoY, imagem.width, imagem.height);
        posicaoY = this.emenda;
        this.context.drawImage(imagem, 0, posicaoY, imagem.width, imagem.height);
    },
    atualizar: function () {
        this.emenda += this.velocidade * this.animacao.decorrido / 1000;
        if (this.emenda > this.imagem.height)
            this.emenda = 0;
    }
}