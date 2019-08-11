const express = require('express');
const app = express();

const mysql   = require('mysql');
var con = mysql.createConnection({
 host : 'localhost',
 user : 'root',
 password : '',
 database : 'bookstores'
});

con.connect((err) => {
  if(err) {
      throw err;
  }
  console.log("Database connected successfully...");
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.listen('3000', () => {
  console.log("Server is up and running");
})

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send("Please enter a valid url");
})

// Get All Books

app.get('/api/books', (req, res) => {
    con.query("select * from books", (error, results) => {
     if (error) {
      throw error;
     }
     res.send(results);
    })
})

// Add new Book

app.post('/api/books', (req, res) => {
    const book = {
        book_title : req.body.book_title,
        book_author : req.body.book_author,
        book_published : req.body.book_published
    }
    con.query("insert into books SET ?", book, (error, results) => {
     if (error) {
      throw error;
     }
     res.send(results);
    })
})

// Get Book By Id

app.get('/api/book/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from books where id=" + id, (error, results) => {
     if (error) {
      throw error;
     }
     res.send(results);
    })
})

// Update Book

app.put('/api/book/:id', (req, res) => {
    const id = req.params.id;
    const book = {
        book_title : req.body.book_title,
        book_author : req.body.book_author,
        book_published : req.body.book_published
    }
    con.query("update books SET book_title = ?, book_author = ?,  book_published = ? where id = ?", [book.book_title, book.book_author, book.book_published, id], (error, results) => {
     if (error) {
      throw error;
     }
     res.send(results);
    })
})

// Delete Book

app.delete('/api/book/:id', (req, res) => {
    const id = req.params.id;
    con.query("delete from books where id = " + [id], (error, results) => {
     if (error) {
      throw error;
     }
     res.send("Book was deleted successfully...");
    })
})

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})