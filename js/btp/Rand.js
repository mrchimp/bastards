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
    if (greyscale) {
      return '#'+String(Rand.getInt(min, max)).repeat(3);
    } else {
      return '#'+String(Rand.getInt(min, max))+String(getRandomInt(min, max))+String(getRandomInt(min, max));
    }
  }
};