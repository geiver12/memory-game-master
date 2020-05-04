document.addEventListener('DOMContentLoaded', () => {

    const cardsAvailables = [{
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: '8-ball',
            img: 'images/8-ball.png'
        },
        {
            name: 'brujula',
            img: 'images/brujula.png'
        },
        {
            name: 'card',
            img: 'images/card.png'
        },
        {
            name: 'dominoe',
            img: 'images/dominoe.png'
        },
        {
            name: 'hand',
            img: 'images/hand.png'
        },
        {
            name: 'marihuana',
            img: 'images/marihuana.png'
        },
        {
            name: 'pig',
            img: 'images/pig.png'
        },
        {
            name: 'shoes',
            img: 'images/shoes.png'
        },
        {
            name: 'watch',
            img: 'images/watch.png'
        },
        {
            name: 'x',
            img: 'images/x.png'
        }
    ]

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    const couplesDisplay = document.querySelector('#couples')
    const timeDisplay = document.querySelector('#time')

    var cardsChosen
    var cardsWon
    var cardArray
    var countFails, countTime
    var Timer


    CleanBoard = () => {
        var cell = document.getElementById("grid");

        if (cell.hasChildNodes()) {
            console.log(cell.childNodes.length)
            while (cell.childNodes.length >= 1) {
                cell.removeChild(cell.firstChild);
            }
        }
    }

    LoadGame = (End) => {

            cardsChosen = []
            cardsWon = []
            cardArray = []
            countFails = 0
            countTime = 180

            //Eraser all node child of grid, clean board
            CleanBoard()

            //load board of game End:4,8,12,16
            cardsAvailables.forEach(element => {
                if (cardArray.length / 2 < End) {
                    cardArray.push(element)
                    cardArray.push(element)
                }
            });

            clearInterval(Timer)

            cardArray.sort(() => 0.5 - Math.random())

            Timer = setInterval(() => {
                timeDisplay.textContent = countTime--

                    if (countTime < 0) {
                        resultDisplay.textContent = 'Fail, You Lost the game'
                        clearInterval(Timer)
                        CleanBoard()
                    }
            }, 1000)

            createBoard()

        }
        //create your board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.classList.add('data-id')
            card.setAttribute('data-id', i)
            card.setAttribute("src", 'images/white.png')
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const OneId = cardsChosen[0].id
        const TwoId = cardsChosen[1].id

        if (cardsChosen[0].name === cardsChosen[1].name) {
            couplesDisplay.textContent = ' The Couples math'
            cardsWon.push(cardsChosen)
            countFails = 0

        } else {
            couplesDisplay.textContent = ++countFails + ' Fails'
            cards[OneId].setAttribute("src", 'images/white.png')
            cards[TwoId].setAttribute("src", 'images/white.png')
            cards[OneId].addEventListener('click', flipCard)
            cards[TwoId].addEventListener('click', flipCard)

        }
        cardsChosen = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You found them all!'
            clearInterval(Timer)
            CleanBoard()
        }
    }


    function flipCard() {
        var cards = document.querySelectorAll('img')
        var cardId = this.getAttribute('data-id')
        cardsChosen.push({ name: cardArray[cardId].name, id: cardId })
        cards[cardId].removeEventListener('click', flipCard)
        this.setAttribute('src',
            cardArray[cardId].img)
        if (cardsChosen.length > 1) {
            setTimeout(checkForMatch, 200)
        }
    }


})