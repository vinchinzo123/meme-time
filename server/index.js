const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const PORT = '3001';

const db = mysql.createPool({
  host: 'mysql_db',
  user: 'mysql_user',
  password: 'mysql_password',
  database: 'memes'
})


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get('/', (req, res) => {
  res.send('Hi There')
});

app.get('/get', (req, res) => {
  const SelectQuery = " SELECT * FROM memes";
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

app.post('/insert', (req, res) => {
  const memeName = req.body.setMemeName;
  const memeRating = req.body.setMemeRating;
  const InsertQuery = "INSERT INTO memes (meme_name, meme_rating) VALUES (?,?)";
  db.query(InsertQuery, [memeName, memeRating], (err, result) => {
    console.log(result);
  })
})

app.delete("/delete/:memeId", (req, res) => {
  const memeId = req.params.memeId;
  const DeleteQuery = "DELETE FROM memes WHERE id = ?";
  db.query(DeleteQuery, memeId, (err, result) => {
    if (err) console.log(err)
  })
})

app.put("/update/:memeId", (req, res) => {
  const meme = req.body.memeUpdate;
  const memeId = req.params.memeId;
  const UpdateQuery = "UPDATE memes SET memes = ? WHERE id = ?";
  db.query(UpdateQuery, [meme, memeId], ( err, result) => {
    if (err) console.log(err);
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})