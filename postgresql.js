const express = require ('express')
const bodyParser = require('body-parser')
const pg = require('pg')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

var db = new pg.Client("postgres://iqmlbtuz:UpBMMZVnte8qQPV_sceZxKS8-E0iZ4F-@john.db.elephantsql.com/iqmlbtuz")
db.connect()

const sql_create = `CREATE TABLE IF NOT EXISTS Books (
    Book_ID SERIAL PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    Comments TEXT
  );`;

db.query(sql_create,[], (err, result)=>{
    if (err) throw err
    console.log(result)
})

const sql_insert = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
(1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
(2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
(3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne')
ON CONFLICT DO NOTHING;`;

db.query(sql_insert,[], (err, result)=>{
    if (err) throw err
    console.log(result)
})

app.get('/get', (req, res)=>{
    db.query('SELECT * FROM Books', (err, result)=>{
        if (err) throw err
        res.send(result)
    })
})

app.post('/get', (req, res)=>{
    const book = req.body
    db.query('INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES ($1, $2, $3, $4)',[book.id, book.title, book.author, book.comments], (err, result)=>{
        if (err) throw err
        res.send(result)
    })
})

app.post('/get/:id', (req, res)=>{
    const id = req.params.id
    const book = req.body
    db.query('UPDATE Books SET Title =$1, Author=$2, Comments=$3 WHERE (Book_ID=$4)',[book.title, book.author, book.comments, id], (err, result)=>{
        if (err) throw err
        res.send(result)
    })
})

app.delete('/get/:id', (req, res)=>{
    const id = req.params.id
    db.query('DELETE FROM Books WHERE (Book_ID=$1)',[id], (err, result)=>{
        if (err) throw err
        res.send(result)
    })
})

app.listen(3000, ()=>{
    console.log('listening to port 3000')
})