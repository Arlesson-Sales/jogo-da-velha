/*
  Jogo da velha com niveis
  @author Arlesson Sales
*/

let level, playerLetter = "X", cpuLetter = "O", game = false, turn = 0, number = 0, interval;
const mainMenu = document.getElementById("mainMenu");
const boardCase = document.querySelectorAll(".board-case");
const board = ["","","","","","","","",""];

function start() {
  game = true;
  turn = Math.floor(Math.random() * 2);
  level = Number(document.getElementsByTagName("select")[0].value);
  mainMenu.classList.add("close");
  actualizeMessage();
  
  (turn === 1)? playCPU() : false;
}

function restart() {
  console.clear();
  clearTimeout(interval);
  mainMenu.classList.remove("close");
  actualizeMessage(`Jogo da velha`);
  for(let pos = 0; pos < board.length; pos++) { board[pos] = "";}
  actualizeBoard();
}

function empate() {
  let valueOfEmpate = 0;
  for(let pos = 0; pos < board.length; pos++) {
    if(board[pos] != "") valueOfEmpate++;
  }
  if(valueOfEmpate === 9) {
    game = false;
    actualizeMessage(`Houve um empate`);
    setTimeout(restart,1200);
  }
}

function actualizeMessage(text) {
  let message = document.getElementById("message");
  (turn === 0)? message.innerHTML = `Vez do Jogador ${playerLetter}` : message.innerHTML = `Vez do Jogador ${cpuLetter}`;
  (text != undefined)? message.innerHTML = text : false;
}

function actualizeBoard() {
  let boardIndex = 0;
  boardCase.forEach(box => {
    (board[boardIndex] != "")? box.innerHTML = `<p>${board[boardIndex]}</p>` : box.innerHTML = ``;
    boardIndex++;
  });
}

function checkWinner(letter) {
  if(board[0] === letter && board[1] === letter && board[2] === letter) {
    game = false;
    actualizeMessage(`Jogador ${letter} ganhou!`);
    setTimeout(restart,1200);
  }
  if(board[3] === letter && board[4] === letter && board[5] === letter) {
    game = false;
    actualizeMessage(`Jogador ${letter} ganhou!`);
    setTimeout(restart,1200);
  }
  if(board[6] === letter && board[7] === letter && board[8] === letter) {
    game = false;
    actualizeMessage(`Jogador ${letter} ganhou!`);
    setTimeout(restart,1200);
  }
  if(board[0] === letter && board[3] === letter && board[6] === letter) {
    game = false;
    actualizeMessage(`Jogador ${letter} ganhou!`);
    setTimeout(restart,1200);
  }
  if(board[1] === letter && board[4] === letter && board[7] === letter) {
    game = false;
    actualizeMessage(`Jogador ${letter} ganhou!`);
    setTimeout(restart,1200);
  }
  if(board[2] === letter && board[5] === letter && board[8] === letter) {
    game = false;
    actualizeMessage(`Jogador ${letter} ganhou!`);
    setTimeout(restart,1200);
  }
  if(board[0] === letter && board[4] === letter && board[8] === letter) {
    game = false;
    actualizeMessage(`Jogador ${letter} ganhou!`);
    setTimeout(restart,1200);
  }
  if(board[2] === letter && board[4] === letter && board[6] === letter) {
    game = false;
    actualizeMessage(`Jogador ${letter} ganhou!`);
    setTimeout(restart,1200);
  }
}

function play(boardIndex) {
  if(game && turn === 0) {
    if(board[boardIndex] === "") {
      board[boardIndex] = playerLetter;
      turn++;
    }
    actualizeBoard(); actualizeMessage();
    checkWinner(playerLetter); checkWinner(cpuLetter);
    interval = setTimeout(empate,1000);
    setTimeout(playCPU, 1350);
  }
}

function playCPU() {
  if(game && turn === 1) {
    switch(level) {
      case 1:
        CPULevel01();
        break;
      case 2:
        CPULevel02();
        break;
      default: alert("Erro na jogada da CPU");
    }
    checkWinner(playerLetter); checkWinner(cpuLetter);
    interval = setTimeout(empate,1350);
  }
}

function CPULevel01() {
  let randomBoardIndex = Math.floor(Math.random() * board.length);
  if(board[randomBoardIndex] === "") {
    board[randomBoardIndex] = cpuLetter;
    turn--;
    actualizeBoard(); actualizeMessage();
    
  } else {
    CPULevel01();
  }
}

function CPULevel02() {
  let index = Math.floor(Math.random() * board.length);
  if(CPUDefense()) index = Number(CPUDefense());
  if(CPUAttack()) index = Number(CPUAttack());
  console.log(`index: ${index}`);
  
  if(board[index] === "") {
    board[index] = cpuLetter;
    turn--;
    actualizeBoard(); actualizeMessage();
  } else {
    CPULevel02();
  }
}

