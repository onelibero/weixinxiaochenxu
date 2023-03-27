package com.mlform.entity;

import lombok.Data;

@Data
public class Report {
    private Integer id;
    private Integer message_id;
    private String uid;
    private String content;

    public Report(Integer message_id, String uid, String content) {
        this.message_id=message_id;
        this.uid=uid;
        this.content=content;
    }
}
