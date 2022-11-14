package com.vnua.hieu.service;

import com.vnua.hieu.entity.PayLevel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PayLevelService {

    public List<PayLevel> findAll();

    public PayLevel saveOrUpdate(PayLevel payLevel);

    public void delete(Long id);

}
