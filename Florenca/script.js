const cards = document.querySelectorAll('.posicaoCarta');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function posicionarCartas()
{
  var razaoCartaTarot = 0.65;
  var posicoes = $('.posicaoCarta');
  var tamanhoMesaLargura = $('.mesa').width();
  var tamanhoMesaAltura = $('.mesa').height();
  var alturaCarta = tamanhoMesaAltura;
  var larguraCarta = tamanhoMesaAltura * razaoCartaTarot;
  var numeroCartasQueCabem = tamanhoMesaLargura/larguraCarta;
  var sobrePosicao = 1 - (numeroCartasQueCabem/posicoes.length);
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
  
   $(".selecionados").html( $(this).html());

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
