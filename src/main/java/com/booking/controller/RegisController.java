package com.booking.controller;

import com.booking.repository.UserRepository;
import com.booking.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class RegisController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = {"/regis"}, method = RequestMethod.GET)
    public String getHomePage() {

        return "regis";
    }

    @RequestMapping(value = {"/keyactive"}, method = RequestMethod.GET)
    public String activeAccount(@RequestParam("key") String key) {
        Optional<User> user = userRepository.getUserByActivationKey(key);
        if(user.isPresent()){
            user.get().setActived(1);
            user.get().setActivation_key(null);
            userRepository.save(user.get());
        }
        return "redirect:login";
    }
}
