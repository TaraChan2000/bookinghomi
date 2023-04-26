package com.booking.service;

import com.booking.entity.Utilities;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UtilitiesSerivice {

    public Utilities save(Utilities utilities);

    public List<Utilities> findAll();

    public void delete(Long id);

}
