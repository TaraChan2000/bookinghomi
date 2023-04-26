package com.booking.rest;


import com.booking.entity.RequesBooking;
import com.booking.entity.User;
import com.booking.service.UserService;
import com.booking.repository.RequesBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RequesBookingRest {

    @Autowired
    private UserService userService;

    @Autowired
    private RequesBookingRepository requesBookingRepository;

    @GetMapping("/user/requestByUserNotOnwer")
    public List<RequesBooking> requestSuccessdByUser(@RequestParam("type") Integer type){
        User u = userService.getUserWithAuthority();
        return requesBookingRepository.requestSuccessdByUser(u.getId(), type);
    }

    @GetMapping("/user/requestByUserOnwer")
    public List<RequesBooking> requestByUserOnwer(@RequestParam("type") Integer type){
        User u = userService.getUserWithAuthority();
        return requesBookingRepository.requestByUserOnwer(u.getId(), type);
    }


    @GetMapping("/public/requestByRoom")
    public List<RequesBooking> requestByRoom(@RequestParam(value = "id") Long id){
        return requesBookingRepository.findByRoomAndDate(id,new Date(System.currentTimeMillis()));
    }

    @PostMapping("/user/AddrequestByUser")
    public Integer add(@RequestBody RequesBooking requesBooking) throws Exception {
        String now = new Date(System.currentTimeMillis()).toString();
        Date nowDate = Date.valueOf(now);
        System.out.println("now date: "+nowDate);
        if(requesBooking.getFromDate().before(nowDate) || requesBooking.getToDate().before(nowDate)
        || requesBooking.getFromDate().after(requesBooking.getToDate())){
            throw new Exception("invalid date");
        }
        if(requesBookingRepository.findByDateAndRoom(requesBooking.getFromDate(),
                requesBooking.getToDate(), requesBooking.getRoom().getId()).size() > 0){
            return 1;
        }
        User u = userService.getUserWithAuthority();
        System.out.println("user request: "+u);
        requesBooking.setUserReques(u);
        requesBooking.setConfirm(0);
        requesBooking.setCreatedDate(new Date(System.currentTimeMillis()));
        requesBookingRepository.save(requesBooking);
        return 0;
    }

    @PostMapping("/user/deleteRequest")
    public void requestCancel(@RequestParam Long id) throws Exception {
        User u = userService.getUserWithAuthority();
        RequesBooking requesBooking = requesBookingRepository.findById(id).get();
        if(requesBooking.getUserReques().getId() != u.getId()){
            throw new Exception("access deneid");
        }
        if(requesBooking.getConfirm() == 0){
            requesBookingRepository.delete(requesBooking);
            return;
        }
        else{
            throw new Exception("can't deleted");
        }
    }

    @PostMapping("/user/deleteRequestByOwner")
    public void deleteRequestByOwner(@RequestParam Long id) throws Exception {
        User u = userService.getUserWithAuthority();
        RequesBooking requesBooking = requesBookingRepository.findById(id).get();
        if(requesBooking.getRoom().getUser().getId() != u.getId()){
            throw new Exception("access deneid");
        }
        requesBookingRepository.delete(requesBooking);
    }

    @PostMapping("/user/Acceptrequest")
    public void Acceptrequest(@RequestParam Long id) throws Exception {
        User u = userService.getUserWithAuthority();
        RequesBooking requesBooking = requesBookingRepository.findById(id).get();
        if(requesBooking.getRoom().getUser().getId() != u.getId()){
            throw new Exception("access deneid");
        }
        requesBooking.setConfirm(1);
        requesBookingRepository.save(requesBooking);
    }
}
