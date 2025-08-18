# Jogo: Pegue as Letras em LIBRAS

Este projeto é um jogo educativo para aprender o alfabeto em LIBRAS (Língua Brasileira de Sinais) de forma divertida.

## Como funciona

- O cursor do mouse (ou dedo) é uma mão representando uma letra em LIBRAS.
- Letras caem do topo da tela e você deve clicar ou tocar na letra que corresponde ao cursor.
- Cada acerto soma pontos e troca o cursor para outra letra.
- O jogo dura 1 minuto. O tempo e a pontuação aparecem na tela.
- Ao acabar o tempo, todas as letras somem e aparece "Tempo esgotado!" junto com sua pontuação.

## Suporte a Desktop e Mobile

- **Desktop:** Use o mouse para clicar nas letras.
- **Mobile:** Toque nas letras diretamente na tela. O cursor segue o dedo para facilitar a associação.
- As letras caem mais devagar no mobile para facilitar o toque.

## Estrutura dos arquivos

- **index.html**: Estrutura do jogo.
- **chuvas_letras.css**: Estilos visuais e animações.
- **chuvas_letras.js**: Lógica do jogo, tempo, pontuação e interação.
- **Img/**: Pasta com imagens das letras em LIBRAS (LetraA.png, LetraA_2.png, ...).

## Como jogar

1. Abra o arquivo `index.html` em um navegador (computador ou celular).
2. O jogo inicia automaticamente.
3. Clique ou toque nas letras que correspondem ao cursor para ganhar pontos.

## Requisitos

- Navegador moderno.
- Pasta `Img` com as imagens das letras em LIBRAS.

## Personalização

- Para mudar o tempo do jogo, altere a variável `tempoRestante` no início do arquivo `chuvas_letras.js`.
- Para adicionar ou trocar imagens, atualize a pasta `Img`.

## Objetivo

Promover o aprendizado do alfabeto em LIBRAS de forma divertida e interativa, utilizando recursos visuais e sonoros para uma melhor fixação do conteúdo. O jogo estimula a memorização das letras em LIBRAS através da repetição e da associação visual, tornando o aprendizado mais eficaz.