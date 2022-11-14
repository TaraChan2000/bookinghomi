package com.vnua.hieu.service;

import com.vnua.hieu.entity.Utilities;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UtilitiesSerivice {

    public Utilities save(Utilities utilities);

    public List<Utilities> findAll();

    public void delete(Long id);

}
