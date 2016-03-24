$(document).ready(function() {

  var currentPlayer = true;
  $(".cell").click(function() {
    if(currentPlayer){
      addX($(this));
    }
    else{
      addO($(this));
    }
    var won = hasWon(currentPlayer) ;
    if(won){
      $(".cell").html("");
      $(".cell").removeClass("disabledbutton");
      var player = currentPlayer ? "X" : "O";
      alert("Won "+player);
    }
    currentPlayer = !currentPlayer;
  });


  function hasWon(currentPlayer) {
    var player = currentPlayer ? "X" : "O";
    var arr = ["zero","one","two"];
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
        if ( getText($(row_element)) === player)
          row_count += 1;
        if ( getText($(column_element)) === player)
          column_count += 1;
        if( i == j && (getText($(row_element)) === player) )
          diag_count += 1;
        if( j == 3-i-1 && (getText($(row_element)) === player) )
          off_diag_count += 1;
      }
      if(row_count == 3){
        row = true;
        break;
      }
      if(column_count == 3){
        column = true;
        break;
      }
      if (diag_count == 3){
        diagonal = true;
        break;
      }
      if(off_diag_count == 3){
        off_diagonal = true;
        break;
      }
    }
    return row || column || diagonal || off_diagonal;
  }
});

function getText(element) {
      return element.text().trim();
}

function addX(element) {
  element.addClass("disabledbutton");
  element.html("<span> X </span>");
}

function addO(element) {
  element.addClass("disabledbutton");
  element.html("<span> O </span>");
}
