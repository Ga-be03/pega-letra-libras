// Letras do alfabeto
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
let pontos = 0;
let tempoRestante = 60;
let intervaloTempo;
let intervaloLetras;
const tempoDiv = document.getElementById('tempo');
let erros = 0;

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
// Aumenta o tamanho do cursor no mobile
if (isMobile()) {
    mouseCursor.style.width = "150px";
    mouseCursor.style.height = "150px";
} else {
    mouseCursor.style.width = "100px";
    mouseCursor.style.height = "100px";
}
mouseCursor.style.display = "block";

// Cursor segue mouse ou dedo (apenas um listener)
function atualizaCursor(e) {
    let x, y;
    if (e.touches && e.touches.length) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    mouseCursor.style.left = x + 'px';
    mouseCursor.style.top = y + 'px';
}
document.addEventListener('mousemove', atualizaCursor);
document.addEventListener('touchmove', atualizaCursor);

// Função para associar clique e toque
function associaInteracao(img, queda, letra) {
    function acao() {
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
            erros++;
            img.style.boxShadow = "0 0 0 4px red";
            img.style.transform = "scale(1.1) rotate(-7deg)";
            setTimeout(() => {
                img.style.boxShadow = "";
                img.style.transform = "";
            }, 300);
            setCursorAleatorio();
        }
    }
    img.onclick = acao;
    img.ontouchstart = function(e) {
        e.preventDefault();
        acao();
    };
}

// Detecta se é mobile
function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);
}

// Função utilitária para definir tamanho da letra
function definirTamanhoLetra(img) {
    if (isMobile()) {
        img.style.width = "150px";
        img.style.height = "150px";
    } else {
        img.style.width = "110px";
        img.style.height = "110px";
    }
}

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
    definirTamanhoLetra(img);
    document.getElementById('jogo-area').appendChild(img);

    let pos = -50;
    const velocidade = isMobile() ? 0.015 + Math.random() * 0.025 : 0.05 + Math.random() * 0.07;
    const queda = setInterval(() => {
        pos += velocidade;
        img.style.top = pos + 'px';
        if (pos > window.innerHeight) {
            img.remove();
            clearInterval(queda);
        }
    }, 16);

    associaInteracao(img, queda, letra);
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

    // Embaralha as opções (Fisher-Yates)
    for (let i = opcoes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcoes[i], opcoes[j]] = [opcoes[j], opcoes[i]];
    }

    // Cria cada letra caindo
    opcoes.forEach(letra => {
        const img = document.createElement('img');
        img.src = `Img/Letra${letra}.png`;
        img.alt = `Letra ${letra} em LIBRAS`;
        img.className = 'letra';
        definirTamanhoLetra(img);
        img.style.left = Math.random() * (window.innerWidth - 100) + 'px';
        img.style.top = '-120px';
        img.dataset.letra = letra;
        document.getElementById('jogo-area').appendChild(img);

        let pos = -120;
        const velocidade = isMobile() ? 0.015 + Math.random() * 0.025 : 0.08 + Math.random() * 0.12;
        const queda = setInterval(() => {
            pos += velocidade;
            img.style.top = pos + 'px';
            if (pos > window.innerHeight) {
                img.remove();
                clearInterval(queda);
            }
        }, 16);

        img.onmousedown = function(e) { e.preventDefault(); };
        img.ondragstart = function() { return false; };

        associaInteracao(img, queda, letra);
    });
}

// Atualiza o cronômetro
function atualizarTempo() {
    tempoDiv.textContent = `Tempo: ${tempoRestante}s`;
    tempoRestante--;
    if (tempoRestante < 0) {
        clearInterval(intervaloTempo);
        clearInterval(intervaloLetras);
        document.querySelectorAll('.letra').forEach(img => img.remove());
        // Painel visualmente melhorado
        const resultado = document.createElement('div');
        resultado.id = "painel-resultado";
        resultado.style.position = 'fixed';
        resultado.style.top = '50%';
        resultado.style.left = '50%';
        resultado.style.transform = 'translate(-50%, -50%)';
        resultado.style.background = 'linear-gradient(135deg, #1976d2 60%, #0a192f 100%)';
        resultado.style.padding = '3.5rem 2.5rem 2.5rem 2.5rem';
        resultado.style.borderRadius = '2.2rem';
        resultado.style.boxShadow = '0 8px 40px #0a192faa, 0 2px 16px #1976d288';
        resultado.style.fontSize = '2.2rem';
        resultado.style.textAlign = 'center';
        resultado.style.color = '#fff';
        resultado.style.zIndex = '9999';
        resultado.style.border = '4px solid #fff3';
        resultado.style.backdropFilter = 'blur(2px)';
        resultado.innerHTML = `
            <div style="font-size:2.6rem;font-weight:700;letter-spacing:1px;margin-bottom:1.2rem;">⏰ Fim de jogo!</div>
            <div style="font-size:2rem;margin-bottom:0.7rem;">
                <span style="color:#38d39f;font-weight:700;">Acertos:</span>
                <span style="color:#fff;font-size:2.3rem;font-weight:800;">${pontos}</span>
            </div>
            <div style="font-size:2rem;">
                <span style="color:#ff5252;font-weight:700;">Erros:</span>
                <span style="color:#fff;font-size:2.3rem;font-weight:800;">${erros}</span>
            </div>
            <button onclick="window.location.reload()" style="margin-top:2.2rem;padding:1rem 2.5rem;font-size:1.3rem;border-radius:1rem;background:#38a169;color:#fff;border:none;box-shadow:0 2px 12px #38a16955;cursor:pointer;font-weight:700;transition:background 0.2s;">Jogar Novamente</button>
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
    intervaloLetras = setInterval(criarLetrasComDesafio, 900);
    // Remove resultado anterior se existir
    const resultado = document.getElementById('painel-resultado');
    if (resultado) resultado.remove();
}

// Inicia automaticamente ao carregar
window.onload = iniciarJogo;

// Responsivo: ajusta área do jogo ao redimensionar
function ajustaAreaJogo() {
    const area = document.getElementById('jogo-area');
    area.style.width = window.innerWidth + 'px';
    area.style.height = window.innerHeight + 'px';
}

// Garante responsividade ao carregar
ajustaAreaJogo();