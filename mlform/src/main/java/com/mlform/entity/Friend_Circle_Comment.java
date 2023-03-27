package com.mlform.entity;

import com.mlform.dao.UserDao;
import lombok.Data;

import javax.annotation.Resource;
import java.security.SecureRandom;
import java.util.Date;

@Data
public class Friend_Circle_Comment {
    private Integer id;
    private Integer fcmid;
    private String review_to_uid;
    private User review_to;
    private String uid;
    private User review;
    private String content;
    private Date create_time;
    private Integer like_count=0;

    public Friend_Circle_Comment(){

    }
    public Friend_Circle_Comment(Integer fcmid, User review_to, User review, String content) {
        this.create_time=new Date();
        this.fcmid=fcmid;
        this.review_to=review_to;
        this.review=review;
        this.content=content;
        this.review_to_uid=review_to.get_openid();
        this.uid=review.get_openid();
    }

}
