package com.affanshahid.dive.workflows;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "invalid tree")
public class ConversionException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ConversionException(Exception ex) {
        super("error while performing conversion", ex);
    }
}