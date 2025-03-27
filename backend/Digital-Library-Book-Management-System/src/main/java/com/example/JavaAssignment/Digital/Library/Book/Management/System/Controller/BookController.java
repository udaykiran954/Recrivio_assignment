package com.example.JavaAssignment.Digital.Library.Book.Management.System.Controller;

import com.example.JavaAssignment.Digital.Library.Book.Management.System.Model.Book;
import com.example.JavaAssignment.Digital.Library.Book.Management.System.Service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@Controller
@RequestMapping("/library")
public class BookController {

    private BookService service;

    public BookController(BookService service) {

        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBook(@RequestBody Book book){
        if(book!=null){
            service.Add(book);
            return ResponseEntity.ok("book added successfully");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("failed to post the data");
    }

    @GetMapping("/allbooks")
    public ResponseEntity<List<Book>> getAllBooks(){
        List<Book> AllBooks = service.GetBooks();
        if(AllBooks.isEmpty())
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(AllBooks,HttpStatus.ACCEPTED);
    }

    @GetMapping("/getbookbyid/{bookId}")
    public ResponseEntity<Book> getBookById(@PathVariable String bookId) {
        return service.getBookById(bookId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getbook/{title}")
    public ResponseEntity<List<Book>> getBooksByTitle(@PathVariable String title){
        List<Book> books = service.searchByTitle(title);
        if(books.isEmpty())
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(books,HttpStatus.ACCEPTED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return ResponseEntity.ok(service.updateBook(id, bookDetails));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
        return ResponseEntity.ok().build();
    }


}
