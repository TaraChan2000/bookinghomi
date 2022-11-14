package com.vnua.hieu.repository;

import com.vnua.hieu.entity.HistoryPay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HistoryPayRepository extends JpaRepository<HistoryPay,Long> {

    @Query(value = "select * from history_pay where orderId = ?1 and requestId = ?2", nativeQuery = true)
    public Optional<HistoryPay> findByOrderIDAndRequestId(String orderId, String requestId);

    @Query(value = "select sum(l.amount) from history_pay h inner join pay_level l on l.id= h.paylevel_id where month(h.payDate) = ?1 and year(h.payDate) = ?2",nativeQuery = true)
    public Double calStatiticsOnMonth(Integer month, Integer year);
}
