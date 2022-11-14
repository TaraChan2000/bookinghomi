package com.vnua.hieu.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public interface HistoryPayService {

    public HistoryPayService save(HistoryPayService historyPay);

    public Page<HistoryPayService> findAll(Pageable pageable);

    public List<HistoryPayService> findByUserId(Long userId);

    public Page<HistoryPayService> findByBetweenDate(Date startDate, Date endDate, Pageable pageable);
}
