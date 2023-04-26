package com.booking.rest;

import com.booking.entity.Province;
import com.booking.entity.Village;
import com.booking.repository.TownRepository;
import com.booking.dto.Districts;
import com.booking.dto.Wards;
import com.booking.entity.Town;
import com.booking.repository.ProvinceRepository;
import com.booking.repository.VillageRepository;
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
    public void callApi(@RequestBody List<com.booking.dto.Province> list){

        for(com.booking.dto.Province p : list){

            Province province = new Province();
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
