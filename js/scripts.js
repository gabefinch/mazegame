$(function() {
  $("#name").text("Hello " + name);
  renderView();
  $( document ).keydown(function(event) {
    if (event.which == 37){
      player.headed = counterClockwise[player.headed];
      renderView();
    } else if (event.which == 39) {
      player.headed = clockwise[player.headed];
      renderView();
    } else if (event.which == 38) {
      var playerCell = map[player.x][player.y];
      if (playerCell[player.headed + "door"]) {
        if (player.headed == "north"){player.y += 1;}
        else if(player.headed == "east"){player.x += 1;}
        else if(player.headed == "south"){player.y -= 1;}
        else if(player.headed == "west"){player.x -= 1;}
        PUBNUB_demo.publish({
            channel: 'demo_tutorial',
            message: {"user": name, "x":player.x, "y":player.y}
        });
        if (playerCell.users == "" ){
          $("#name").text(name + "  --all clear")
        } else if(playerCell.users == name ){
          $("#name").text(name + "  --all clear")
        } else {
          $("#name").text(name + "  --warning: " + playerCell.users + " was here before.")
        }
      renderView();
      }
    }
  });
});

var map = [
  [
    {"northdoor":true, "eastdoor":true, "southdoor":false, "westdoor":false, "users":"" },
    {"northdoor":true, "eastdoor":false, "southdoor":true, "westdoor":false, "users":"" },
    {"northdoor":false, "eastdoor":false, "southdoor":true, "westdoor":false, "users":"" }
  ],
  [
    {"northdoor":true, "eastdoor":true, "southdoor":false, "westdoor":true, "users":"" },
    {"northdoor":true, "eastdoor":true, "southdoor":true, "westdoor":false, "users":"" },
    {"northdoor":false, "eastdoor":true, "southdoor":true, "westdoor":false, "users":"" }
  ],
  [
    {"northdoor":false, "eastdoor":false, "southdoor":false, "westdoor":true, "users":"" },
    {"northdoor":true, "eastdoor":false, "southdoor":false, "westdoor":true, "users":"" },
    {"northdoor":false, "eastdoor":false, "southdoor":true, "westdoor":true, "users":"" }
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
  "x":2,
  "y":0,
  "headed": "west"
};

function renderView(){
  var playerCell = map[player.x][player.y];
  console.log(playerCell.users);
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



var PUBNUB_demo = PUBNUB.init({
  publish_key: 'pub-c-609d4b56-229b-4ede-a25d-06a369aa11f7',
  subscribe_key: 'sub-c-9b02eacc-858e-11e5-8e17-02ee2ddab7fe'
});

function get_name() {
    var firstNameSyllables = ["mon","fay","shi","zag","blarg","rash","izen"];
    var firstName = "";
    var numberOfSyllablesInFirstName = Math.floor(Math.random() * (4 - 2)) + 2;
    for (var i = 0; i < numberOfSyllablesInFirstName; i++)
    {firstName += firstNameSyllables[Math.floor(Math.random() * firstNameSyllables.length)];}
    return firstName;
}
var name = get_name();


PUBNUB_demo.subscribe({
  channel: 'demo_tutorial',
  message: function(message){
    console.log(message);
    map[message.x][message.y].users = message.user;
  }
});
