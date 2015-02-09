/**
 * A section of a ship.
 * 
 * Natural Habitat: ship.sections
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */
var ShipSection = Backbone.Model.extend({
  defaults: {
    name:         'Corridor', // required
    type:         'corridor',
    hp:           100,
    display_name: '', // required
    max_power:    '',
    steps:        1,
    isManned:     false,
  },
  ship: '',
  getHp: function () {
    return ( this.get('hp') / 100 ) * Bastards.game.bar_width;
  },
  hit: function (damage) {
    Bastards.game.message(this.ship.get('name') + ' ' + this.get('name') + ' hit: ' + '<span class="' + (this.ship.get('affiliation') == 'friend' ? 'bad' : 'good') + '">-' + damage + ' hp</span>');
    
    this.set('hp', this.get('hp') - damage);
    
    if (this.get('hp') < 1) {
      this.set('hp', 0);
    }
    
    return damage;
  },
  toString: function () {
    return this.get('name');
  }
});

