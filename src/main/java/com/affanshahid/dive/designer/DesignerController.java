package com.affanshahid.dive.designer;

import java.util.List;

import com.affanshahid.dive.designer.dto.DesignerNodeDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/api/designer")
public class DesignerController {
    @Autowired
    private DesignerService service;

    @GetMapping("/nodes")
    public List<DesignerNodeDTO> getNodes() {
        return service.getNodes();
    }
}