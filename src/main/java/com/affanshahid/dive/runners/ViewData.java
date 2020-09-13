package com.affanshahid.dive.runners;

import com.affanshahid.dive.workflow.View;

public class ViewData<T> {
    private View<T> view;
    private T data;

    public ViewData() {
    }

    public ViewData(View<T> view, T data) {
        this.view = view;
        this.data = data;
    }

    public View<T> getView() {
        return view;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public void setView(View<T> view) {
        this.view = view;
    }
}