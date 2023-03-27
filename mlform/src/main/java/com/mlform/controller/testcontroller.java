package com.mlform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class testcontroller {

    @RequestMapping("/")
    public String welco() {
        return "welcome";
    }

    @ResponseBody
    @GetMapping("/hello")
    public String hello(Integer id) {
        return "检测到参数id="+id;
    }
}
