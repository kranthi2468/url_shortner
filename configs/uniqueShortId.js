const {nanoid} = require("nanoid");
module.exports = {
  generate: function() {
    return nanoid(6);
  }
};