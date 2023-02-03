const express = require('express')
const path = require('path');
const noteData = require('../../../db/db.json');


const app = express()
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../../notes.html'))
  
);

app.get('/api/notes', (req, res) => {
res.json(noteData)
console.log(noteData)
}
);

app.get('*', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../../index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

