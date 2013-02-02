/**
 * Set up a game, add players, control etc.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
$(document).ready(function () {

  game = new Game({
    space_width: 310,
    space_height: 250
  });
  game.init();
  
  game.my_ship = new Ship({
    name: 'The Heavy Hawk',
    type: 'default',
    tmpl: $('#shipTmpl').html(),
    affiliation: 'friend',
    x: Rand.getInt(30,game.space_width-10),
    y: Rand.getInt(30,game.space_height-10),
    crew: [
      new CrewMember({name:'Jase Barner'}),
      new CrewMember({name:'Harry Raige'}),
      new CrewMember({name:'Patry Gibbon'})
    ]
  });
  
  game.addEnemy({
    name: 'Bastards',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30,game.space_width-10),
    y: Rand.getInt(30,game.space_height-10)
  });
  game.addEnemy({
    name: 'Theives',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30,game.space_width-10),
    y: Rand.getInt(30,game.space_height-10)
  });
  game.addEnemy({
    name: 'Pirates',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30,game.space_width-10),
    y: Rand.getInt(30,game.space_height-10)
  });
  
  
  String.prototype.repeat = function( num ) {
    return new Array( num + 1 ).join( this );
  }

  // Create space -  Let there be light, etc...
  var stage = new Kinetic.Stage({
    container: 'space',
    width: 320,
    height: 250
  });
  
  // Create some layers
  var layer_stars = new Kinetic.Layer();
  var layer_ships = new Kinetic.Layer();
  var layer_message = new Kinetic.Layer();
  
  // Create some stars
  for (var x = 0; x < 500; x++) {
    var randcol = Rand.getColor(0, 70, true);
    star = new Kinetic.Rect({
      x: Rand.getInt(7, game.space_width - 7),
      y: Rand.getInt(7, game.space_height - 7),
      width: 4,
      height: 4,
      fill: randcol,
      stroke: 'black',
      strokeWidth: 0
    });
    layer_stars.add(star);
  }
    
  // show enemy ships on canvas
  for (var x = 0; x < game.enemies.length; x++) {
    layer_ships.add(new Kinetic.Rect({
      x: game.enemies[x].x,
      y: game.enemies[x].y,
      width: 5,
      height: 5,
      fill: '#f00',
      stroke: 'black',
      strokeWidth: 0
    }));
    layer_ships.add(new Kinetic.Text({
      x: game.enemies[x].x + 10,
      y: game.enemies[x].y - 5,
      text: game.enemies[x].name,
      fill: '#c00',
      fontFamily: 'arial',
      shadowColor: '#f00',
      shadowBlur: 10,
      shadowOffset: 0,
      shadowOpacity: 1
    }));
  }
  
  // add the hawk
  game.my_ship.shape = new Kinetic.Rect({
    x: game.my_ship.x,
    y: game.my_ship.y,
    width: 5,
    height: 5,
    fill: '#0c0',
    stroke: 'black',
    strokeWidth: 0
  });
  game.my_ship.label = new Kinetic.Text({
    x: game.my_ship.x + 10,
    y: game.my_ship.y - 5,
    text: game.my_ship.name,
    fill: '#0c0',
    fontFamily: 'arial',
    shadowColor: '#0f0',
    shadowBlur: 10,
    shadowOffset: 0,
    shadowOpacity: 1
  });
  
  // Set up message output
  var message = new Kinetic.Text({
    x: 10,
    y: 10,
    text: '------',
    fontSize: 16,
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fill: 'green',
    opacity: 0
  });
  layer_message.add(message);
  
  layer_ships.add(game.my_ship.shape);
  layer_ships.add(game.my_ship.label);
  
  stage.add(layer_stars);
  stage.add(layer_ships);
  stage.add(layer_message);
  
  /**
   * Add some controls
   */
  $('#hitShip').on('click', function() {
    game.my_ship.hit(game.enemies[game.dice(game.enemies.length)], 0);
  });
  
  $('#hitSomeone').on('click', function () {
    game.my_ship.crew[game.dice(game.my_ship.crew.length)].hit(30);
  });
  
  $('#fireLaser').on('click', function () {
    game.enemies[game.dice(game.enemies.length)].hit(game.my_ship, 0);
  });
  
  $('#fireMissile').on('click', function () {
    game.enemies[game.dice(game.enemies.length)].hit(game.my_ship, 1);
  });
  
  $('.pauseBtn').on('click', function () {
    game.playPause();
  });
  
  $('.goRefresh').on('click', function() {
    window.refresh();
  });
  
  $(window).resize(function () {
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  });
  
  /**
   * Add keyboard shortcuts
   */
  $(document).keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    console.log(keyCode);
    switch (keyCode) {
      case 80: // P - Pause
        game.playPause();
        break;
      case 76: // L - Laser
        game.enemies[game.dice(game.enemies.length)].hit(game.my_ship, 0);
        break;
      case 77: // M - Missile
        game.enemies[game.dice(game.enemies.length)].hit(game.my_ship, 1);
        break;
      case 87: // W - Warp
        game.my_ship.warp();
        break;
    }
  });
  
  //game.playPause();
});