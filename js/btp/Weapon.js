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
  this.ammo = 0,
  this.ammo_type = 'laser',
  this.power_used = 1,
  this.missiles_used = 0,
  this.rounds_per_shot = 1,
  this.blocked_by = {
    shield: true
  };
  $.extend(this, options);
};

Weapon.prototype.toString = function () {
  return this.name;
};

Weapon.prototype.fire = function () {
  console.log('fire');
  console.log(this.ammo);
  console.log(this.rounds_per_shot);
  if (this.ammo >= this.rounds_per_shot) {
    this.ammo = this.ammo - this.rounds_per_shot;
    console.log(this.ammo);
    return true;
  } else {
    return false;
  }
};
