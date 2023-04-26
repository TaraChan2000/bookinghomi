package com.booking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class RequestController {

    @RequestMapping(value = {"/myrequest"}, method = RequestMethod.GET)
    public String getHomePage() {
        return "myrequest";
    }

    @RequestMapping(value = {"/userrequest"}, method = RequestMethod.GET)
    public String userrequest() {
        return "userRequest";
    }
}
