package com.booking.service.imp;

import com.booking.entity.Province;
import com.booking.service.ProvinceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceImp implements ProvinceService {
    @Override
    public List<Province> findAll() {
        return null;
    }

    @Override
    public Province saveOrUpdate(Province province) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
