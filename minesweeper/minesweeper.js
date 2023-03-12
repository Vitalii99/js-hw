window.addEventListener('DOMContentLoaded', () => {
    // create board
    let column = 10
    let row = 10
    let sizeSquare = 30
    let width = `${column * sizeSquare}px`
    let height = `${row * sizeSquare}px`
    let sizeWidthSquare = `${sizeSquare}px`
    let sizeHeightSquare = sizeWidthSquare
    let squaresArray = []

    const wrapper = document.querySelector('.wrapper')
    wrapper.style.width = width
    wrapper.style.height = height

    let squareClicked = 0

    let bombsLocationArray = []
    console.log(bombsLocationArray)
    let bombsAmount = Math.floor(row * column / 6)
    let flagsAmount = bombsAmount
    let flags = 0

    let isGameOver = false
    //notification
    const p = document.createElement('p')
    wrapper.after(p)
    p.innerText = ''

    //display
    const bombsNumber = document.querySelector('.number_bombs')
    bombsNumber.innerText = bombsAmount
    const flagsNumber = document.querySelector('.number_flags')
    flagsNumber.innerText = flagsAmount

    //button new game
    const top = document.querySelector('header')
    top.style.width = width
    const button = document.createElement('button')
    button.setAttribute('type', 'reset')
    //top.appendChild(button)
    button.style.border = 'none'
    button.innerText = '↺ NEW GAME'

    //start
    startGame()
    //reset    
    button.addEventListener('click', function (e) {
        isGameOver = false
        squaresArray=[]
        bombsLocationArray=[]
        flagsAmount = bombsAmount
        gameReset()
        console.log('click')
    })

    //populate bombs
    function setBombs() {
        let bombsLeft = bombsAmount
        while (bombsLeft > 0) {
            let r = Math.floor(Math.random() * row);
            let c = Math.floor(Math.random() * column);
            let id = r.toString() + "-" + c.toString();
            if (!bombsLocationArray.includes(id)) {
                bombsLocationArray.push(id)
                bombsLeft -= 1;
            }
        }
    }

    //populate our board
    function startGame() {
        setBombs()
        for (let r = 0; r < row; r++) {
            let row = [];
            for (let c = 0; c < column; c++) {
                let square = document.createElement('div')
                square.style.width = sizeWidthSquare
                square.style.height = sizeHeightSquare
                square.id = r.toString() + "-" + c.toString()
                square.classList.add('square')
                wrapper.append(square)
                row.push(square)
                square.addEventListener('click', clickSquare)
                square.addEventListener('click', function (e) {
                    e.stopPropagation(top.appendChild(button))
                })
                //right click
                square.oncontextmenu = function (e) {
                    e.preventDefault()
                    addFlag(square)
                }
            }
            squaresArray.push(row)
        }
        console.log(squaresArray)
    }

    //add remove flag right click
    function addFlag(square) {
        if (isGameOver) return
        let flags = 0
        if (!square.classList.contains('square-clicked') && (flags < bombsAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = '🚩'
                flags++
                flagsAmount--
                flagsNumber.innerHTML = flagsAmount
                checkForWin()
            } else {
                square.classList.remove('flag')
                square.innerHTML = '?'
                flags--
                flagsAmount++
                flagsNumber.innerHTML = flagsAmount
            }
        }
    }

    //click on square
    function clickSquare() {
        if (isGameOver || this.classList.contains('square-clicked')) return
        let square = this
        if (bombsLocationArray.includes(square.id)) {
            p.innerText = 'BOOM'
            p.style.color = 'red'
            isGameOver = true
            showBombs()
            return
        }
        let coords = square.id.split('-')
        let r = parseInt(coords[0])
        let c = parseInt(coords[1])
        checkBombs(r, c)
    }

    //show bombs
    function showBombs() {
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < column; c++) {
                let square = squaresArray[r][c]
                if (bombsLocationArray.includes(square.id)) {
                    square.textContent = '💣'
                    square.style.backgroundColor = "pink"
                }
            }
        }
        squaresArray = []
        bombsLocationArray = []
        flagsAmount = bombsAmount
    }

    function checkBombs(r, c) {
        if (r < 0 || r >= row || c < 0 || c >= column) return
        if (squaresArray[r][c].classList.contains('square-clicked')) return
        squaresArray[r][c].classList.add('square-clicked')
        squareClicked += 1
        let bombsFound = 0
        //top 3
        bombsFound += checkSquare(r - 1, c - 1) //top left
        bombsFound += checkSquare(r - 1, c) //top
        bombsFound += checkSquare(r - 1, c + 1) //top right
        //left and right
        bombsFound += checkSquare(r, c - 1) //left
        bombsFound += checkSquare(r, c + 1) //right
        //bottom 3
        bombsFound += checkSquare(r + 1, c - 1) //bottom left
        bombsFound += checkSquare(r + 1, c) //bottom
        bombsFound += checkSquare(r + 1, c + 1) //bottom right
        if (bombsFound > 0) {
            squaresArray[r][c].textContent = bombsFound
            squaresArray[r][c].classList.add('x' + bombsFound.toString())
        }
        else {
            //top 3
            checkBombs(r - 1, c - 1) //top left
            checkBombs(r - 1, c) //top
            checkBombs(r - 1, c + 1) //top right
            //left and right
            checkBombs(r, c - 1) //left
            checkBombs(r, c + 1) //right
            //bottom 3
            checkBombs(r + 1, c - 1) //bottom left
            checkBombs(r + 1, c) //bottom
            checkBombs(r + 1, c + 1) //bottom right
        }
        if (squareClicked == row * column - bombsAmount) {
            p.innerText = 'GREAT YOU WIN'
            p.style.color = 'green'
            isGameOver = true
        }
    }

    function checkSquare(r, c) {
        if (r < 0 || r >= row || c < 0 || c >= column) return 0
        if (bombsLocationArray.includes(r.toString() + "-" + c.toString())) return 1
        return 0
    }

    //check for win
    function checkForWin() {
        let count = 0
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < column; c++) {
                if (squaresArray[r][c].classList.contains('flag') &&
                    bombsLocationArray.includes(squaresArray[r][c].id)) {
                    count++
                }
                if (count === bombsLocationArray.length) {
                    p.innerText = 'GREAT YOU WIN'
                    p.style.color = 'green'
                    isGameOver = true
                }
            }
        }
    }

    function gameReset() {
        wrapper.innerHTML = ''
        let width = `${column * sizeSquare}px`
        let height = `${row * sizeSquare}px`
        let sizeWidthSquare = `${sizeSquare}px`
        let sizeHeightSquare = sizeWidthSquare
        //let squaresArray = []
        let squareClicked = 0
        //let bombsLocationArray = []
        let bombsAmount = Math.floor(row * column / 6)
        //let flagsAmount = bombsAmount
        let flags = 0
        let isGameOver = false
        p.innerText = ''
        flagsNumber.innerText = bombsAmount
        startGame()
    }


})
