/**
 * Set up a game, add players, control etc.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
$(document).ready(function () {

  game = new Game();
  game.init();
  
  game.my_ship = new Ship({
    name: 'The Heavy Hawk',
    type: 'default',
    tmpl: $('#shipTmpl').html(),
    affiliation: 'friend',
    x: Rand.getInt(30,240),
    y: Rand.getInt(30,140)
  });
  game.my_ship.addCrew({name:'Jase Barner'});
  game.my_ship.addCrew({name:'Harry Raige'});
  game.my_ship.addCrew({name:'Patry Gibbon'});
  
  game.addEnemy({
    name: 'Bastards',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30,240),
    y: Rand.getInt(30,140)
  });
  game.addEnemy({
    name: 'Theives',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30,240),
    y: Rand.getInt(30,140)
  });
  game.addEnemy({
    name: 'Pirates',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30,240),
    y: Rand.getInt(30,140)
  });
  
  
  String.prototype.repeat = function( num ) {
    return new Array( num + 1 ).join( this );
  }

  // Create space -  Let there be light, etc...
  var stage = new Kinetic.Stage({
    container: 'space',
    width: 320,
    height: 170
  });
  
  // Create some layers
  var layer_stars = new Kinetic.Layer();
  var layer_ships = new Kinetic.Layer();
  var layer_message = new Kinetic.Layer();
  
  // Create some stars
  for (var x = 0; x < 500; x++) {
    var randcol = Rand.getColor(0, 6, true);
    star = new Kinetic.Rect({
      x: Rand.getInt(1, 320),
      y: Rand.getInt(1, 170),
      width: 3,
      height: 3,
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
      width: 4,
      height: 4,
      fill: '#f00',
      stroke: 'black',
      strokeWidth: 0
    }));
    layer_ships.add(new Kinetic.Text({
      x: game.enemies[x].x + 10,
      y: game.enemies[x].y - 5,
      text: game.enemies[x].name,
      fill: '#c00'
    }));
  }
  
  // add the badger
  var shape_badger = new Kinetic.Rect({
    x: game.my_ship.x,
    y: game.my_ship.y,
    width: 4,
    height: 4,
    fill: '#0c0',
    stroke: 'black',
    strokeWidth: 0
  });
  var text_badger = new Kinetic.Text({
    x: game.my_ship.x + 10,
    y: game.my_ship.y - 5,
    text: game.my_ship.name,
    fill: '#0c0'
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
  
  layer_ships.add(shape_badger);
  layer_ships.add(text_badger);
  
  stage.add(layer_stars);
  stage.add(layer_ships);
  stage.add(layer_message);
  
  /**
   * Add some controls
   */
  $('#hitShip').on('click', function() {
    game.message('------------------------');
    game.my_ship.hit(game.enemies[game.dice(game.enemies.length)], 0);
  });
  
  $('#hitSomeone').on('click', function () {
    game.message('------------------------');
    game.my_ship.crew[game.dice(game.my_ship.crew.length)].hit(30);
  });
  
  $('#fireLaser').on('click', function () {
    game.message('------------------------');
    game.enemies[game.dice(game.enemies.length)].hit(game.my_ship, 0);
  });
  
  $('#fireMissile').on('click', function () {
    game.message('------------------------');
    game.enemies[game.dice(game.enemies.length)].hit(game.my_ship, 1);
  });
  
  $('.pause_btn').on('click', game.pause);
  
  $('.goRefresh').on('click', function() {
    window.refresh();
  });
  
  $(window).resize(function () {
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  });
  
  game.play();
});