package com.booking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class Forgetpassword {

    @RequestMapping(value = {"/forgetpassword"}, method = RequestMethod.GET)
    public String getHomePage() {

        return "forgetpassword";
    }
}
