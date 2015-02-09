/**
 * A ship's weapon.
 *
 * Natural Habitat: ship.weapons
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
var Weapon = Backbone.Model.extend({
  defaults: {
    name: '',
    hull_damage: 15,
    crew_damage: 15,
    section_damage: 30,
    ammo: 0,
    ammo_type: 'laser',
    power_used: 1,
    missiles_used: 0,
    rounds_per_shot: 1,
    blocked_by: {
      shield: true
    }
  },
  initialize: function () {
    this.ship = '';
  },
  toString: function () {
    return this.get('name');
  },
  fire: function (target) {
    var response = {
      success: true,
      msg: ''
    };

    switch (this.get('ammo_type')) {
      case 'laser':
        if (this.ship.get('power') <= 1) {
          response.msg = 'Not enough power to use laser!';
          response.success = false;

          return response;
        } else {
          this.ship.set('power', this.ship.get('power') - this.get('power_used'));
        }

        break;
      case 'missile':
        if (this.get('ammo') < this.get('rounds_per_shot')) {
          response.msg = 'Not enough ammo!';
          response.success = false;

          return response;
        }

        this.set('ammo', this.get('ammo') - this.get('rounds_per_shot'));

        response.success = true;

        break;
      default:
        throw 'Invalid ammo type: ' + this.get('ammo_type');
    }

    return response;
  }
});
