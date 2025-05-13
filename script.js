document.addEventListener('DOMContentLoaded', function (){
    var number = 1;
    var listOfCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let cells = document.querySelectorAll('.cell');
    let result = document.getElementById('result');
    let gameOver = false; // <-- Add this flag

    for(let i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', function() { 
            if (cells[i].innerHTML === '' && !gameOver) { // Prevent overwriting and moves after game over
                draw(i); 
                if (!gameOver) bot_turn(); // Let bot play after player if game not over
            }
        });
    }
    function draw(i){
        cells[i].innerHTML = get_sign();
        number++;
        removeElement(listOfCells, i);
        winner();
    }

    function get_sign(){
        return number % 2 === 0 ? 'O' : 'X';
    }

    function removeElement(array, value) {
        const index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    function bot_turn (){
        if (number % 2 === 0 && listOfCells.length > 0 && !gameOver){
            let botIndex = listOfCells[Math.floor(Math.random() * listOfCells.length)];
            draw(botIndex);
        }
    }

    function winner() {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        let cells = document.querySelectorAll('.cell');
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                cells[a].innerHTML &&
                cells[a].innerHTML === cells[b].innerHTML &&
                cells[a].innerHTML === cells[c].innerHTML
            ) {
                result.innerHTML = `<p>Player ${cells[a].innerHTML} wins!</p>`;
                gameOver = true; // <-- Set game over
                return;
            }
        }
        // Check for draw
        let isDraw = true;
        for (let cell of cells) {
            if (cell.innerHTML === '') {
                isDraw = false;
                break;
            }
        }
        if (isDraw) {
            result.innerHTML = "<p>It's a Draw</p>";
            gameOver = true; // <-- Set game over
        }
    }
});