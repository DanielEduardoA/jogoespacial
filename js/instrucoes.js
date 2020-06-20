function mostrarInstrucoes() {
    pausarJogo();

    var pontuacoes = recuperarPontuacoes();

    var canvas = document.getElementById('canvas_animacao');
    var context = canvas.getContext('2d');

    var imagemEspaco = criarImagem("img/fundo-espaco.png");
    desenharImagem(imagemEspaco);

    context.fillStyle = 'white';
    context.font = '11px sans-serif';
    context.fillText('Use as teclas [home, end, pageUp, pageEnd] para mover o foquete.', 10, 50);
    context.fillText('Use a tecla espaço para atirar.', 10, 70);
    context.fillText('Para iniciar o jogo clique em Iniciar.', 10, 90);
    context.fillText('Para pausar o jogo clique em Pausar.', 10, 110);
    context.fillText('Para retornar ao jogo clique em Continuar.', 10, 130);
    context.fillText('Para reiniciar o jogo clique em Reiniciar. Será apresentado uma mensagem de confirmação.', 10, 150);
    context.fillText('Para verificar as maiores/menores pontuações do jogo clique em Pontuações.', 10, 170);

    context.fillText('NAVES', 10, 200);
    context.fillText('São objetos que caem do céu e retiram 1 vida do foguete.', 10, 220);
    context.fillText('Ao atirar e acertar uma nave o foguete ganha 10 pontos.', 10, 240);

    context.fillText('METEOROS', 10, 270);
    context.fillText('São corpos celestes que caem do céu e retiram 1 vida do foguete. ', 10, 290);
    context.fillText('Ao atirar e acertar uma nave o foguete ganha 20 pontos.', 10, 310);


    context.fillText('O foguete tem 4 vidas. A cada colisão será retirada 1 vida do foguete.', 10, 340);
    context.fillText('Quando as vidas forem zeradas o jogo será finalizado.', 10, 360);
    context.fillText('No final do jogo caso a pontuação seja superior a maior pontuação, será exibido "Você ganhou."', 10, 380);
    context.fillText('No final do jogo caso a pontuação seja inferior a maior pontuação, será exibido "Você perdeu."', 10, 400);
    context.fillText('A pontuação só será salva qunado o jogo for finalizado ou reiniciado.', 10, 420);

}