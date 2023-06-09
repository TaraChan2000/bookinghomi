package com.booking.repository;

import com.booking.entity.Utilities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilitiesRepository extends JpaRepository<Utilities, Long> {

    @Query(value = "select * from utilities where id = ?1",nativeQuery = true)
    public Optional<Utilities> findById(Long id);
}
