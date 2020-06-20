const estiloFonte = "30px sans-serif";
const corFonte = "white";

function mostrarPontuacoes() {
    pausarJogo();

    var pontuacoes = recuperarPontuacoes();

    var canvas = document.getElementById('canvas_animacao');
    var context = canvas.getContext('2d');

    var imagemEspaco = criarImagem("img/fundo-espaco.png");
    desenharImagem(imagemEspaco);

    if (pontuacoes.length == 0 || pontuacoes == null) {
        mostrarMensagemNaoExistePontuacao(context);
    } else {
        mostrarMaiorPontuacao(context, pontuacoes);
        mostrarMenorPontuacao(context, pontuacoes);
        mostrarMaioresPontuacoes(context, pontuacoes);
    }
}

function recuperarPontuacoes() {
    return localStorage.getItem('pontuacoes') ? JSON.parse(localStorage.getItem('pontuacoes')) : [];
}

function mostrarMensagemNaoExistePontuacao(context) {
    context.fillStyle = corFonte;
    context.font = estiloFonte;
    context.fillText('Não existe pontuações salvas.', 40, 200);
}

function mostrarMaioresPontuacoes(context, pontuacoes) {
    var maioresPontuacoes = recuperarMaioresPontuacoes(pontuacoes);

    context.fillStyle = corFonte;
    context.font = estiloFonte;
    context.fillText('Maiores pontuações:', 40, 200);

    var coordenadaY = 250;
    var colocacao = 1;

    for (var i in maioresPontuacoes) {
        context.fillText(colocacao + '°:       ' + maioresPontuacoes[i], 40, coordenadaY);
        coordenadaY += 50;
        colocacao += 1;
    }
}

function recuperarMaioresPontuacoes(pontuacoes) {
    pontuacoes.sort(function(pontuacao1, pontuacao2) { return pontuacao2 - pontuacao1 });
    return pontuacoes.slice(0, 5);
}

function recuperarMaiorPontuacao(pontuacoes) {
    return pontuacoes.reduce(function(pontuacao1, pontuacao2) {
        return Math.max(pontuacao1, pontuacao2);
    });
}

function recuperarMenorPontuacao(pontuacoes) {
    return pontuacoes.reduce(function(pontuacao1, pontuacao2) {
        return Math.min(pontuacao1, pontuacao2);
    });
}

function mostrarMaiorPontuacao(context, pontuacoes) {
    var maiorPontuacao = recuperarMaiorPontuacao(pontuacoes);

    context.fillStyle = corFonte;
    context.font = estiloFonte;
    context.fillText('Maior Pontuação:       ' + maiorPontuacao, 40, 50);
}

function mostrarMenorPontuacao(context, pontuacoes) {
    var menorPontuacao = recuperarMenorPontuacao(pontuacoes);

    context.fillStyle = corFonte;
    context.font = estiloFonte;
    context.fillText('Menor Pontuação:       ' + menorPontuacao, 40, 100);
}

function salvarPontuacao(pontuacao) {
    var pontuacoes = recuperarPontuacoes();
    pontuacoes.push(pontuacao);
    localStorage.setItem('pontuacoes', JSON.stringify(pontuacoes));
}