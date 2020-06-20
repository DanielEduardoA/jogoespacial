function Tiro(context, nave) {
    this.context = context;
    this.nave = nave;
    this.largura = 3;
    this.altura = 10;
    this.x = nave.x + 18;
    this.y = nave.y - this.altura;
    this.velocidade = 400;
    this.cor = "red";
}

Tiro.prototype = {
    desenhar: function() {
        this.context.save();
        this.context.fillStyle = this.cor;
        this.context.fillRect(this.x, this.y, this.largura, this.altura);
        this.context.restore();
    },
    atualizar: function() {
        this.y -= this.velocidade * animacao.decorrido / 1000;
        if (this.y < -this.altura) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    definirRetangulosColisao: function() {
        return [{ x: this.x, y: this.y, largura: this.largura, altura: this.altura }]
    },
    colidir: function(sprite) {}
}