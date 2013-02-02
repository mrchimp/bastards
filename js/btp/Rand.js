/**
 * A bunch of random generators.
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */
var Rand = {
  getInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getColor: function(min, max, greyscale) {
    if (min > 255) min = 255;
    if (max > 255) max = 255;
    
    if (greyscale) {
      var bit = Rand.getInt(min, max).toString(16);
      if (bit.length == 1) { bit = '0'+bit; }
      return '#'+bit.repeat(3);
    } else {
      return '#'+String(Rand.getInt(min, max))+String(getRandomInt(min, max))+String(getRandomInt(min, max));
    }
  }
};
