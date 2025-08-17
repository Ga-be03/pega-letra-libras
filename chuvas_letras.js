// Letras do alfabeto
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    let pontos = 0;
    let tempoRestante = 60;
    let intervaloTempo;
    let intervaloLetras;
    const tempoDiv = document.getElementById('tempo');
    let erros = 0; // Adicione contador de erros

    // Lista de imagens _2 para cursor
    const imagensCursor = [
        "LetraA_2.png","LetraB_2.png","LetraC_2.png","LetraD_2.png","LetraE_2.png","LetraF_2.png",
        "LetraG_2.png","LetraH_2.png","LetraI_2.png","LetraJ_2.png","LetraK_2.png","LetraL_2.png",
        "LetraM_2.png","LetraN_2.png","LetraO_2.png","LetraP_2.png","LetraQ_2.png","LetraR_2.png",
        "LetraS_2.png","LetraT_2.png","LetraU_2.png","LetraV_2.png","LetraW_2.png","LetraX_2.png",
        "LetraY_2.png","LetraZ_2.png"
    ];

    // Função para pegar imagem aleatória do cursor
    function imagemCursorAleatoria() {
        const idx = Math.floor(Math.random() * imagensCursor.length);
        return "Img/" + imagensCursor[idx];
    }

    // Inicializa cursor de mão com imagem aleatória
    const mouseCursor = document.getElementById('mouse-cursor');
    document.body.style.cursor = "none";
    function setCursorAleatorio() {
        mouseCursor.src = imagemCursorAleatoria();
    }
    // Aumente o tamanho do cursor da mão:
    mouseCursor.style.width = "100px";
    mouseCursor.style.height = "100px";
    mouseCursor.style.display = "block";
    document.addEventListener('mousemove', e => {
        mouseCursor.style.left = e.clientX + 'px';
        mouseCursor.style.top = e.clientY + 'px';
    });

    // Função para criar uma letra caindo
    function criarLetra() {
        const letra = letras[Math.floor(Math.random() * letras.length)];
        const img = document.createElement('img');
        img.src = `Img/Letra${letra}.png`;
        img.alt = `Letra ${letra} em LIBRAS`;
        img.className = 'letra';
        img.style.left = Math.random() * (window.innerWidth - 80) + 'px';
        img.style.top = '-90px';
        img.dataset.letra = letra;
        document.getElementById('jogo-area').appendChild(img);

        // Animação de queda lenta
        let pos = -90;
        const velocidade = 0.05 + Math.random() * 0.07; // mais lento
        const queda = setInterval(() => {
            pos += velocidade;
            img.style.top = pos + 'px';
            if (pos > window.innerHeight) {
            img.remove();
            clearInterval(queda);
            }
        }, 16);

        // Clique: só ganha ponto se cursor igual à letra
        img.onclick = function() {
            // Extrai a letra do cursor atual
            const cursorAtual = mouseCursor.src.split('/').pop().toUpperCase();
            const letraCursor = cursorAtual.match(/^LETRA([A-Z])_2\.PNG$/i);
            if (letraCursor && letraCursor[1] === letra) {
                img.src = `Img/Letra${letra}_2.png`;
                img.style.boxShadow = "0 0 0 4px #2ecc40";
                img.style.transform = "scale(1.1) rotate(7deg)";
                pontos++;
                document.getElementById('pontos').textContent = `Pontos: ${pontos}`;
                setTimeout(() => {
                    img.remove();
                    clearInterval(queda);
                }, 250);
                setCursorAleatorio();
            } else {
                erros++; // Conta erro
                img.style.boxShadow = "0 0 0 4px red";
                img.style.transform = "scale(1.1) rotate(-7deg)";
                setTimeout(() => {
                    img.style.boxShadow = "";
                    img.style.transform = "";
                }, 300);
            }
        };
    }

    // Função para criar várias letras caindo, incluindo a correta e outras parecidas
    function criarLetrasComDesafio() {
        // Escolhe a letra do cursor atual
        const cursorAtual = mouseCursor.src.split('/').pop().toUpperCase();
        const letraCursor = cursorAtual.match(/^LETRA([A-Z])_2\.PNG$/i);
        let letraCorreta = "A";
        if (letraCursor) letraCorreta = letraCursor[1];

        // Gera um conjunto de letras: a correta + 2 parecidas (próximas no alfabeto)
        const idx = letras.indexOf(letraCorreta);
        let opcoes = [letraCorreta];
        if (idx > 0) opcoes.push(letras[idx - 1]);
        if (idx < letras.length - 1) opcoes.push(letras[idx + 1]);

        // Embaralha as opções
        opcoes = opcoes.sort(() => Math.random() - 0.5);

        // Cria cada letra caindo
        opcoes.forEach(letra => {
            const img = document.createElement('img');
            img.src = `Img/Letra${letra}.png`;
            img.alt = `Letra ${letra} em LIBRAS`;
            img.className = 'letra';
            img.style.width = "110px";
            img.style.height = "110px";
            img.style.left = Math.random() * (window.innerWidth - 100) + 'px';
            img.style.top = '-120px';
            img.dataset.letra = letra;
            document.getElementById('jogo-area').appendChild(img);

            // Animação de queda mais lenta
            let pos = -120;
            const velocidade = 0.08 + Math.random() * 0.12; // mais lento
            const queda = setInterval(() => {
                pos += velocidade;
                img.style.top = pos + 'px';
                if (pos > window.innerHeight) {
                    img.remove();
                    clearInterval(queda);
                }
            }, 16);

            // Impede arrastar a imagem
            img.onmousedown = function(e) {
                e.preventDefault(); // Impede arrastar a imagem
            };
            img.ondragstart = function() {
                return false; // Impede arrastar a imagem
            };

            // Clique: só ganha ponto se cursor igual à letra
            img.onclick = function() {
                const cursorAtual = mouseCursor.src.split('/').pop().toUpperCase();
                const letraCursor = cursorAtual.match(/^LETRA([A-Z])_2\.PNG$/i);
                if (letraCursor && letraCursor[1] === letra) {
                    img.src = `Img/Letra${letra}_2.png`;
                    img.style.boxShadow = "0 0 0 4px #2ecc40"; // verde
                    img.style.transform = "scale(1.1) rotate(7deg)";
                    pontos++;
                    document.getElementById('pontos').textContent = `Pontos: ${pontos}`;
                    setTimeout(() => {
                        img.remove();
                        clearInterval(queda);
                    }, 250);
                    setCursorAleatorio(); // Troca cursor ao acertar
                } else {
                    erros++; // Conta erro ao clicar errado
                    img.style.boxShadow = "0 0 0 4px red";
                    img.style.transform = "scale(1.1) rotate(-7deg)";
                    setTimeout(() => {
                        img.style.boxShadow = "";
                        img.style.transform = "";
                    }, 300);
                }
            };
        });
    }

    // Atualiza o cronômetro
    function atualizarTempo() {
        tempoDiv.textContent = `Tempo: ${tempoRestante}s`;
        tempoRestante--;
        if (tempoRestante < 0) {
            clearInterval(intervaloTempo); // Pausa cronômetro
            clearInterval(intervaloLetras); // Pausa letras caindo!
            document.querySelectorAll('.letra').forEach(img => img.remove());
            // Cria elemento de resultado centralizado
            const resultado = document.createElement('div');
            resultado.style.position = 'fixed';
            resultado.style.top = '50%';
            resultado.style.left = '50%';
            resultado.style.transform = 'translate(-50%, -50%)';
            resultado.style.background = '#104691ff';
            resultado.style.padding = '40px 60px';
            resultado.style.borderRadius = '20px';
            resultado.style.boxShadow = '0 0 30px #3338';
            resultado.style.fontSize = '2rem';
            resultado.style.textAlign = 'center';
            resultado.innerHTML = `
                <strong>Fim de jogo!</strong><br>
                Acertos: <span style="color:green">${pontos}</span><br>
                Erros: <span style="color:red">${erros}</span>
            `;
            document.body.appendChild(resultado);
            tempoDiv.textContent = "Tempo esgotado!";
        }
    }

    // Inicia o jogo com tempo
    function iniciarJogo() {
        tempoRestante = 60;
        pontos = 0;
        erros = 0;
        document.getElementById('pontos').textContent = `Pontos: 0`;
        atualizarTempo();
        intervaloTempo = setInterval(atualizarTempo, 1000);
        intervaloLetras = setInterval(criarLetrasComDesafio, 900); // Guarde o retorno!
        // Remove resultado anterior se existir
        const resultado = document.querySelector('body > div[style*="fixed"]');
        if (resultado) resultado.remove();
    }

    // Inicia automaticamente ao carregar
    window.onload = iniciarJogo;

    // Cria letras caindo a cada intervalo
    setInterval(criarLetrasComDesafio, 900);

    // Responsivo: ajusta área do jogo ao redimensionar
    window.addEventListener('resize', () => {
        document.getElementById('jogo-area').style.width = window.innerWidth + 'px';
        document.getElementById('jogo-area').style.height = window.innerHeight + 'px';
    });
    document.getElementById('jogo-area').style.width = window.innerWidth + 'px';
    document.getElementById('jogo-area').style.height = window.innerHeight + 'px';