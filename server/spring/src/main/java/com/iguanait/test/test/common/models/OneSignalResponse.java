package com.iguanait.test.test.common.models;

public class OneSignalResponse {
    private String id;
    private Integer recipients;
    private Object external_id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getRecipients() {
        return recipients;
    }

    public void setRecipients(Integer recipients) {
        this.recipients = recipients;
    }

    public Object getExternal_id() {
        return external_id;
    }

    public void setExternal_id(Object external_id) {
        this.external_id = external_id;
    }
}
