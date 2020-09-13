package com.affanshahid.dive.runners.stream.outputs;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import com.affanshahid.dive.runners.ViewData;
import com.affanshahid.dive.runners.stream.DataRow;
import com.affanshahid.dive.runners.stream.RunnerNode;
import com.affanshahid.dive.workflow.View;
import com.affanshahid.dive.workflow.outputs.Logger;

public class LoggerRunner extends RunnerNode<Logger> {
    public LoggerRunner(Logger node) {
        super(node);
    }

    @Override
    protected Stream<DataRow> createOutputStream(int portIndex, List<Stream<DataRow>> inputs) throws Exception {
        throw new UnsupportedOperationException("No output ports in logger");
    }

    @Override
    protected ViewData<?> createViewData(int viewIndex, List<Stream<DataRow>> inputs) throws Exception {
        var lines = new ArrayList<String>();

        inputs.get(Logger.PORT_IN_DATA).forEach(row -> lines.add(row.toString()));

        @SuppressWarnings("unchecked")
        var view = (View<Logger.LogsData>) getNode().getView(viewIndex);
        var data = new Logger.LogsData();
        data.setLines(lines);

        return new ViewData<Logger.LogsData>(view, data);
    }
}