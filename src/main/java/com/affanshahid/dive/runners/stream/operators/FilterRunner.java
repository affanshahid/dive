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
        var fVal = getNode().getConfig().getFilterValue();

        if (val == null && fVal == null)
            return false;

        if (val == null)
            return true;

        if (fVal == null)
            return true;

        return !val.equals(fVal);
    }

    @Override
    protected ViewData<?> createViewData(int viewIndex, List<Stream<DataRow>> inputs) throws Exception {
        throw new UnsupportedOperationException("No views in Filter");
    }
}