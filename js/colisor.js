function Colisor() {
    this.sprites = [];
    this.colidir = null;
    this.spritesAExcluir = [];
}

Colisor.prototype = {
    criarNovoSprite: function (sprite) {
        this.sprites.push(sprite);
        sprite.colisor = this;
    },
    processar: function () {
        var spritesVerificados = new Object();

        for (var i in this.sprites) {
            for (var j in this.sprites) {
                if (i == j) continue;

                var identificador1 = this.criarIdentificador(this.sprites[i]);
                var identificador2 = this.criarIdentificador(this.sprites[j]);

                if (!spritesVerificados[identificador1]) spritesVerificados[identificador1] = [];
                if (!spritesVerificados[identificador2]) spritesVerificados[identificador2] = [];

                if (!(spritesVerificados[identificador1].indexOf(identificador2) > 0 || spritesVerificados[identificador2].indexOf(identificador1) >= 0)) {
                    this.testarColisao(this.sprites[i], this.sprites[j]);
                    spritesVerificados[identificador1].push(identificador2);
                    spritesVerificados[identificador2].push(identificador1);
                }
            }
        }
        this.processarExclusoes();
    },
    testarColisao: function (sprite1, sprite2) {
        var retanguloSprite1 = sprite1.definirRetangulosColisao();
        var retanguloSprite2 = sprite2.definirRetangulosColisao();

        colisoes:
        for (var i in retanguloSprite1) {
            for (var j in retanguloSprite2) {
                if (this.existeColisao(retanguloSprite1[i], retanguloSprite2[j])) {
                    sprite1.colidir(sprite2);
                    sprite2.colidir(sprite1);
                    if (this.colidir) this.colidir(sprite1, sprite2);
                    break colisoes;
                }
            }
        }
    },
    existeColisao: function (retangulo1, retangulo2) {
        return (retangulo1.x + retangulo1.largura) > retangulo2.x && retangulo1.x < (retangulo2.x + retangulo2.largura) && (retangulo1.y + retangulo1.altura) > retangulo2.y && retangulo1.y < (retangulo2.y + retangulo2.altura);
    },
    criarIdentificador: function (sprite) {
        var identificador = '';
        var retangulos = sprite.definirRetangulosColisao();
        for (var i in retangulos) {
            identificador += 'x: ' + retangulos[i].x + ', ' +
                'y: ' + retangulos[i].y + ', ' +
                'l: ' + retangulos[i].largura + ', ' +
                'a: ' + retangulos[i].altura + '\n';
        }
        return identificador;
    },
    excluirSprite: function (sprite) {
        this.spritesAExcluir.push(sprite);
    },
    processarExclusoes: function () {
        var novosSprites = [];
        for (var i in this.sprites) {
            if (this.spritesAExcluir.indexOf(this.sprites[i]) == -1)
                novosSprites.push(this.sprites[i]);
        }
        this.spritesAExcluir = [];
        this.sprites = novosSprites;
    }
}