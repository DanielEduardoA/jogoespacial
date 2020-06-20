    const pontuacaoTiroNave = 10;
    const pontuacaoTiroMeteoro = 20;
    const tipoInimigoNave = "nave";
    const tipoInimigoMeteoro = "meteoro";
    const velocidadeEspaco = 100;
    const velocidadeEstrelas = 200;
    const velocidadeNuvens = 600;
    const velocidadeFoguete = 150;
    const tempoEntreCriacaoNaves = 3000;
    const tempoEntreCriacaoMeteoros = 2000;
    const numeroDeVidas = 4;
    const pontuacaoInicial = 0;
    const diretorioImagens = "img/";
    const liDomElement = "li";
    const aDomElement = "a";
    const classButton = "button";

    var canvas = document.getElementById('canvas_animacao');
    var botoes = document.getElementById("botoes");
    var context = canvas.getContext('2d');

    var animacao, teclado, colisor, foguete, inimigos;
    var totalImagens = 0,
        carregadas = 0;
    var imagens = {
        capaJogo: "capaJogo.png",
        espaco: "fundo-espaco.png",
        estrelas: "fundo-estrelas.png",
        nuvens: "fundo-nuvens.png",
        foguete: "foguete-spritesheet.png",
        nave: "nave.png",
        meteoro: "meteoro.png",
        explosao: "explosao.png"
    };

    carregarImagens();

    function carregarImagens() {
        for (var i in imagens) {
            var imagem = criarImagem(diretorioImagens + imagens[i]);
            imagem.onload = carregarImagem;
            totalImagens++;
            imagens[i] = imagem;
        }
    }

    function carregarImagem() {
        salvarContexto();

        desenharImagem(imagens.espaco);
        desenharImagem(imagens.capaJogo);

        carregadas++;

        restaurarContexto();

        if (carregadas == totalImagens) {
            iniciarObjetos();
        }
    }

    function criarImagem(caminhoImagem) {
        var imagem = new Image();
        imagem.src = caminhoImagem;
        return imagem;
    }

    function restaurarContexto() {
        context.restore();
    }

    function salvarContexto() {
        context.save();
    }

    function desenharImagem(imagem) {
        context.drawImage(imagem, 0, 0, canvas.width, canvas.height);
    }

    function iniciarObjetos() {
        animacao = new Animacao(context);
        teclado = new Teclado(document);
        colisor = new Colisor();
        espaco = new Fundo(context, imagens.espaco);
        estrelas = new Fundo(context, imagens.estrelas);
        nuvens = new Fundo(context, imagens.nuvens);
        foguete = new Foguete(context, teclado, imagens.foguete, imagens.explosao);
        painel = new Painel(context, foguete);

        animacao.criarNovoSprite(espaco);
        animacao.criarNovoSprite(estrelas);
        animacao.criarNovoSprite(nuvens);
        animacao.criarNovoSprite(painel);
        animacao.criarNovoSprite(foguete);

        colisor.criarNovoSprite(foguete);
        animacao.criarNovoProcessamento(colisor);

        criarConfiguracoesIniciais();
    }

    function criarConfiguracoesIniciais() {
        espaco.velocidade = velocidadeEspaco;
        estrelas.velocidade = velocidadeEstrelas;
        nuvens.velocidade = velocidadeNuvens;
        foguete.velocidade = velocidadeFoguete;

        criarNaves();
        criarMeteoros();

        foguete.acabarVidas = function() {
            desligarAnimacao();
            finalizarJogo();
        }

        colisor.colidir = function(sprite1, sprite2) {
            if (sprite1 instanceof Tiro && sprite2 instanceof Inimigo) {
                if (sprite2.type == tipoInimigoNave) {
                    painel.pontuacao += pontuacaoTiroNave;
                } else {
                    painel.pontuacao += pontuacaoTiroMeteoro;
                }
            } else if (sprite1 instanceof Inimigo && sprite2 instanceof Tiro) {
                if (sprite1.type == tipoInimigoNave) {
                    painel.pontuacao += pontuacaoTiroNave;
                } else {
                    painel.pontuacao += pontuacaoTiroMeteoro;
                }
            }
        }
    }

    function retornarTempoEmMiliSegundos() {
        return new Date().getTime();
    }

    function criarNaves() {
        inimigos = {
            ultimaNave: retornarTempoEmMiliSegundos(),

            processar: function() {
                var tempoAtual = retornarTempoEmMiliSegundos();
                var tempoDecorrido = tempoAtual - this.ultimaNave;
                if (tempoDecorrido > tempoEntreCriacaoNaves) {
                    criarNovaNave();
                    this.ultimaNave = tempoAtual;
                }
            }
        };
        animacao.criarNovoProcessamento(inimigos);
    }

    function criarMeteoros() {
        inimigos = {
            ultimoMeteoro: retornarTempoEmMiliSegundos(),

            processar: function() {
                var tempoAtual = retornarTempoEmMiliSegundos();
                var tempoDecorrido = tempoAtual - this.ultimoMeteoro;
                if (tempoDecorrido > tempoEntreCriacaoMeteoros) {
                    criarNovoMeteoro();
                    this.ultimoMeteoro = tempoAtual;
                }
            }
        };
        animacao.criarNovoProcessamento(inimigos);
    }

    function criarNovaNave() {
        var imagemNave = imagens.nave;
        var inimigo = new Inimigo(context, imagemNave, imagens.explosao);

        inimigo.velocidade = Math.floor(500 + Math.random() * (1000 - 500 + 1));
        inimigo.x = Math.floor(Math.random() * (canvas.width - imagemNave.width + 1));
        inimigo.y = -imagemNave.height;
        inimigo.type = tipoInimigoNave;

        animacao.criarNovoSprite(inimigo);
        colisor.criarNovoSprite(inimigo);
    }

    function criarNovoMeteoro() {
        var imagemMeteoro = imagens.meteoro;
        var inimigo = new Inimigo(context, imagemMeteoro, imagens.explosao);

        inimigo.velocidade = Math.floor(300 + Math.random() * (1000 - 300 + 1));
        inimigo.x = Math.floor(Math.random() * (canvas.width - imagemMeteoro.width + 1));
        inimigo.y = -imagemMeteoro.height;
        inimigo.type = tipoInimigoMeteoro;

        animacao.criarNovoSprite(inimigo);
        colisor.criarNovoSprite(inimigo);
    }

    function pausarJogo() {
        if (animacao.ligado) {
            desligarAnimacao();
            desativarTiro();
            salvarContexto();
            removerBotaoPausar();
            criarBotaoContinuar();
        }
    }

    function continuarJogo() {
        inimigos.ultimaNave = retornarTempoEmMiliSegundos();
        inimigos.ultimoMeteoro = retornarTempoEmMiliSegundos();
        inimigos.ultimoSol = retornarTempoEmMiliSegundos();

        ligarAnimacao();
        ativarTiro();

        removerBotaoContinuar();
        criarBotaoPausar();
    }

    function desativarTiro() {
        teclado.disparar(ESPACO, null);
    }

    function ativarTiro() {
        teclado.disparar(ESPACO, function() {
            foguete.atirar();
        });
    }

    function ligarAnimacao() {
        animacao.ligar();
    }

    function desligarAnimacao() {
        animacao.desligar();
    }

    function posicionarFoguete() {
        foguete.posicionar();
    }

    function iniciarJogo() {
        inimigos.ultimaNave = retornarTempoEmMiliSegundos();
        inimigos.ultimoMeteoro = retornarTempoEmMiliSegundos();

        ativarTiro();
        ligarAnimacao();
        posicionarFoguete();

        removerBotaoIniciar();
        criarBotaoPausar();
        criarBotaoReiniciar();
    }

    function removerBotaoIniciar() {
        var botaoIniciar = document.getElementById("iniciar");
        botoes.removeChild(botaoIniciar);
    }

    function removerBotaoPausar() {
        var botaoPausar = document.getElementById("pausar");
        botoes.removeChild(botaoPausar);
    }

    function removerBotaoContinuar() {
        var botaoContinuar = document.getElementById("continuar");
        botoes.removeChild(botaoContinuar);
    }

    function removerBotaoReiniciar() {
        var botaoReiniciar = document.getElementById("reiniciar");
        botoes.removeChild(botaoReiniciar);
    }

    function criarBotaoIniciar() {
        var botaoPausar = document.createElement(liDomElement);
        botaoPausar.classList.add(classButton);
        botaoPausar.id = "iniciar";

        var linkBotaoIniciar = document.createElement(aDomElement);
        linkBotaoIniciar.href = "javascript: iniciarJogo()";

        var textNode = document.createTextNode("Iniciar");
        linkBotaoIniciar.appendChild(textNode);
        botaoPausar.appendChild(linkBotaoIniciar);

        botoes.insertBefore(botaoPausar, botoes.firstChild);
    }

    function criarBotaoPausar() {
        var botaoPausar = document.createElement(liDomElement);
        botaoPausar.classList.add(classButton);
        botaoPausar.id = "pausar";

        var linkBotaoPausar = document.createElement(aDomElement);
        linkBotaoPausar.href = "javascript: pausarJogo()";

        var textNode = document.createTextNode("Pausar");
        linkBotaoPausar.appendChild(textNode);
        botaoPausar.appendChild(linkBotaoPausar);

        botoes.insertBefore(botaoPausar, botoes.firstChild);
    }

    function criarBotaoContinuar() {
        var botaoPausar = document.createElement(liDomElement);
        botaoPausar.classList.add(classButton);
        botaoPausar.id = "continuar";

        var linkBotaoContinuar = document.createElement(aDomElement);
        linkBotaoContinuar.href = "javascript: continuarJogo()";

        var textNode = document.createTextNode("Continuar");
        linkBotaoContinuar.appendChild(textNode);
        botaoPausar.appendChild(linkBotaoContinuar);

        botoes.insertBefore(botaoPausar, botoes.firstChild);
    }

    function criarBotaoReiniciar() {
        var botaoReiniciar = document.createElement(liDomElement);
        botaoReiniciar.classList.add(classButton);
        botaoReiniciar.id = "reiniciar";

        var linkBotaoReiniciar = document.createElement(aDomElement);
        linkBotaoReiniciar.href = "javascript: mostrarConfirmacaoReinicarJogo()";

        var textNode = document.createTextNode("Reiniciar");
        linkBotaoReiniciar.appendChild(textNode);
        botaoReiniciar.appendChild(linkBotaoReiniciar);

        var botaoPausar = document.getElementById("pausar");

        botoes.insertBefore(botaoReiniciar, botaoPausar.nextSibling);
    }

    function finalizarJogo() {
        desativarTiro();

        desligarAnimacao();

        desenharImagem(imagens.espaco);

        var pontuacaoFinal = painel.pontuacao;

        foguete.vidasExtras = numeroDeVidas;
        painel.pontuacao = pontuacaoInicial;

        removerBotaoPausar();
        removerBotaoReiniciar();

        mostrarMensagemFimJogo(pontuacaoFinal);
        salvarPontuacao(pontuacaoFinal);

        criarBotaoIniciar();
    }

    function mostrarMensagemFimJogo(pontuacaoFinal) {
        context.fillStyle = 'white';
        context.font = '30px sans-serif';
        var pontuacoes = recuperarPontuacoes();

        if (pontuacoes.length == 0 || pontuacoes == null) {
            context.fillText('Você perdeu.', 40, 200);
            context.fillText('Sua pontuação: ' + painel.pontuacao, 40, 250);
        } else {
            var maiorPontuacao = recuperarMaiorPontuacao(pontuacoes);
            if (pontuacaoFinal > maiorPontuacao) {
                context.fillText('Você ganhou.', 40, 200);
            } else {
                context.fillText('Você perdeu.', 40, 200);
            }
            context.fillText('Sua pontuação: ' + pontuacaoFinal, 40, 250);
            context.fillText('Maior pontuação anterior: ' + maiorPontuacao, 40, 300);
        }

        restaurarContexto();
    }

    function mostrarConfirmacaoReinicarJogo() {
        var resposta = confirm("Você deseja realmente reiniciar o jogo?");
        if (resposta) {
            reiniciarJogo();
        }
    }

    function reiniciarJogo() {
        desligarAnimacao();
        desativarTiro();

        desenharImagem(imagens.espaco);
        desenharImagem(imagens.capaJogo);

        removerBotaoPausar();
        removerBotaoReiniciar();
        criarBotaoIniciar();

        var pontuacaoFinal = painel.pontuacao;
        salvarPontuacao(pontuacaoFinal);

        foguete.vidasExtras = numeroDeVidas;
        painel.pontuacao = pontuacaoInicial;

    }