package com.vnua.hieu.service.imp;

import com.vnua.hieu.entity.HistorySearch;
import com.vnua.hieu.service.HistorySearchService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HistorySearchImp implements HistorySearchService {
    @Override
    public Page<HistorySearch> findByUserId(Long userId, Pageable pageable) {
        return null;
    }

    @Override
    public HistorySearch save(HistorySearch historySearch) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
