package com.mlform.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Notification {
    private Integer id;
    private String uid;
    private String reviewer_uid;
    private User reviewer_user;
    private Integer message_id;
    private Integer type;
    private String content;
    private Date time;
    private Integer isread;

    public Notification(String uid,String reviewer_uid,Integer message_id,Integer type,String content){

        this.uid=uid;
        this.reviewer_uid=reviewer_uid;
        this.message_id=message_id;
        this.type=type;
        this.content=content;
        this.time=new Date();
    }
    public Notification(){

    }
}
