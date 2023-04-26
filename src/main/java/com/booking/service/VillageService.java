package com.booking.service;

import com.booking.entity.Village;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VillageService {

    public Village save(Village village);

    public void delete(Long id);

    public List<Village> findAll();

    public List<String> search(String param);

}
