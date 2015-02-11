/**
 * A ship.
 *
 * Natural habitat: game.my_ship and game.enemies
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */
var Ship = Backbone.Model.extend({
  defaults: {
    name:         'name',
    affiliation:  'enemy',
    power:        20,
    max_power:    100,
    missiles:     6,
    max_missiles: 20,
    fuel:         10,
    max_fuel:     50,
    oxygen:       100,
    hull:         20,
    max_hull:     100,
    type:         'default',
    tmpl:         '',
    x:            0,
    y:            0,
    is_dead:      false,
  },
  section_list: {},
  shipTypes: {
    'default': {
      max_hull: 100,
      section_list: [
        {
          'name': 'Shield',
          'type': 'shield'
        },
        {
          'name': 'Engine',
          'type': 'engine'
        },
        {
          'name': 'O2',
          'type': 'oxygen'
        },
        {
          'name': 'Medic',
          'type': 'medic'
        },
        {
          'name': 'Weapons',
          'type': 'weapons'
        },
        {
          'name': 'Bridge',
          'type': 'bridge'
        }
      ]
    }
  },
  display: {
    hull: function () { return (this.hull / this.max_hull) * Bastards.game.bar_width; },
    oxygen: function () { return (this.oxygen / 100) * Bastards.game.bar_width; },
    power: function () { return (this.power / this.max_power) * Bastards.game.bar_width; },
    missiles: function () { return (this.missiles / this.max_missiles) * Bastards.game.bar_width; },
    fuel: function () { return (this.fuel / this.max_fuel) * Bastards.game.bar_width; },
    warp: function () { return (this.warp / 100 * Bastards.game.bar_width); },
    bar_width: function () { return (Bastards.game.bar_width); },
    is_dead: function () { return (this.is_dead ? 'dead' : ''); }
  },
  initialize: function (options) {
    var ship_size = 3;

    $.extend(this, options);
    $.extend(this, this.shipTypes[options.type]);

    this.weapons = options.weapons || [];
    this.sections = options.sections || [];
    this.crew = options.crew || [];
    this.power = {
      shield: 20,
      engine: 20,
      o2gen: 20,
      medical: 20,
      weapons: 20
    };

    for (var x = 0; x < this.shipTypes[this.get('type')].section_list.length; x++) {
      this.addSection(this.shipTypes[this.get('type')].section_list[x]);
    }

    this.tmpl = _.template($('#shipTmpl').html());
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill((this.get('affiliation') === 'enemy' ? '#ff0000' : '#00cc00'))
      .drawCircle(this.get('x'), this.get('y'), ship_size)
      .setStrokeStyle(1)
      .beginStroke('#000000');
    Bastards.game.stage.addChild(this.shape);

    this.label = new createjs.Text(this.get('name'), '10px Arial', (this.get('affiliation') === 'enemy' ? '#ff0000' : '#00cc00'));
    this.label.x = this.get('x') + 10;
    this.label.y = this.get('y') - 5;
    Bastards.game.stage.addChild(this.label);

  },
  addCrew: function (fng) {
    this.crew.push(fng);
    
    //game.message(this.name+' +crew: '+options.name);
    Bastards.game.refreshScreen();
  },
  addSection: function (options) {
    var section = new ShipSection(options);
    section.ship = this;

    this.sections.push(section);
    
    Bastards.game.refreshScreen();
  },
  addWeapon: function (options) {
    var weapon = new Weapon(options);
    weapon.ship = this;
    this.weapons.push(weapon);
    Bastards.game.refreshScreen();
  },
  getSection: function(type) {
    return $.grep(this.sections, function(e){ return e.type == 'shield'; })[0];
  },
  hit: function (aggressor, weapon_index) {
    var weapon = aggressor.weapons[weapon_index];
    
    var impact = weapon.fire(this);

    Bastards.game.message(impact.msg);

    if (!impact.success) {
      return false;
    }

    Bastards.game.message('------------------------------------------');
    Bastards.game.message('<span class="' + aggressor.affiliation + '">' + aggressor + '</span> fires ' + aggressor.weapons[weapon_index] + ' at <span class="'+this.affiliation+'">' + this + '</span>!');
   
    // Do some evade stuff
    var engine = this.getSection('engine');
    var bridge = this.getSection('bridge');  
    var evade_chance = 0.5;
    
    // Do some shield stuff
    if (weapon.get('blocked_by').shield) {
      var shield = this.getSection('shield'),
          shield_factor;

      if (shield) {
        //game.message('Ship has a shield with '+ shield.hp +' hp');
        shield_factor = (weapon.hull_damage / 100) * shield.hp;
        Bastards.game.message('Shield: ' + shield.hp + 'hp, factor: ' + shield_factor); 
      } else {
        shield_factor = 0;
        //game.message('No shield.');
      }

      this.hull -= weapon.hull_damage;

      if (this.hull < 0) { 
        this.hull = 0; 
        this.die();
        return false;
      }
    }
    
    // Hit a crew member
    var random_crew = this.crew[Bastards.game.dice(this.crew.length)];
    var damage_done = random_crew.hit(weapon.get('crew_damage'));
    
    // Hit a section
    this.sections[Bastards.game.dice(this.sections.length)].hit(weapon.get('section_damage'));
    
    // Show some graphics
    // var explosion = new Kinetic.Circle({
    //   fill: '#f00',
    //   radius: 0,
    //   x: this.x,
    //   y: this.y
    // });

    Bastards.game.refreshScreen();
  },
  die: function () {
    this.is_dead = true;
    if (Bastards.game.my_ship.is_dead) {
      Bastards.game.end('Your ship exploded.');
    }
  },
  toHtml: function () {
    return this.tmpl(this);
  },
  toString: function () {
    return this.get('name');
  },
  warp: function () {
    var move_x = Rand.getInt(-10,10);
    var move_y = Rand.getInt(-10,10);

    this.set('x', this.get('x') + move_x);
    this.set('y', this.get('y') + move_x);
    this.shape.x = this.shape.x + move_x;
    this.shape.y = this.shape.y + move_y;
    this.label.x = this.label.x + move_x;
    this.label.y = this.label.y + move_y;
console.log(this.label);
    Bastards.game.stage.update();
    Bastards.game.message(this.name + ' warps: ' + move_x + ', ' + move_y);
  },
  tick: function () {
    for (var x = 0; x < this.crew.length; x++) {
      this.crew[x].tick();
    }
  },
  getUsedPower: function () {
    var power_used = 0;

    _.each(this.power, function (power) {
      power_used += power;
    });

    return power_used;
  },
  setPower: function (power_type, val) {
    var original_power = this.power[power_type];
    var power_used = 0;
    
    val = parseInt(val, 10);

    _.each(this.power, function (loop_power, loop_power_type) {
      if (loop_power_type !== power_type) {
        power_used += loop_power;
      }
    });

    power_used += val;


    if (power_used > this.get('max_power')) {
      Bastards.game.message('Not enough power!');
      window.setTimeout(function () {
        _.each(Bastards.game.my_ship.power, function (val, power_type) {
          $('.dial[name=' + power_type + ']').val(val).trigger('change');
        });
      }, 30);

      return original_power;
    }

    this.power[power_type] = val;

    $('.dial').trigger('change');
  }
});
