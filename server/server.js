const EXPRESS = require('express');
const _ = require('lodash')
const PORT = process.env.PORT || 3000;

var app = EXPRESS();

app.listen(PORT, () => {
  console.log(`Port: ${PORT}`)
});