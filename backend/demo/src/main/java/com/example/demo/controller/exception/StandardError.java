package com.example.demo.controller.exception;

public class StandardError {

    private Integer status;
    private String mgs;
    private Long timeStamp;


    public StandardError(Integer status, String mgs, Long timeStamp) {
        this.status = status;
        this.mgs = mgs;
        this.timeStamp = timeStamp;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMgs() {
        return mgs;
    }

    public void setMgs(String mgs) {
        this.mgs = mgs;
    }

    public Long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Long timeStamp) {
        this.timeStamp = timeStamp;
    }
}
