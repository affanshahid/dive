package com.affanshahid.dive.runners.stream.operators;

import java.util.List;
import java.util.stream.Stream;

import com.affanshahid.dive.runners.ViewData;
import com.affanshahid.dive.runners.stream.DataRow;
import com.affanshahid.dive.runners.stream.RunnerNode;
import com.affanshahid.dive.workflow.operators.Filter;

public class FilterRunner extends RunnerNode<Filter> {

    public FilterRunner(Filter node) {
        super(node);
    }

    @Override
    protected Stream<DataRow> createOutputStream(int portIndex, List<Stream<DataRow>> inputs) throws Exception {
        var dataStream = inputs.get(Filter.PORT_IN_DATA);

        if (portIndex == Filter.PORT_OUT_SELECTED) {
            return dataStream.filter(this::shouldSelect);
        } else {
            return dataStream.filter(row -> !shouldSelect(row));
        }
    }

    private boolean shouldSelect(DataRow row) {
        var val = row.get(getNode().getConfig().getFilterKey());
        var expectedVal = getNode().getConfig().getFilterValue();

        if (val == null && expectedVal == null)
            return true;

        if (val == null)
            return false;

        if (expectedVal == null)
            return false;

        return val.equals(expectedVal);
    }

    @Override
    protected ViewData<?> createViewData(int viewIndex, List<Stream<DataRow>> inputs) throws Exception {
        throw new UnsupportedOperationException("No views in Filter");
    }
}