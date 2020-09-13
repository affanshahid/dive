package com.affanshahid.dive.runners.stream.readers;

import java.io.IOException;
import java.util.List;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import com.affanshahid.dive.runners.ViewData;
import com.affanshahid.dive.runners.stream.DataRow;
import com.affanshahid.dive.runners.stream.RunnerNode;
import com.affanshahid.dive.workflow.readers.JSONReader;
import com.fasterxml.jackson.jr.ob.JSON;
import com.fasterxml.jackson.jr.ob.JSONObjectException;

public class JSONReaderRunner extends RunnerNode<JSONReader> {
    public JSONReaderRunner(JSONReader node) {
        super(node);
    }

    @Override
    protected Stream<DataRow> createOutputStream(int portIndex, List<Stream<DataRow>> inputs)
            throws JSONObjectException, IOException {
        var it = JSON.std.beanSequenceFrom(DataRow.class, getNode().getConfig().getSource());
        return StreamSupport.stream(Spliterators.spliteratorUnknownSize(it, Spliterator.ORDERED), false);
    }

    @Override
    protected ViewData<?> createViewData(int viewIndex, List<Stream<DataRow>> inputs) throws Exception {
        throw new UnsupportedOperationException("No views in JSONReader");
    }
}
