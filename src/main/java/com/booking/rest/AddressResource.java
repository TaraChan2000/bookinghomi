package com.booking.rest;

import com.booking.entity.Village;
import com.booking.repository.TownRepository;
import com.booking.entity.Province;
import com.booking.entity.Town;
import com.booking.repository.ProvinceRepository;
import com.booking.repository.VillageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AddressResource {
    private final ProvinceRepository provinceRepository;
    private final TownRepository townRepository;
    private final VillageRepository villageRepository;

    public AddressResource(ProvinceRepository provinceRepository, TownRepository townRepository, VillageRepository villageRepository) {
        this.provinceRepository = provinceRepository;
        this.townRepository = townRepository;
        this.villageRepository = villageRepository;
    }

    @GetMapping("/public/province")
    public List<Province> findAllProvince(){
        return provinceRepository.findAlls();
    }

    @GetMapping("/public/town")
    public List<Town> getTownByProvinceId(@RequestParam("id") Long id){
        return townRepository.findByProvinceId(id);
    }

    @GetMapping("/public/village")
    public List<Village> getVillageByTownId(@RequestParam("id") Long id){
        return villageRepository.findByTownId(id);
    }


}
