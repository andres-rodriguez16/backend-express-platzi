const jwt = require('jsonwebtoken');
const secret = 'myCat';

const payload = {
  sub: 1,
  role: 'customer',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4NzQ5NDIzOX0.U_m2WJqcIX16UR2i0G9d-WW5_Nvxhw8ChM0JYSp8ODE';
function verifyToken(secret, token) {
  return jwt.verify(token, secret);
}

console.log(verifyToken(secret, token));
