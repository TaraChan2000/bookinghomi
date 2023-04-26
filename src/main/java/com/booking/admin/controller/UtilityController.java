package com.booking.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UtilityController {

    @RequestMapping(value = {"/admin/utilities"}, method = RequestMethod.GET)
    public String getUtilityPage() {

        return "admin/utilities";
    }

    @RequestMapping(value = {"/admin/addUtilities"}, method = RequestMethod.GET)
    public String getAddUtilityPage() {

        return "admin/addUtilities";
    }
}
