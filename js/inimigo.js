function Inimigo(context, imagem, imagemExplosao) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.imagemExplosao = imagemExplosao;
    this.type = "";
}

Inimigo.prototype = {
    desenhar: function () {
        var contexto = this.context;
        var imagem = this.imagem;
        contexto.drawImage(imagem, this.x, this.y, imagem.width, imagem.height);
    },
    definirRetangulosColisao: function () {
        var retangulos = [
            { x: this.x + 20, y: this.y + 1, largura: 25, altura: 10 },
            { x: this.x + 2, y: this.y + 11, largura: 60, altura: 12 },
            { x: this.x + 20, y: this.y + 23, largura: 25, altura: 7 },
        ];
        return retangulos;
    },
    colidir: function (sprite) {
        if (sprite instanceof Tiro) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.animacao.excluirSprite(sprite);
            this.colisor.excluirSprite(sprite);

            var explosao = new Explosao(this.context, this.imagemExplosao, this.x, this.y);
            this.animacao.criarNovoSprite(explosao);
        }
    },
    atualizar: function () {
        this.y += this.velocidade * this.animacao.decorrido / 1000;
        if (this.y > this.context.canvas.height) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    }
}