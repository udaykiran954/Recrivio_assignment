package com.example.JavaAssignment.Digital.Library.Book.Management.System.Repository;

import com.example.JavaAssignment.Digital.Library.Book.Management.System.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
    Optional<Book> findByBookId(String bookId);
    List<Book> findByTitleContaining(String title);

}
