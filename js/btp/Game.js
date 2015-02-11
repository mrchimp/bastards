/**
 * The game itself.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
var Game = Backbone.Model.extend({
  defaults: {
    game: this,
    tick_rate: 3000,
    paused: true,
    bar_width: 40,
    clock: null,
    space_width: 310,
    space_height: 250,
  },
  available_weapons: [{
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
  },{
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
  }],
  // names from - http://www.rhetoricalramblings.com/robotname/index.html
  // more - http://www.seventhsanctum.com/generate.php?Genname=quickchar
  // even more - http://donjon.bin.sh/scifi/name/#terran_male
  available_names: [
    'Athogotubo', 'Bokrazstlaz', 'Dekephost', 'Egubogurh',
    'Elz\'siggo', 'Gar\'kegogo', 'Gashot', 'Gh-shu',
    'Glothacana', 'Gne-dac', 'Han\'yigothal', 'Hatt', 'Hog-kil',
    'Hort', 'It-me', 'Lia\'uateiq', 'Moig', 'Na-ha', 'Nosh',
    'Ot-mi', 'Othuglos', 'Pholl', 'Raihath', 'Yske-chau',
    'Zhu-moa', 'Maephua', 'Math', 'Mellolhu', 'Minaloll',
    'Nath', 'Oken'
  ],
  getSpaceSize: function () {
  	var el = $('#space');

  	return {
  		x: el.width(),
  		y: el.height(),
  	};
  },
  initialize: function () {
    var t = this,
    		star_size = 3,
    		star, x, y, randcol;

    // Scaling canvas bug
		$('#space').attr("height",$('#space').height());
		$('#space').attr("width",$('#space').width());

    this.readouts_tmpl = _.template($('#readoutsTmpl').html());
    this.my_ship = '';
    this.enemies = [];

    // Create space -  Let there be light, etc...
    this.stage = new createjs.Stage('space');

    var star_container = new createjs.Container();
  
    // Create some stars
    for (i = 0; i < 500; i++) {
      var space_size = this.getSpaceSize();
      
      randcol = Rand.getColor(0, 180, true);
      star = new createjs.Shape();

      x = Rand.getInt(7, space_size.x - 7);
      y = Rand.getInt(7, space_size.y - 7);

      star.graphics
	      .beginFill(randcol)
	      .setStrokeStyle(1)
	      .beginStroke('#000000')
	      .drawRect(x, y, star_size, star_size);

      this.stage.addChild(star);
    }
  },
  setShip: function (options) {
    'use strict';

    this.my_ship = new Ship(options);
    this.my_ship.addWeapon(Bastards.game.available_weapons[0]);
    this.my_ship.addWeapon(Bastards.game.available_weapons[1]);
  },
  allDead: function () {
    for (x = 1; x < this.enemies.length; x++) {
      if (!this.enemies[x].is_dead) {
        return false;
      }
    }
    return true;
  },
  message: function (msg) {
    $('#messages').append(msg + '<br>');
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  },
  dice: function(sides) {
    if (!sides) { sides = 6; }
    return Math.floor(Math.random() * sides);
  },
  refreshScreen: function() {
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

      var total_missiles = 0;

      _.each(this.my_ship.weapons, function (weapon) {
        if (weapon.get('ammo_type') === 'missile') {
          total_missiles += weapon.get('ammo');
        }
      });

      $('#readouts').html(this.readouts_tmpl({
        unused_power: '?', // @todo
        hull: this.my_ship.get('hull'),
        weapons: '?',
        missiles: total_missiles,
        oxygen: this.my_ship.get('oxygen'),
        medical: '?',
      }));

      _.each(this.my_ship.power, function (value, name) {
        $('.dial[name=' + name + ']').val(value);
      });

      $('.dial').trigger('change');
    }
    
    if (this.enemies.length > 0) {
      for (x = 0; x < this.enemies.length; x++) {
        $('#ships').append(this.enemies[x].toHtml());
      }
    }
  },
  addEnemy: function (options) {
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
  },
  makeHex: function (num, max, dim) {
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
  },
  toString: function () {
    return 'Bastards, Thieves and Pirates Game';
  },
  playPause: function () {
    if (this.paused) {
      this.paused = false;
      this.message('<br>### Resuming game... ###');
      
      window.gameClock = window.setInterval(function() {
        Bastards.game.tick();
      }, this.get('tick_rate'));
      
      $('.pauseBtn').removeClass('paused');
    } else {
      this.paused = true;
      this.message('<br>### Game is paused! ###');
      
      window.clearInterval(window.gameClock);
      
      $('.pauseBtn').addClass('paused');
    }
  },
  tick: function () {
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
  },
  end: function (message) {
    $('#popover').html('<h1>GAME OVER</h1><p>' + message + '</p><p><a href="" class="goRestart">Play again?</a></p>').fadeIn(200);
  }
});
