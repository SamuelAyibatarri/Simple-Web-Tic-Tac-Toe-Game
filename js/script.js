document.getElementById('startButton').addEventListener('click', function(){
    localStorage.setItem('fromStart', 'true');
    window.location.href='game.html';
});

