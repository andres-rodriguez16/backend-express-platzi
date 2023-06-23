const bcript = require('bcrypt');

async function has(password) {
  const hash = await bcript.hash(password, 10);
  return hash;
}

module.exports = has;
