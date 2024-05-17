const express = require('express');
const app = express();
const PORT = 5002
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const hashedP = () => {
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
console.log(hash)
}

app.listen(PORT, () => {
    console.log(`API test running on port ${PORT}`);
  });
hashedP()