package com.affanshahid.dive.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SPAController {
    @GetMapping("/**/{path:[^\\.]*}")
    public String forward(HttpServletRequest request) {
        return "forward:/index.html";
    }
}
