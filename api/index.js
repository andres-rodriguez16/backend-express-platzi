const express = require('express');
const routerApi = require('./routes/index');
var morgan = require('morgan');
const cors = require('cors');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middleweres/errorHandles');
const app = express();
const port = process.env.PORT | 3000;

// const whitelist = ['http://localhost:3000'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   },
// };
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
