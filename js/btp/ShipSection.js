/**
 * A section of a ship.
 * 
 * Natural Habitat: ship.sections
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */
function ShipSection(options) {
  'use strict';

  this.name =         'Corridor'; // required
  this.type =         'corridor';
  this.hp =           100;
  this.display_name = ''; // required
  this.max_power =    '';
  this.steps =        1;
  this.isManned =     false;
  this.ship =         '';
  this.display = {
    hp: function () {
      return ( this.hp / 100 ) * Bastards.game.bar_width;
    }
  };
  $.extend(this, options);
}

ShipSection.prototype.hit = function (damage) {
  Bastards.game.message(this.ship + ' ' + this + ' hit: ' + '<span class="' + (this.ship.affiliation == 'friend' ? 'bad' : 'good') + '">-' + damage + ' hp</span>');
  this.hp -= damage;
  if (this.hp < 1) {
    this.hp = 0;
  }
  return damage;
};

ShipSection.prototype.toString = function () {
  return this.name;
};
