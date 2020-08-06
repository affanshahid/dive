package com.affanshahid.dive.runners.stream.outputs;

import java.util.List;
import java.util.stream.Stream;

import com.affanshahid.dive.runners.stream.DataRow;
import com.affanshahid.dive.runners.stream.RunnerNode;
import com.affanshahid.dive.workflow.outputs.Logger;

public class LoggerRunner extends RunnerNode<Logger> {
    public LoggerRunner(Logger node) {
        super(node);
    }

    @Override
    protected Stream<DataRow> createOutputStream(int portIndex, List<Stream<DataRow>> inputs) throws Exception {
        return inputs.get(Logger.PORT_IN_DATA).map(row -> {
            var r = new DataRow();
            r.put("OUT", row.toString());
            return r;
        });
    }

}