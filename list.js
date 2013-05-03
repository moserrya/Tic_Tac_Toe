function Game(){
  this.board = '         '.split('');

  this.moveCount = Math.floor(Math.random() * 2);

  this.gameOverPatterns =
    [[(/OOO....../),'O'], [(/...OOO.../),'O'],
     [(/......OOO/),'O'], [(/O..O..O../),'O'],
     [(/.O..O..O./),'O'], [(/..O..O..O/),'O'],
     [(/O...O...O/),'O'], [(/..O.O.O../),'O'],
     [(/XXX....../),'X'], [(/...XXX.../),'X'],
     [(/......XXX/),'X'], [(/X..X..X../),'X'],
     [(/.X..X..X./),'X'], [(/..X..X..X/),'X'],
     [(/X...X...X/),'X'], [(/..X.X.X../),'X'],
     [(/[OX]{9}/), "Draw"]]

   this.winningPatterns =
     [[(/ OO....../),0],[(/O..O.. ../),6],
      [(/......OO /),8],[(/.. ..O..O/),2],
      [(/ ..O..O../),0],[(/...... OO/),6],
      [(/..O..O.. /),8],[(/OO ....../),2],
      [(/ ...O...O/),0],[(/..O.O. ../),6],
      [(/O...O... /),8],[(/.. .O.O../),2],
      [(/O O....../),1],[(/O.. ..O../),3],
      [(/......O O/),7],[(/..O.. ..O/),5],
      [(/. ..O..O./),1],[(/... OO.../),3],
      [(/.O..O.. ./),7],[(/...OO .../),5]];
   
   this.blockingPatterns =
     [[(/  X . X  /),1],[(/ XX....../),0],[(/X..X.. ../),6],
      [(/......XX /),8],[(/.. ..X..X/),2],[(/ ..X..X../),0],
      [(/...... XX/),6],[(/..X..X.. /),8],[(/XX ....../),2],
      [(/ ...X...X/),0],[(/..X.X. ../),6],[(/X...X... /),8],
      [(/.. .X.X../),2],[(/X X....../),1],[(/X.. ..X../),3],
      [(/......X X/),7],[(/..X.. ..X/),5],[(/. ..X..X./),1],
      [(/... XX.../),3],[(/.X..X.. ./),7],[(/...XX .../),5],
      [(/ X X.. ../),0],[(/ ..X.. X /),6],[(/.. ..X X /),8],
      [(/ X ..X.. /),2],[(/  XX.. ../),0],[(/X.. .. X /),6],
      [(/.. .XX   /),8],[(/X  ..X.. /),2],[(/ X  ..X../),0],
      [(/ ..X..  X/),6],[(/..X..  X /),8],[(/X  ..X.. /),2]];  
  
  this.initialize();
}

Game.prototype = {
  constructor: Game,

  updateBoard: function(index, letter) {
    $('td[square-index=' + index +']').addClass(letter);
    $('td[square-index=' + index +']').text(letter);
    this.board[index] = letter;
    this.moveCount++;
    this.checkIfGameOver();
  },

  checkIfGameOver: function() {
    var winner = this.findPattern(this.gameOverPatterns);
    if (winner === -1) {
      if (this.moveCount % 2 === 0){
        this.computerMove();
      } 
    } else {
      $('tr').unbind();
      this.showWinner(winner);
    }
  },

  showWinner: function(winner) {
    if (winner === "O") {
      $('.winner').text("The Computer Wins. Again.");
    } else {
      $('.winner').text("You escaped with a draw.");
    }
    $('.winner').show();
  },

  firstAvailableMove: function() {
    if (this.board[4] === ' ') {
      this.updateBoard(4, 'O');
    } else {
      this.updateBoard(this.board.indexOf(" "), 'O');
    }
  },

  computerMove: function() {
    var winIndex = this.findPattern(this.winningPatterns);
    var blockIndex = this.findPattern(this.blockingPatterns);
    if (winIndex > -1) {
      this.updateBoard(winIndex, 'O');
    } else if (blockIndex > -1) {
      this.updateBoard(blockIndex, 'O');
    } else {
      this.firstAvailableMove();
    }
  },

  playerMove: function() {
    self = this;
    $('tr').on("click", "td", function() {
      if (!$(this).hasClass('O') && !$(this).hasClass('X')){
        index = parseInt($(this).attr("square-index"));
        self.updateBoard(index, 'X');
      }
    });
  },

  findPattern: function(patterns) {
    var joinedBoard = this.board.join("");
    for (i in patterns) {
      match = joinedBoard.match(patterns[i][0]);
      if (match) { return patterns[i][1]; }
    }
    return -1;
  },

  initialize: function(){
    $('.winner').hide();
    this.playerMove();
    this.checkIfGameOver();
  }
}

$(document).ready(function(){
  game = new Game();
  $('.reset-button').on("click", function(){
    location.reload();
  });
});


