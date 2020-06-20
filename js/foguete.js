function Foguete(context, teclado, imagem, imagemExplosao) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.spritesheet = new Spritesheet(context, imagem, 4, 2);
    this.spritesheet.linha = 0;
    this.spritesheet.intervalo = 100;
    this.acabarVidas = null;
    this.vidasExtras = 4;
    this.imagemExplosao = imagemExplosao;
}

Foguete.prototype = {
    desenhar: function () {
        if (this.teclado.pressionar(SETA_ESQUERDA))
            this.spritesheet.linha = 1;
        else if (this.teclado.pressionar(SETA_DIREITA))
            this.spritesheet.linha = 2;
        else
            this.spritesheet.linha = 0;

        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.definirProximoQuadro();
    },
    atualizar: function () {
        var incremento = this.velocidade * this.animacao.decorrido / 1000;
        if (this.teclado.pressionar(SETA_ESQUERDA) && this.x > 0)
            this.x -= incremento;

        if (this.teclado.pressionar(SETA_DIREITA) && this.x < this.context.canvas.width - 36)
            this.x += incremento;

        if (this.teclado.pressionar(SETA_CIMA) && this.y > 0)
            this.y -= incremento;

        if (this.teclado.pressionar(SETA_BAIXO) && this.y < this.context.canvas.height - 48)
            this.y += incremento;

    },
    atirar: function () {
        var tiro = new Tiro(this.context, this);
        this.animacao.criarNovoSprite(tiro);
        this.colisor.criarNovoSprite(tiro);
    },
    definirRetangulosColisao: function () {
        var retangulos = [
            { x: this.x + 2, y: this.y + 19, largura: 9, altura: 13 },
            { x: this.x + 13, y: this.y + 3, largura: 10, altura: 33 },
            { x: this.x + 25, y: this.y + 19, largura: 9, altura: 13 },
        ];
        return retangulos;
    },
    colidir: function (sprite) {
        if (sprite instanceof Inimigo) {
            this.animacao.excluirSprite(this);
            this.animacao.excluirSprite(sprite);

            this.colisor.excluirSprite(this);
            this.colisor.excluirSprite(sprite);

            var explosao1 = new Explosao(this.context, this.imagemExplosao, this.x, this.y);
            var explosao2 = new Explosao(this.context, this.imagemExplosao, sprite.x, sprite.y);

            this.animacao.criarNovoSprite(explosao1);
            this.animacao.criarNovoSprite(explosao2);

            var Foguete = this;
            explosao1.finalizarExplosao = function () {
                Foguete.vidasExtras--;
                if (Foguete.vidasExtras < 1) {
                    Foguete.acabarVidas();
                }
                Foguete.colisor.criarNovoSprite(Foguete);
                Foguete.animacao.criarNovoSprite(Foguete);
                Foguete.posicionar();
            }
        }
    },
    posicionar: function () {
        var canvas = this.context.canvas;
        this.x = canvas.width / 2 - 18;
        this.y = canvas.height - 48;
    }
}