package com.booking.service;

import com.booking.entity.Town;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TownService {

    public Town save(Town town);

    public List<Town> findAll();
}
