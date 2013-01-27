/**
 * A ship's weapon.
 *
 * Natural Habitat: ship.weapons
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/

function Weapon(options) {
  this.name = '',
  this.hull_damage = 15,
  this.crew_damage = 15,
  this.section_damage = 30,
  this.ammo_type = 'laser',
  this.power_used = 1,
  this.missiles_used = 0,
  this.blocked_by = {
    shield: true
  };
  $.extend(this, options);
}

Weapon.prototype.toString = function () {
  return this.name;
}
