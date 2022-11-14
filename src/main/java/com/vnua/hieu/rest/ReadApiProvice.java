package com.vnua.hieu.rest;

import com.vnua.hieu.dto.Districts;
import com.vnua.hieu.dto.Province;
import com.vnua.hieu.dto.Wards;
import com.vnua.hieu.entity.Town;
import com.vnua.hieu.entity.Village;
import com.vnua.hieu.repository.ProvinceRepository;
import com.vnua.hieu.repository.TownRepository;
import com.vnua.hieu.repository.VillageRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class ReadApiProvice {

    private final ProvinceRepository provinceRepository;
    private final TownRepository townRepository;
    private final VillageRepository villageRepository;

    public ReadApiProvice(ProvinceRepository provinceRepository, TownRepository townRepository, VillageRepository villageRepository) {
        this.provinceRepository = provinceRepository;
        this.townRepository = townRepository;
        this.villageRepository = villageRepository;
    }

    @GetMapping("/callprovince")
    public void callApi(@RequestBody List<Province> list){

        for(Province p : list){

            com.vnua.hieu.entity.Province province = new com.vnua.hieu.entity.Province();
            province.setName(p.getName());
            provinceRepository.save(province);

            for(Districts d : p.getDistricts()){
                Town town = new Town();
                town.setName(d.getName());
                town.setProvince(province);
                townRepository.save(town);
                for(Wards w : d.getWards()){
                    Village village = new Village();
                    village.setName(w.getName());
                    village.setTown(town);
                    villageRepository.save(village);
                }
            }
        }

    }
}
