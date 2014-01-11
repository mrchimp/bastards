/**
 * Set up a game, add players, control etc.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */


String.prototype.repeat = function(num) {
  'use strict';

  return new Array(num + 1).join( this );
};

var Bastards = {};

$(function () {
  'use strict';

  var i;

  Bastards.game = new Game({
    space_width: 310,
    space_height: 250
  });

  Bastards.game.init();
  
  Bastards.game.setShip({
    name: 'The Heavy Hawk',
    type: 'default',
    tmpl: $('#shipTmpl').html(),
    affiliation: 'friend',
    x: Rand.getInt(30, Bastards.game.space_width-10),
    y: Rand.getInt(30, Bastards.game.space_height-10),
    crew: [
      new CrewMember({name:'Jase Barner'}),
      new CrewMember({name:'Harry Raige'}),
      new CrewMember({name:'Patry Gibbon'})
    ]
  });

  for (i = 0; i < Bastards.game.my_ship.crew.length; i++) {
    Bastards.game.my_ship.crew[i].ship = Bastards.game.my_ship;
  }
  
  Bastards.game.addEnemy({
    name: 'Bastards',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30, Bastards.game.space_width-10),
    y: Rand.getInt(30, Bastards.game.space_height-10)
  });

  Bastards.game.addEnemy({
    name: 'Thieves',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30, Bastards.game.space_width-10),
    y: Rand.getInt(30, Bastards.game.space_height-10)
  });

  Bastards.game.addEnemy({
    name: 'Pirates',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30, Bastards.game.space_width-10),
    y: Rand.getInt(30, Bastards.game.space_height-10)
  });

  // Create space -  Let there be light, etc...
  Bastards.game.stage = new Kinetic.Stage({
    container: 'space',
    width: 320,
    height: 250
  });
  
  // Create some layers
  var layer_stars = new Kinetic.Layer();
  var layer_ships = new Kinetic.Layer();
  var layer_message = new Kinetic.Layer();
  
  // Create some stars
  for (i = 0; i < 500; i++) {
    var randcol = Rand.getColor(0, 180, true),
    star = new Kinetic.Rect({
      x: Rand.getInt(7, Bastards.game.space_width - 7),
      y: Rand.getInt(7, Bastards.game.space_height - 7),
      width: 3,
      height: 3,
      fill: randcol,
      stroke: 'black',
      strokeWidth: 0
    });

    layer_stars.add(star);
  }
  
  // show enemy ships on canvas
  for (i = 0; i < Bastards.game.enemies.length; i++) {
    Bastards.game.enemies[i].shape = new Kinetic.Rect({
      x: Bastards.game.enemies[i].x,
      y: Bastards.game.enemies[i].y,
      width: 5,
      height: 5,
      fill: '#f00',
      stroke: 'black',
      strokeWidth: 0
    });

    layer_ships.add(Bastards.game.enemies[i].shape);

    Bastards.game.enemies[i].label = new Kinetic.Text({
      x: Bastards.game.enemies[i].x + 10,
      y: Bastards.game.enemies[i].y - 5,
      text: Bastards.game.enemies[i].name,
      fill: '#c00',
      fontFamily: 'arial',
      shadowColor: '#f00',
      shadowBlur: 10,
      shadowOffset: 0,
      shadowOpacity: 1
    });

    layer_ships.add(Bastards.game.enemies[i].label);
  }
  
  // add the hawk
  Bastards.game.my_ship.shape = new Kinetic.Rect({
    x: Bastards.game.my_ship.x,
    y: Bastards.game.my_ship.y,
    width: 5,
    height: 5,
    fill: '#00cc00',
    stroke: 'black',
    strokeWidth: 0
  });

  Bastards.game.my_ship.label = new Kinetic.Text({
    x: Bastards.game.my_ship.x + 10,
    y: Bastards.game.my_ship.y - 5,
    text: Bastards.game.my_ship.name,
    fill: '#00cc00',
    fontFamily: 'arial',
    shadowColor: '#00ff00',
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
  
  layer_ships.add(Bastards.game.my_ship.shape);
  layer_ships.add(Bastards.game.my_ship.label);
  
  Bastards.game.stage.add(layer_stars);
  Bastards.game.stage.add(layer_ships);
  Bastards.game.stage.add(layer_message);
  
  /**
   * Add some controls
   */
  $('#hitShip').on('click', function() {
    Bastards.game.my_ship.hit(Bastards.game.enemies[Bastards.game.dice(Bastards.game.enemies.length)], 0);
  });
  
  $('#hitSomeone').on('click', function () {
    Bastards.game.my_ship.crew[game.dice(Bastards.game.my_ship.crew.length)].hit(30);
  });
  
  $('#fireLaser').on('click', function () {
    Bastards.game.enemies[Bastards.game.dice(Bastards.game.enemies.length)].hit(Bastards.game.my_ship, 0);
  });
  
  $('#fireMissile').on('click', function () {
    Bastards.game.enemies[Bastards.game.dice(Bastards.game.enemies.length)].hit(Bastards.game.my_ship, 1);
  });
  
  $('#doWarp').on('click', function () {
    Bastards.game.my_ship.warp();
  });
  
  $('.pauseBtn').on('click', function () {
    Bastards.game.playPause();
  });
  
  $('.goRefresh').on('click', function() {
    window.refresh();
  });

  $('.dial').knob({
    min: 0,
    max: 100,
    step: 1,
    angleOffset: 225,
    angleArc: 270,
    width: 90,
    height: 90,
    // displayInput: false,
    thickness: .3,
    fgColor: '#e70',
    bgColor: '#3d1c00',
    // skin: 'tron',
    // lineCap: 'round',
    font: '"digital7"'
  });
  
  $(window).resize(function () {
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  });
  
  /**
   * Add keyboard shortcuts
   */
  $(document).keydown(function (e) {
    var keyCode = e.keyCode || e.which;

    switch (keyCode) {
      case 80: // P - Pause
        Bastards.game.playPause();
        break;
      case 76: // L - Laser
        Bastards.game.enemies[game.dice(Bastards.game.enemies.length)].hit(Bastards.game.my_ship, 0);
        break;
      case 77: // M - Missile
        Bastards.game.enemies[game.dice(Bastards.game.enemies.length)].hit(Bastards.game.my_ship, 1);
        break;
      case 87: // W - Warp
        Bastards.game.my_ship.warp();
        break;
    }
  });
});
