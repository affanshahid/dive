package com.affanshahid.dive.commons;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "resource not found")
public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 6537620830431405943L;

    public ResourceNotFoundException(String id) {
        super(String.format("no resource found with id '%s'", id));
    }
}