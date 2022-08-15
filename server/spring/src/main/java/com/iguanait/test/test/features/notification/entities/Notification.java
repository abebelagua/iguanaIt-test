package com.iguanait.test.test.features.notification.entities;

import javax.persistence.*;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @Column(name = "id", columnDefinition = "SERIAL")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "one_signal_id")
    private String oneSignalId;

    @Column(name = "external_user_id")
    private String externalUserId = "";

    @Column(name = "tag_value")
    private String tagKey = "";

    @Column(name = "tag_key")
    private String tagValue = "";

    @Column(name = "message")
    private String message;

    @Column(name = "jsonbody")
    private String jsonBody;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOneSignalId() {
        return oneSignalId;
    }

    public void setOneSignalId(String oneSignalId) {
        this.oneSignalId = oneSignalId;
    }

    public String getExternalUserId() {
        return externalUserId;
    }

    public void setExternalUserId(String externalUserId) {
        this.externalUserId = externalUserId;
    }

    public String getTagKey() {
        return tagKey;
    }

    public void setTagKey(String tagKey) {
        this.tagKey = tagKey;
    }

    public String getTagValue() {
        return tagValue;
    }

    public void setTagValue(String tagValue) {
        this.tagValue = tagValue;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getJsonBody() {
        return jsonBody;
    }

    public void setJsonBody(String jsonBody) {
        this.jsonBody = jsonBody;
    }

    public Notification withId(Integer id) {
        this.setId(id);
        return this;
    }

    public Notification withOneSignalId(String oneSignalId) {
        this.setOneSignalId(oneSignalId);
        return this;
    }

    public Notification withExternalUserId(String externalUserId) {
        this.setExternalUserId(externalUserId);
        return this;
    }

    public Notification withTagKey(String tagKey) {
        this.setTagKey(tagKey);
        return this;
    }
    public Notification withTagValue(String tagValue) {
        this.setTagValue(tagValue);
        return this;
    }

    public Notification withMessage(String message) {
        this.setMessage(message);
        return this;
    }

    public Notification withJsonBody(String jsonBody) {
        this.setJsonBody(jsonBody);
        return this;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", oneSignalId='" + oneSignalId + '\'' +
                ", externalUserId='" + externalUserId + '\'' +
                ", message='" + message + '\'' +
                ", jsonBody='" + jsonBody + '\'' +
                '}';
    }
}

