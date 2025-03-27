package com.example.JavaAssignment.Digital.Library.Book.Management.System.Service;

import com.example.JavaAssignment.Digital.Library.Book.Management.System.Model.Book;
import com.example.JavaAssignment.Digital.Library.Book.Management.System.Repository.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class BookService {
    BookRepository repo;


    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public void Add(Book book) {
        repo.save(book);
    }

    public List<Book> GetBooks() {
        return repo.findAll();
    }

    public Optional<Book> getBookById(String bookId) {
        return repo.findByBookId(bookId);
    }

    public List<Book> searchByTitle(String title) {
        return repo.findByTitleContaining(title);
    }
    public Book updateBook(Long id, Book bookDetails) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setGenre(bookDetails.getGenre());
        book.setAvailability(bookDetails.isAvailability());
        return repo.save(book);
    }
    public void deleteBook(Long id) {
        repo.deleteById(id);
    }
}
