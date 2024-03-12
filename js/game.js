let scores = {
    playerx: 0,
    cpu: 0,
    draws: 0
};

let playerx = 'X';
let cpu = 'O';
let currentPlayer = playerx;
let tic = ['', '', '', '', '', '', '', '', ''];
let arrayPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function showAlertWithTimeout(message, timeout) {
    alert(message);
    setTimeout(function() {
        // Close the alert after the specified timeout
        document.querySelector('.alert').style.display = 'none';
    }, timeout);
}

function handleMove(index) {
    if (tic[index] === '') {
        tic[index] = currentPlayer;
        document.getElementById('tic').children[index].innerText = currentPlayer;
        if (checkWinner(playerx)[0]) {
            setTimeout(resetGame, 1000);
            setTimeout(alert(`Player ${playerx} wins!`),600);
            scores.playerx++;
            return;
        }
        if (checkWinner(cpu)[0]) {
            setTimeout(resetGame, 1000);
            setTimeout(alert(`Player ${cpu} wins!`),600)
            scores.cpu++;
            return;
        }

        if (tic.every(tbox => tbox !== '')) {
            setTimeout(resetGame, 1000);
            setTimeout(alert('It\'s a draw!'),600);
            scores.draws++;
            return;
        }
        currentPlayer = currentPlayer === playerx ? cpu : playerx;
        if (currentPlayer === cpu) {
            setTimeout(computerMove, 600);
        }
    }
}

function checkWin(player) {
    // Define the winning patterns (rows, columns, diagonals)
    const patterns = arrayPattern;

    // Check each winning pattern
    for (let pattern of patterns) {
        const [a, b, c] = pattern;
        if (tic[a] === player && tic[b] === player && tic[c] === player) {
            return true; // Player has won
        }
    }

    return false; // No win found
}


function checkWinner(player) {
    // Define the winning patterns (rows, columns, diagonals)
    const patterns = arrayPattern;

    // Check each winning pattern
    for (let pattern of patterns) {
        const [a, b, c] = pattern;
        if (tic[a] === player && tic[b] === player && tic[c] === player) {
            return [true, pattern]; // Player has won
        }
    }

    return [false, null]; // No win found
}

function computerMove() {
    if (currentPlayer === cpu) {
        let nextMove = -1; // Default to an invalid move
        let array = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        // Check if computer has a chance to win
        for (let pattern of array) {
            const [a, b, c] = pattern;
            if (tic[a] === cpu && tic[b] === cpu && tic[c] === '') {
                nextMove = c;
                break; // Exit loop once a winning move is found
            } else if (tic[a] === cpu && tic[c] === cpu && tic[b] === '') {
                nextMove = b;
                break; // Exit loop once a winning move is found
            } else if (tic[b] === cpu && tic[c] === cpu && tic[a] === '') {
                nextMove = a;
                break; // Exit loop once a winning move is found
            }
        }
        if (nextMove === -1) {
            // If no winning move, check if player can win and block
            for (let pattern of array) {
                const [a, b, c] = pattern;
                if (tic[a] === playerx && tic[b] === playerx && tic[c] === '') {
                    nextMove = c;
                    break; // Exit loop once a blocking move is found
                } else if (tic[a] === playerx && tic[c] === playerx && tic[b] === '') {
                    nextMove = b;
                    break; // Exit loop once a blocking move is found
                } else if (tic[b] === playerx && tic[c] === playerx && tic[a] === '') {
                    nextMove = a;
                    break; // Exit loop once a blocking move is found
                }
            }
        }
        if (nextMove === -1) {
            // If no winning or blocking move, play randomly
            do {
                nextMove = Math.floor(Math.random() * 9);
            } while (tic[nextMove] !== '');
        }
        handleMove(nextMove);
    }
}

function resetGame() {
    currentPlayer = playerx;
    tic = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('tic').childNodes.forEach(tbox => tbox.innerText = '');
    updateScores();
  }


  function updateScores() {
    document.getElementById('playerx-wins').textContent = scores.playerx;
    document.getElementById('cpu-wins').textContent = scores.cpu;
    document.getElementById('draws').textContent = scores.draws;
}

document.getElementById('restart-button').addEventListener('click', function() {
    location.reload();
});
