function Animacao(context) {
    this.context = context;
    this.ligado = false;
    this.ultimoCiclo = 0;
    this.decorrido = 0;
    this.sprites = [];
    this.spritesAExcluir = [];
    this.processamentos = [];
    this.processamentosAExcluir = [];
}

Animacao.prototype = {
    ligar: function() {
        this.ultimoCiclo = 0;
        this.ligado = true;
        this.irProximoFrame();
    },
    desligar: function() {
        this.ligado = false;
    },
    criarNovoSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.animacao = this;
    },
    excluirSprite: function(sprite) {
        this.spritesAExcluir.push(sprite);
    },
    irProximoFrame: function() {
        if (!this.ligado) return;

        var tempoAtual = new Date().getTime();
        if (this.ultimoCiclo == 0) this.ultimoCiclo = tempoAtual;

        this.decorrido = tempoAtual - this.ultimoCiclo;
        for (var i in this.sprites)
            this.sprites[i].atualizar();

        for (var i in this.sprites)
            this.sprites[i].desenhar();

        for (var i in this.processamentos)
            this.processamentos[i].processar();

        this.processarExclusoes();

        this.ultimoCiclo = tempoAtual;

        var animacao = this;
        requestAnimationFrame(function() {
            animacao.irProximoFrame();
        });
    },
    criarNovoProcessamento: function(processamento) {
        this.processamentos.push(processamento);
        processamento.animacao = this;
    },
    excluirProcessamento: function(processamento) {
        this.processamentosAExcluir.push(processamento);
    },
    processarExclusoes: function() {
        var novosSprites = [];
        var novosProcessamentos = [];

        for (var i in this.sprites) {
            if (this.spritesAExcluir.indexOf(this.sprites[i]) == -1)
                novosSprites.push(this.sprites[i]);
        }

        for (var i in this.processamentos) {
            if (this.processamentosAExcluir.indexOf(this.processamentos[i]) == -1)
                novosProcessamentos.push(this.processamentos[i]);
        }

        this.spritesAExcluir = [];
        this.processamentosAExcluir = [];

        this.sprites = novosSprites;
        this.processamentos = novosProcessamentos;
    }
}