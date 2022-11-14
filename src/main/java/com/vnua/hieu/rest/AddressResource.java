package com.vnua.hieu.rest;

import com.vnua.hieu.dto.AddressDto;
import com.vnua.hieu.entity.Province;
import com.vnua.hieu.entity.Town;
import com.vnua.hieu.entity.Village;
import com.vnua.hieu.repository.ProvinceRepository;
import com.vnua.hieu.repository.TownRepository;
import com.vnua.hieu.repository.VillageRepository;
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
