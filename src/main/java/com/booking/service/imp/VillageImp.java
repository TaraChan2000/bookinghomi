package com.booking.service.imp;

import com.booking.service.VillageService;
import com.booking.entity.Village;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VillageImp implements VillageService {
    @Override
    public Village save(Village village) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public List<Village> findAll() {
        return null;
    }

    @Override
    public List<String> search(String param) {
        return null;
    }
}
