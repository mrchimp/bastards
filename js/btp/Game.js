/**
 * The game itself.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
function Game(options) {
  'use strict';

  this.game = this;
  this.enemies = [];
  this.tick_rate = 3000;
  this.my_ship = '';
  this.ship_tmpl = '';
  this.paused = true;
  this.bar_width = 40;
  this.clock = null;

  if (options) {
    $.extend(this, options);
  }
  
  this.available_weapons = [
    {
      name: 'Laser',
      hull_damage: 10,
      crew_damage: 30,
      section_damage: 40,
      ammo_type: 'laser',
      rounds_per_shot: 2,
      ammo: 45,
      blocked_by: {
        shield: true
      }
    },
    {
      name: 'Missile',
      hull_damage: 30,
      crew_damage: 10,
      section_damage: 40,
      ammo_type: 'missile',
      rounds_per_shot: 1,
      ammo: 5,
      blocked_by: {
        shield: false
      }
    }
  ];

  // names from - http://www.rhetoricalramblings.com/robotname/index.html
  // more - http://www.seventhsanctum.com/generate.php?Genname=quickchar
  // even more - http://donjon.bin.sh/scifi/name/#terran_male
  this.available_names = [
    'Athogotubo',
    'Bokrazstlaz',
    'Dekephost',
    'Egubogurh',
    'Elz\'siggo',
    'Gar\'kegogo',
    'Gashot',
    'Gh-shu',
    'Glothacana',
    'Gne-dac',
    'Han\'yigothal',
    'Hatt',
    'Hog-kil',
    'Hort',
    'It-me',
    'Lia\'uateiq',
    'Moig',
    'Na-ha',
    'Nosh',
    'Ot-mi',
    'Othuglos',
    'Pholl',
    'Raihath',
    'Yske-chau',
    'Zhu-moa',
    'Maephua',
    'Math',
    'Mellolhu',
    'Minaloll',
    'Nath',
    'Oken'
  ];
}

Game.prototype.init = function () {
  var t = this;
};

Game.prototype.setShip = function (options) {
  'use strict';

  this.my_ship = new Ship(options);

  this.my_ship.addWeapon(Bastards.game.available_weapons[0]);
  this.my_ship.addWeapon(Bastards.game.available_weapons[1]);
};

Game.prototype.allDead = function () {
  for (x = 1; x < this.enemies.length; x++) {
    if (this.enemies[x].is_dead) {
      return true;
    }
  }
  return false;
};

Game.prototype.message = function (msg) {
  $('#messages').append(msg + '<br>');
  $('#messages').scrollTop($('#messages')[0].scrollHeight);
};

Game.prototype.dice = function(sides) {
  if (!sides) { sides = 6; }
  return Math.floor(Math.random() * sides);
};

Game.prototype.refreshScreen = function() {
  var x;

  $('#ships').html('');
  
  // display crew
  if (this.my_ship) {
    $('#ships').append(this.my_ship.toHtml());
    
    // set health colours
    for (x = 0; x < this.my_ship.crew.length; x++) {
      var hp = this.my_ship.crew[x].hp,
          max_hp = this.my_ship.crew[x].max_hp,
          dim = 70,
          color = '#' + this.makeHex((max_hp - hp), max_hp, dim) + this.makeHex(hp, max_hp, dim) + '00';
      
      $(".crew[data-name='" + this.my_ship.crew[x].name + "'] .hp").css({
        'color': color
      });
    }
  }
  
  if (this.enemies.length > 0) {
    for (x = 0; x < this.enemies.length; x++) {
      $('#ships').append(this.enemies[x].toHtml());
    }
  }
};

Game.prototype.addEnemy = function (options) {
  var enemy_ship = new Ship(options),
  fng;

  for (var x = 0; x < 3; x++) {
    fng = new CrewMember({
      name: this.available_names[Math.floor(Math.random() * this.available_names.length)]
    });
    
    fng.ship = enemy_ship;
    
    enemy_ship.addCrew(fng);
  }

  enemy_ship.addWeapon(Bastards.game.available_weapons[0]);
  enemy_ship.addWeapon(Bastards.game.available_weapons[1]);

  this.enemies.push(enemy_ship);
  this.message('A ship appears: ' + enemy_ship);
  this.refreshScreen();
};

Game.prototype.makeHex = function (num, max, dim) {
  if (!dim) {
    dim = 0;
  }
  if (!max) {
    max = 100;
  }
  
  max_color = 255 - dim;
  dec = Math.floor(((num / max) * max_color));
  
  if (dec > max_color) {
    dec = max_color;
  }
  
  hex = dec.toString(16);
  
  while (hex.length < 2) {
    hex = "0" + hex;
  }

  return hex;
};

Game.prototype.toString = function () {
  return 'Bastards, Thieves and Pirates Game';
};

Game.prototype.playPause = function () {
  if (this.paused) {
    this.paused = false;
    this.message('<br>### Resuming game... ###');
    
    window.gameClock = window.setInterval(function() {
      Bastards.game.tick();
    }, this.tick_rate);
    
    $('.pauseBtn').removeClass('paused');
  } else {
    this.paused = true;
    this.message('<br>### Game is paused! ###');
    
    window.clearInterval(gameClock);
    
    $('.pauseBtn').addClass('paused');
  }
};

Game.prototype.tick = function () {
  if (Math.random() > 0.7) {
    var aggressor = this.enemies[Rand.getInt(0,2)],
        rand_ship = Rand.getInt(0,3),
        target;

    if (rand_ship == 3) {
      target = this.my_ship;
    } else {
      target = this.enemies[rand_ship];
    }
    
    target.hit(aggressor, Rand.getInt(0,aggressor.weapons.length - 1));
  }
    
  // increment power
  for (var x = 0; x < Bastards.game.enemies.length; x++) {
    this.enemies[x].tick();
  }
};

Game.prototype.end = function (message) {
  $('#popover').html('<h1>GAME OVER</h1><p>' + message + '</p><p><a href="" class="goRestart">Play again?</a></p>').fadeIn(200);
};
