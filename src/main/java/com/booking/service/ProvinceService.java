package com.booking.service;

import com.booking.entity.Province;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProvinceService {

    public List<Province> findAll();

    public Province saveOrUpdate(Province province);

    public void delete(Long id);
}
