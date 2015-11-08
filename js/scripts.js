$(function() {
  renderView();
  $( document ).keydown(function(event) {
    if (event.which == 37){
      player.headed = counterClockwise[player.headed];
      renderView();
    }
    else if (event.which == 39) {
      player.headed = clockwise[player.headed];
      renderView();
    }
    else if (event.which == 38) {
      var playerCell = map[player.x][player.y];
      if (playerCell[player.headed + "door"]) {
        if (player.headed == "north"){
          player.y += 1;
        }
        else if(player.headed == "east"){
          player.x += 1;
        }
        else if(player.headed == "south"){
          player.y -= 1;
        }
        else if(player.headed == "west"){
          player.x -= 1;
        }
      renderView();
      }
    }
  });
});

var map = [
  [
    {"northdoor":true, "eastdoor":true, "southdoor":false, "westdoor":false },
    {"northdoor":false, "eastdoor":true, "southdoor":true, "westdoor":false }
  ],
  [
    {"northdoor":false, "eastdoor":false, "southdoor":false, "westdoor":true},
    {"northdoor":false, "eastdoor":false, "southdoor":false, "westdoor":true}
  ]
];

var counterClockwise = {"east":"north","north":"west","west":"south","south":"east"};

var clockwise = {"east":"south","south":"west","west":"north","north":"east"};

var viewedDoors = {
  "east":["northdoor","eastdoor","southdoor"],
  "west":["southdoor","westdoor","northdoor"],
  "north":["westdoor","northdoor","eastdoor"],
  "south":["eastdoor","southdoor","westdoor"]
};

var player = {
  "x":1,
  "y":0,
  "headed": "east"
};

function renderView(){
  var playerCell = map[player.x][player.y];
  var imagePath = "url('./img/";
  for(var i=0; i<viewedDoors[player.headed].length; i++){
    if (playerCell[viewedDoors[player.headed][i]]){
      imagePath += "1"
    } else {
      imagePath += "0"
    }
  };
  imagePath += ".png')"
  $("#portal").css( "background-image", imagePath );
  $("#portal").text( player.headed );
}
