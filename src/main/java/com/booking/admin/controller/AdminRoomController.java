package com.booking.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AdminRoomController {

    @RequestMapping(value = {"/admin/room"}, method = RequestMethod.GET)
    public String getHomePage() {

        return "admin/room";
    }
}
