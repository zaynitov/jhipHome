package com.cars.app.repository;

import com.cars.app.domain.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the Author entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
/*

    @Query("select u from author u where u.name like %:query%")
    Optional<Author> findByFirstnameEndsWith(String query);*/


/*
    @Query("select d from Author d where " +
        "(:query is null or d.name like  %:query% )")
    List<Author> findAll(@Param("query") String query);
*/


/*
    @Modifying
    @Query("update Author u set u.name = concat(u.name,'1') ")
    void addOneLetterToEnd();*/
}
