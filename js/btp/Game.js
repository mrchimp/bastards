/**
 * The game itself.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
function Game(options) {
  this.game = this;
  this.enemies = [];
  this.my_ship = '';
  this.ship_tmpl = '';
  this.paused = false;
  this.bar_width = 40;
  this.clock = null;
  if (options) {
    $.extend(this, options);
  }
  this.available_weapons = [
    {
      name: 'Basic Laser',
      hull_damage: 10,
      crew_damage: 30,
      section_damage: 20,
      ammo_type: 'laser',
      rounds_per_shot: 1,
      ammo: 30,
      blocked_by: {
        shield: true
      }
    },
    {
      name: 'Missile Launcher',
      hull_damage: 30,
      crew_damage: 10,
      section_damage: 20,
      ammo_type: 'missile',
      rounds_per_shot: 1,
      ammo: 3,
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

Game.prototype.message = function (msg) {
  $('#messages').append(msg+'<br>');
  $('#messages').scrollTop($('#messages')[0].scrollHeight);
};

Game.prototype.dice = function(sides) {
  if (!sides) { sides = 6; }
  return Math.floor(Math.random() * sides);
};

Game.prototype.refreshScreen = function() {
  $('#ships').html('');
  
  // display crew
  if (this.my_ship) {
    $('#ships').append(this.my_ship.toHtml());
    
    // set health colours
    for (var x = 0; x < this.my_ship.crew.length; x++) {
      hp = this.my_ship.crew[x].hp
      max_hp = this.my_ship.crew[x].max_hp
      dim = 70;
      color = '#'+this.makeHex((max_hp - hp), max_hp, dim)+this.makeHex(hp, max_hp, dim)+'00';    
      $(".crew[data-name='"+this.my_ship.crew[x].name+"'] .hp").css({
        'color': color
      });
    }
  }
  
  if (this.enemies.length > 0) {
    for (var x = 0; x < this.enemies.length; x++) {
      $('#ships').append(this.enemies[x].toHtml());
    }
  }
};

Game.prototype.addEnemy = function (options) {
  var enemy = new Ship(options);
  for (var x = 0; x < 3; x++) {
    enemy.addCrew({
      name: this.available_names[Math.floor(Math.random() * this.available_names.length)]
    });
  }
  this.enemies.push(enemy);
  this.message('A ship appears: '+enemy);
  this.refreshScreen();
};

Game.prototype.makeHex = function (num, max, dim) {
  if (!dim) { dim = 0 }
  if (!max) { max = 100 }
  max_color = 255 - dim;
  dec = Math.floor(((num / max) * max_color));
  if (dec > max_color) { dec = max_color; }
  hex = dec.toString(16);
  
  while (hex.length < 2) {
    hex = "0" + hex;
  }

  return hex;
};

Game.prototype.toString = function () {
  return 'Bastards Thieves and Pirates Game';
};

Game.prototype.play = function () {
  this.paused = false;
  this.clock = window.setInterval(function() { game.tick() }, 1500);
};

Game.prototype.pause = function () {
  console.log('clicked');
  if (this.paused) {
    this.paused = false;
    window.clearInterval(this.clock);
  } else {
    this.paused = true;
    this.play();
  }
};

Game.prototype.tick = function () {
  //console.log('tick');
  var aggressor = game.enemies[Rand.getInt(0,2)];
  var rand_ship = Rand.getInt(0,3);
  
  if (rand_ship == 3) {
    var target = game.my_ship;
  } else {
    var target = this.enemies[rand_ship];
  }
  target.hit(aggressor, Rand.getInt(0,aggressor.weapons.length - 1))
  
  
};

Game.prototype.end = function (message) {
  $('#popover').html('<h1>GAME OVER</h1><p>'+message+'</p><p><a href="" class="goRestart">Play again?</a></p>').fadeIn(200);
}