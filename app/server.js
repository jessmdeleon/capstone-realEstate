const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));  // Serves files from the 'public' directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
