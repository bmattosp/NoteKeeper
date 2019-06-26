const cards = document.querySelectorAll('.posicaoCarta');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let alturaCarta, larguraCarta;

let razaoCartaTarot = 0;
let posicoes = 0;
let tamanhoMesaLargura = 0;
let tamanhoMesaAltura = 0;
let numeroCartasQueCabem = 0;
let sobrePosicao = 0;



function resetaJogo()
{
  calculaVariaveis();
  posicionarCartas();
}

function calculaVariaveis()
{
  razaoCartaTarot = 0.65;
  posicoes = $('.posicaoCarta');
  tamanhoMesaLargura = $('.mesa').width();
  tamanhoMesaAltura = $('.mesa').height();
  alturaCarta = tamanhoMesaAltura;
  larguraCarta = tamanhoMesaAltura * razaoCartaTarot;
  numeroCartasQueCabem = tamanhoMesaLargura/larguraCarta;
  sobrePosicao = 1 - (numeroCartasQueCabem/posicoes.length);
}

function posicionarCartas()
{
  var anterior = 0;
  $.each(posicoes,  
      function(i)
      {
        // if((anterior + larguraCarta + ( larguraCarta - (sobrePosicao * larguraCarta)) > tamanhoMesaLargura))
        // {
        //   $(this).css({"display": "none"});
        //   return;
        // }

        var leftPos = (anterior+larguraCarta - (larguraCarta*sobrePosicao));
        $(this).css({"left": leftPos.toString() + "px", "width": larguraCarta.toString() + "px", "height":alturaCarta.toString() + "px" });

        anterior = $(this).position().left; 

      }

  );
}

function selectCard() {
  
   $("#select1").html( $(this).html());
   $("#select1").css({"width": larguraCarta.toString() + "px", "height":alturaCarta.toString() + "px" });

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

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', selectCard));