function CPUDefense() {
  //Condição horizontal da primeira fila
  if(board[1] === playerLetter && board[2] === playerLetter && board[0] === "") return "0";
  if(board[0] === playerLetter && board[2] === playerLetter && board[1] === "") return 1;
  if(board[0] === playerLetter && board[1] === playerLetter && board[2] === "") return 2;
  
  //Condição horizontal da segunda fila
  if(board[4] === playerLetter && board[5] === playerLetter && board[3] === "") return 3;
  if(board[3] === playerLetter && board[5] === playerLetter && board[4] === "") return 4;
  if(board[3] === playerLetter && board[4] === playerLetter && board[5] === "") return 5;
  
  //Condição horizontal da terceira fila
  if(board[7] === playerLetter && board[8] === playerLetter && board[6] === "") return 6;
  if(board[6] === playerLetter && board[8] === playerLetter && board[7] === "") return 7;
  if(board[6] === playerLetter && board[7] === playerLetter && board[8] === "") return 8;
  
  //Condição vertical da primeira fila
  if(board[3] === playerLetter && board[6] === playerLetter && board[0] === "") return "0";
  if(board[0] === playerLetter && board[6] === playerLetter && board[3] === "") return 3;
  if(board[0] === playerLetter && board[3] === playerLetter && board[6] === "") return 6;
  
  //Condição vertical da segunda fila
  if(board[4] === playerLetter && board[7] === playerLetter && board[1] === "") return 1;
  if(board[1] === playerLetter && board[7] === playerLetter && board[4] === "") return 4;
  if(board[1] === playerLetter && board[4] === playerLetter && board[7] === "") return 7;
  
  //Condição vertical da terceira fila
  if(board[5] === playerLetter && board[8] === playerLetter && board[2] === "") return 2;
  if(board[2] === playerLetter && board[8] === playerLetter && board[5] === "") return 5;
  if(board[2] === playerLetter && board[5] === playerLetter && board[8] === "") return 8;
  
  //Condição descida 01
  if(board[4] === playerLetter && board[8] === playerLetter && board[0] === "") return "0";
  if(board[0] === playerLetter && board[8] === playerLetter && board[4] === "") return 4;
  if(board[0] === playerLetter && board[4] === playerLetter && board[8] === "") return 8;
  
  //Condição descida 02
  if(board[4] === playerLetter && board[6] === playerLetter && board[2] === "") return 2;
  if(board[2] === playerLetter && board[6] === playerLetter && board[4] === "") return 4;
  if(board[2] === playerLetter && board[4] === playerLetter && board[6] === "") return 6;
}

function CPUAttack() {
  //Condição horizontal da primeira fila
  if(board[1] === cpuLetter && board[2] === cpuLetter && board[0] === "") return "0";
  if(board[0] === cpuLetter && board[2] === cpuLetter && board[1] === "") return 1;
  if(board[0] === cpuLetter && board[1] === cpuLetter && board[2] === "") return 2;
  
  //Condição horizontal da segunda fila
  if(board[4] === cpuLetter && board[5] === cpuLetter && board[3] === "") return 3;
  if(board[3] === cpuLetter && board[5] === cpuLetter && board[4] === "") return 4;
  if(board[3] === cpuLetter && board[4] === cpuLetter && board[5] === "") return 5;
  
  //Condição horizontal da terceira fila
  if(board[7] === cpuLetter && board[8] === cpuLetter && board[6] === "") return 6;
  if(board[6] === cpuLetter && board[8] === cpuLetter && board[7] === "") return 7;
  if(board[6] === cpuLetter && board[7] === cpuLetter && board[8] === "") return 8;
  
  //Condição vertical da primeira fila
  if(board[3] === cpuLetter && board[6] === cpuLetter && board[0] === "") return "0";
  if(board[0] === cpuLetter && board[6] === cpuLetter && board[3] === "") return 3;
  if(board[0] === cpuLetter && board[3] === cpuLetter && board[6] === "") return 6;
  
  //Condição vertical da segunda fila
  if(board[4] === cpuLetter && board[7] === cpuLetter && board[1] === "") return 1;
  if(board[1] === cpuLetter && board[7] === cpuLetter && board[4] === "") return 4;
  if(board[1] === cpuLetter && board[4] === cpuLetter && board[7] === "") return 7;
  
  //Condição vertical da terceira fila
  if(board[5] === cpuLetter && board[8] === cpuLetter && board[2] === "") return 2;
  if(board[2] === cpuLetter && board[8] === cpuLetter && board[5] === "") return 5;
  if(board[2] === cpuLetter && board[5] === cpuLetter && board[8] === "") return 8;
  
  //Condição descida 01
  if(board[4] === cpuLetter && board[8] === cpuLetter && board[0] === "") return "0";
  if(board[0] === cpuLetter && board[8] === cpuLetter && board[4] === "") return 4;
  if(board[0] === cpuLetter && board[4] === cpuLetter && board[8] === "") return 8;
  
  //Condição descida 02
  if(board[4] === cpuLetter && board[6] === cpuLetter && board[2] === "") return 2;
  if(board[2] === cpuLetter && board[6] === cpuLetter && board[4] === "") return 4;
  if(board[2] === cpuLetter && board[4] === cpuLetter && board[6] === "") return 6;
}