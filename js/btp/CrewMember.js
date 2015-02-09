/**
 * A crew member aboard a ship.
 *
 * Natural habitat: ship.crew
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
var CrewMember = Backbone.Model.extend({
  defaults: {
    name:           'Unknown Soldier',
    race:           'human',
    repair_factor:  1,
    walk_speed:     1,
    color:          '#900',
    max_hp:         100,
    hp:             100,
    is_alive:       true,
    display: {
      hp: function () {
        return (this.hp / this.max_hp) * Bastards.game.bar_width;
      }
    } 
  },
  hit: function (damage) {
    if (!this.get('is_alive')) { 
      Bastards.game.message(this.get('name') + ' is already dead.');
      return false;
    }
    
    this.set('hp', this.get('hp') - damage);
    
    Bastards.game.refreshScreen();
    Bastards.game.message(this.get('name') + ' hit: <span class="' + (this.ship.get('affiliation') == 'friend' ? 'bad' : 'good') + '">-' + damage + ' hp</span>');
    
    if (this.get('hp') < 1) {
      this.set('hp', 0);
      this.kill(); 
    }
    
    return damage;
  },
  kill: function () {
    if (!this.get('is_alive')) { 
      Bastards.game.message(this.get('name') + ' is already dead.');
      return false;
    }
    
    this.set('is_alive', false);
    
    Bastards.game.message(this.get('name') + ' died!');
    Bastards.game.refreshScreen();
  },
  toString: function () {
    return this.get('name');
  },
  tick: function () {
    if (this.get('hp') < this.get('max_hp')) {
      this.set('hp', this.get('hp') + 1);
    }
  }
});

