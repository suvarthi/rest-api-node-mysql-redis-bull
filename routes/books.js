const express = require('express');
const appRouter  = express.Router();

const con = require("../config/connection");

const bodyParser = require('body-parser');
appRouter.use(bodyParser.urlencoded({ extended : true }));
appRouter.use(bodyParser.json());


// Get All Books

appRouter.get('/books', (req, res) => {
    con.query("select * from books", (error, results) => {
     if (error) {
      throw error;
     }
     res.send(results);
    })
})

// Add new Book

appRouter.post('/books', (req, res) => {
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

appRouter.get('/book/:id', (req, res) => {
    const id = req.params.id;
    con.query("select * from books where id=" + id, (error, results) => {
     if (error) {
      throw error;
     }
     res.send(results);
    })
})

// Update Book

appRouter.put('/book/:id', (req, res) => {
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

appRouter.delete('/book/:id', (req, res) => {
    const id = req.params.id;
    con.query("delete from books where id = " + [id], (error, results) => {
     if (error) {
      throw error;
     }
     res.send("Book was deleted successfully...");
    })
})


module.exports = appRouter;