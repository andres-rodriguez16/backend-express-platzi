const bcript = require('bcrypt');

const password = 'qqsqsqsqs';
const hash = '$2b$10$9elweeds9H0kUluTtLnM4e29Ha.K5Hg3GbamuCO9bFAhK1r6HwQry';

async function has(hash, password) {
  const compare = await bcript.compare(password, hash);
  console.log(compare);
}

has(hash, password);
