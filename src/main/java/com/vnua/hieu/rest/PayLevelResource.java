package com.vnua.hieu.rest;

import com.vnua.hieu.entity.PayLevel;
import com.vnua.hieu.repository.PayLevelRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PayLevelResource {

    private final PayLevelRepository payLevelRepository;

    public PayLevelResource(PayLevelRepository payLevelRepository) {
        this.payLevelRepository = payLevelRepository;
    }

    @GetMapping("/public/paylevel")
    public List<PayLevel> findAll(){
        return payLevelRepository.findAll();
    }

    @PostMapping("/admin/savePayLevel")
    public ResponseEntity<PayLevel> save(@RequestBody PayLevel payLevel) throws URISyntaxException {
        PayLevel result = payLevelRepository.save(payLevel);
        return ResponseEntity
                .created(new URI("/api/admin/saveutilities" + result.getId()))
                .body(result);
    }

    @GetMapping("/admin/deletePayLevelById")
    public void deleteById(@RequestParam("id") Long id){
        payLevelRepository.deleteById(id);
    }

    @GetMapping("/public/findPayLevelById")
    public PayLevel findById(@RequestParam("id") Long id){
        return payLevelRepository.findById(id).get();
    }
}
