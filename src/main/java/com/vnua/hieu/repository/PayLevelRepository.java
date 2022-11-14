package com.vnua.hieu.repository;

import com.vnua.hieu.entity.PayLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PayLevelRepository extends JpaRepository<PayLevel, Long> {

    @Query(value = "select * from pay_level where amount = ?1",nativeQuery = true)
    public PayLevel findByAmount(Double amount);
}
