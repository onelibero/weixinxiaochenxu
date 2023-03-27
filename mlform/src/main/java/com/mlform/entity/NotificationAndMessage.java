package com.mlform.entity;

import lombok.Data;

@Data
public class NotificationAndMessage {
    private Notification notification;
    private Integer message_id;
    private String imgurl;
    private String nickname;
    private String content;

    public NotificationAndMessage(Notification notification,Integer message_id,String imgurl,String nickname,String content){
        this.notification=notification;
        this.message_id=message_id;
        this.imgurl=imgurl;
        this.nickname=nickname;
        this.content=content;

    }
}
