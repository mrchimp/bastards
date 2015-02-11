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

  Bastards.game.setShip({
    name: 'The Heavy Hawk',
    type: 'default',
    tmpl: $('#shipTmpl').html(),
    affiliation: 'friend',
    x: Rand.getInt(30, Bastards.game.get('space_width') - 60),
    y: Rand.getInt(30, Bastards.game.get('space_height') - 10),
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
    x: Rand.getInt(30, Bastards.game.get('space_width') - 10),
    y: Rand.getInt(30, Bastards.game.get('space_height') - 10)
  });

  Bastards.game.addEnemy({
    name: 'Thieves',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30, Bastards.game.get('space_width') - 10),
    y: Rand.getInt(30, Bastards.game.get('space_height') - 10)
  });

  Bastards.game.addEnemy({
    name: 'Pirates',
    tmpl: $('#shipTmpl').html(),
    x: Rand.getInt(30, Bastards.game.get('space_width') - 10),
    y: Rand.getInt(30, Bastards.game.get('space_height') - 10)
  });

  
  // Create some layers
  var layer_ships = new createjs.Container();
  var layer_message = new createjs.Container();
  
    // {
    //   x: Rand.getInt(7, Bastards.game.get('space_width') - 7),
    //   y: Rand.getInt(7, Bastards.game.get('space_height') - 7),
    //   width: 3,
    //   height: 3,
    //   fill: randcol,
    //   stroke: 'black',
    //   strokeWidth: 0
    // });

    // layer_stars.addChild(star);
  // }
  
  // show enemy ships on canvas
  // for (i = 0; i < Bastards.game.enemies.length; i++) {
    // Bastards.game.enemies[i].shape = new Kinetic.Rect({
    //   x: Bastards.game.enemies[i].get('x'),
    //   y: Bastards.game.enemies[i].get('y'),
    //   width: 5,
    //   height: 5,
    //   fill: '#f00',
    //   stroke: 'black',
    //   strokeWidth: 0
    // });

    // layer_ships.add(Bastards.game.enemies[i].shape);

    // Bastards.game.enemies[i].label = new Kinetic.Text({
    //   x: Bastards.game.enemies[i].get('x') + 10,
    //   y: Bastards.game.enemies[i].get('y') - 5,
    //   text: Bastards.game.enemies[i].get('name'),
    //   fill: '#c00',
    //   fontFamily: 'arial',
    //   shadowColor: '#f00',
    //   shadowBlur: 10,
    //   shadowOffset: 0,
    //   shadowOpacity: 1
    // });

    // layer_ships.add(Bastards.game.enemies[i].label);
  // }

  // add the hawk
  // Bastards.game.my_ship.shape = new createjs.Shape();
  // Bastards.game.my_ship.shape.graphics
  //   .beginFill('#00cc00')
  //   .drawRectangle(Bastards.game.my_ship.get('x'), Bastards.game.my_ship.get('y'), 5, 5);

  // ({
  //   x: Bastards.game.my_ship.get('x'),
  //   y: Bastards.game.my_ship.get('y'),
  //   width: 5,
  //   height: 5,
  //   fill: '#00cc00',
  //   stroke: 'black',
  //   strokeWidth: 0
  // });

  Bastards.game.my_ship.label = new createjs.Text(Bastards.game.my_ship.get('name'), '10px arial', '#00cc00');
  Bastards.game.my_ship.label.x = Bastards.game.my_ship.get('x') + 10;
  Bastards.game.my_ship.label.y = Bastards.game.my_ship.get('y') - 5;

  // Kinetic.Text({
  //   x: Bastards.game.my_ship.get('x') + 10,
  //   y: Bastards.game.my_ship.get('y') - 5,
  //   text: Bastards.game.my_ship.get('name'),
  //   fill: '#00cc00',
  //   fontFamily: 'arial',
  //   shadowColor: '#00ff00',
  //   shadowBlur: 10,
  //   shadowOffset: 0,
  //   shadowOpacity: 1
  // });
  
  // Set up message output
  // var message = new Kinetic.Text({
  //   x: 10,
  //   y: 10,
  //   text: '------',
  //   fontSize: 16,
  //   fontFamily: 'Courier New',
  //   fontWeight: 'bold',
  //   fill: 'green',
  //   opacity: 0
  // });

  // layer_message.add(message);
  
  // layer_ships.add(Bastards.game.my_ship.shape);
  // layer_ships.add(Bastards.game.my_ship.label);
  
  Bastards.game.stage.addChild(layer_ships);
  Bastards.game.stage.addChild(layer_message);

  Bastards.game.stage.update();

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
    thickness: 0.3,
    fgColor: '#e70',
    bgColor: '#3d1c00',
    font: '"digital7"'
  }).on('');

  _.each([
    'shield',
    'engine',
    'o2gen',
    'medical',
    'weapons'
  ], function (power_type) {
    $('.dial[name=' + power_type + ']').trigger('configure', {
      change: function (v) {
        Bastards.game.my_ship.setPower(power_type, v);
      }
    });
  });


  $('.dial').on('mousewheel keyup', function () {
    $(this).trigger('change');
    Bastards.game.my_ship.setPower($(this).attr('name'), $(this).val());
  });

  $('.dial-wrapper').on('mousewheel', function () {
    var dial = $(this).find('input');

    Bastards.game.my_ship.setPower(dial.attr('name'), dial.val());
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
