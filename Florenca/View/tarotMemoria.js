const cards = document.querySelectorAll('.posicaoCarta');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let alturaCarta, larguraCarta;
let cartasSelecionadas = 0;


let razaoCartaTarot = 0;
let posicoes = 0;
let tamanhoMesaLargura = 0;
let tamanhoMesaAltura = 0;
let numeroCartasQueCabem = 0;
let sobrePosicao = 0;

let posicoesSelecao = 0;
let tamanhoSelectLargura = 0;
let tamanhoSelectAltura = 0;
let alturaCartaSelecionada, larguraCartaSelecionada;


function resetaJogo()
{
  calculaVariaveis();
  posicionarSelects();
  posicionarCartas();
  
}

function calculaVariaveis()
{
  razaoCartaTarot = 0.65;
  posicoes = $('.mesa .posicaoCarta');
  
  tamanhoMesaLargura = $('.mesa').width();
  tamanhoMesaAltura = $('.mesa').height();
  alturaCarta = tamanhoMesaAltura;
  larguraCarta = tamanhoMesaAltura * razaoCartaTarot;
  numeroCartasQueCabem = tamanhoMesaLargura/larguraCarta;
  sobrePosicao = 1 - (numeroCartasQueCabem/posicoes.length);

  posicoesSelecao = $('.posicaoCartaSelect');
  tamanhoSelectLargura = $('.selecionados').width();
  tamanhoSelectAltura = $('.selecionados').height();
  alturaCartaSelecionada = tamanhoSelectAltura;
  larguraCartaSelecionada = tamanhoSelectLargura/posicoesSelecao.length;
  
}

function posicionarCartas()
{
  var anterior = 0;
  $.each(posicoes,  
      function(i)
      {
        var leftPos = (anterior+larguraCarta - (larguraCarta*sobrePosicao));
        $(this).css({"left": leftPos.toString() + "px", "width": larguraCarta.toString() + "px", "height":alturaCarta.toString() + "px" });

        anterior = $(this).position().left; 

      }

  );
}

function posicionarSelects()
{
  $.each(posicoesSelecao,  
      function(i)
      {
        $(this).css({"width": larguraCartaSelecionada.toString() + "px", "height":alturaCartaSelecionada.toString() + "px" });
      }

  );
}

function selectCard() {
  

  if(cartasSelecionadas > posicoesSelecao.length)
    return;

  cartasSelecionadas = cartasSelecionadas + 1;

  var posicaoDaSelecao = $("#select" + cartasSelecionadas);

  posicaoDaSelecao.html( $(this).html());
  // posicaoDaSelecao.css({"width": larguraCarta.toString() + "px", "height":alturaCarta.toString() + "px" });

}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', selectCard));
