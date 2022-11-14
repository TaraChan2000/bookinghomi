package com.vnua.hieu.rest;

import com.vnua.hieu.entity.Utilities;
import com.vnua.hieu.repository.UtilitiesRepository;
import org.apache.tomcat.util.http.HeaderUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UtilitiesResouce {

    private final UtilitiesRepository utilitiesRepository;

    public UtilitiesResouce(UtilitiesRepository utilitiesRepository) {
        this.utilitiesRepository = utilitiesRepository;
    }

    @PostMapping("/admin/utilitis")
    public ResponseEntity<Utilities> createUtilities(@RequestBody Utilities utilities) throws URISyntaxException {
        utilities.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        Utilities result = utilitiesRepository.save(utilities);
        return ResponseEntity
                .created(new URI("/api/admin/saveutilities" + result.getId()))
                .body(result);
    }

    @GetMapping("/public/utilities")
    public List<Utilities> findAll(){
        return utilitiesRepository.findAll();
    }

    @GetMapping("/public/getUtilitiesById")
    public Utilities findById(@RequestParam("id") Long id){
        return utilitiesRepository.findById(id).get();
    }

    @GetMapping("/admin/deleteUtilitiesById")
    public ResponseEntity<Utilities> deleteById(@RequestParam("id") Long id) throws URISyntaxException {
        Utilities utilities = utilitiesRepository.findById(id).get();
        utilitiesRepository.delete(utilities);
        return ResponseEntity
                .created(new URI("/api/admin/saveutilities"+0L))
                .body(null);
    }
}
