package com.booking.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AdminHomeController {
//this is controler file
    // this
    @RequestMapping(value = {"/admin/trang-chu","/admin"}, method = RequestMethod.GET)
    public String getHomePage() {

        return "admin/admin";
    }
}
