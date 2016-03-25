

currentPlayer = true;
choice = {x:0,y:0};
game = [ [0,0,0],[0,0,0],[0,0,0] ];
word_index = {zero:0,one:1,two:2};
index_word = {0:'zero',1:'one',2:'two'};


$(document).ready(function() {

  $(".cell").click(function() {
    console.log("game",game);
    var player = currentPlayer ? "X" : "O";
    selectElement( $(this), player);
    var index = getIndex( $(this) );
    // console.log("index",index);
    currentPlayer ? game[index.i][index.j] = 1 : game[index.i][index.j] = -1;
    // console.log("index",index);
    var won = hasWon(currentPlayer);
    if (won) {
      $(".cell").html("");
      $(".cell").removeClass("disabledbutton");
      var player = currentPlayer ? "X" : "O";
      alert("Won " + player);
    }
    else{
        if( matchDraw() ){
          $(".cell").html("");
          $(".cell").removeClass("disabledbutton");
          alert("Match drawn!");
        }
    }
    currentPlayer = !currentPlayer;
  });


});

function matchDraw() {

  var count = 0;
  $(".cell").each(function (index,element) {
    // console.log(count,element);
    var text = getText($(this));
    if (text)
      count +=1;
  });
  return count == 9 ? true : false;
}

function hasWon(currentPlayer) {
  var player = currentPlayer ? "X" : "O";
  var arr = ["zero", "one", "two"];
  var row = false;
  var column = false;
  var diagonal = false;
  var off_diagonal = false;
  var diag_count = 0;
  var off_diag_count = 0;
  for (var i = 0; i < arr.length; i++) {
    var row_count = 0;
    var column_count = 0;
    for (var j = 0; j < arr.length; j++) {

      var row_element = "." + arr[i] + "-" + arr[j];
      var column_element = "." + arr[j] + "-" + arr[i];
      // console.log(getText($(row_element)),i,j);
      if (getText($(row_element)) === player)
        row_count += 1;
      if (getText($(column_element)) === player)
        column_count += 1;
      if (i == j && (getText($(row_element)) === player))
        diag_count += 1;
      if (j == 3 - i - 1 && (getText($(row_element)) === player))
        off_diag_count += 1;
    }
    if (row_count == 3) {
      row = true;
      break;
    }
    if (column_count == 3) {
      column = true;
      break;
    }
    if (diag_count == 3) {
      diagonal = true;
      break;
    }
    if (off_diag_count == 3) {
      off_diagonal = true;
      break;
    }
  }
  return row || column || diagonal || off_diagonal;
}

function getIndex(element) {
      var item = element.attr("class").split(" ")[1].split("-");
      return { i:word_index[item[0]],j:word_index[item[1]] };
}

function indexToClass(index) {
      return "." + index_word[index[i]] + "-" + index_word[index[j]];
}

function getpossibleMoves() {

}

function getText(element) {
  return element.text().trim();
}

function selectElement(element,player) {
  element.addClass("disabledbutton");
  element.html("<span>"+player+" </span>");
}
