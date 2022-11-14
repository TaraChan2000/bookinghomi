package com.vnua.hieu.service.imp;

import com.vnua.hieu.service.HistoryPayService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class HistoryPayImp implements HistoryPayService {
    @Override
    public HistoryPayService save(HistoryPayService historyPay) {
        return null;
    }

    @Override
    public Page<HistoryPayService> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<HistoryPayService> findByUserId(Long userId) {
        return null;
    }

    @Override
    public Page<HistoryPayService> findByBetweenDate(Date startDate, Date endDate, Pageable pageable) {
        return null;
    }
}
