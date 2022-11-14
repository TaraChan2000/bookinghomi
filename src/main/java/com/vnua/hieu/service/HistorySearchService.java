package com.vnua.hieu.service;

import com.vnua.hieu.entity.HistorySearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface HistorySearchService {

    public Page<HistorySearch> findByUserId(Long userId, Pageable pageable);

    public HistorySearch save(HistorySearch historySearch);

    public void delete(Long id);


}
