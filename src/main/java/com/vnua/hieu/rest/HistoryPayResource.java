package com.vnua.hieu.rest;

import com.vnua.hieu.entity.HistoryPay;
import com.vnua.hieu.repository.HistoryPayRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class HistoryPayResource {

    private final HistoryPayRepository historyPayRepository;

    public HistoryPayResource(HistoryPayRepository historyPayRepository) {
        this.historyPayRepository = historyPayRepository;
    }

    @PostMapping("/admin/historypay")
    public List<HistoryPay> findAll(){
        return historyPayRepository.findAll();
    }


    @GetMapping("/admin/calMoneySixMonth")
    public List<String> getAmountSixMonth(){
        List<String> list = new ArrayList<>();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        String currunYear = timestamp.toString().split(" ")[0].split("-")[0];
        String currunMonth = timestamp.toString().split(" ")[0].split("-")[1];
        System.out.println("--- month: "+currunMonth);
        System.out.println("--- year: "+currunYear);
        Integer month = Integer.valueOf(currunMonth);
        Integer year = Integer.valueOf(currunYear);
        for(int i =0; i< 6; i++){
            Double money = historyPayRepository.calStatiticsOnMonth(month,year);
            if(money == null){
                money = 0D;
            }
            String str = month.toString()+","+money.toString();
            list.add(str);
            --month;
            if(month == 0){
                month = 12;
                --year;
            }
        }
        return list;
    }
}
