package com.booking.controller;

import com.booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = {"/","/trang-chu"}, method = RequestMethod.GET)
    public String getHomePage() {
//        User u = new User();
//        u.setPassword("admin");
//        u.setUsername("admin");
//        u.setActived(1);
//        userService.save(u);
        return "index";
    }
}
