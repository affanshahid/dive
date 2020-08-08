package com.affanshahid.dive.designer;

public class ConversionException extends RuntimeException {
    private static final long serialVersionUID = 7709685784612738635L;

    public ConversionException(Exception ex) {
        super("error while performing conversion: ", ex);
    }
}