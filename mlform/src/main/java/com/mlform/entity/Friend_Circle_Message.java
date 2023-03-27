package com.mlform.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Data
public class Friend_Circle_Message {
    private Integer id;
    private String uid;
    private User user;
    private String content;
    private MultipartFile img;
    private String imgurl;

    private Date create_time=new Date();
    private Integer like_count=0;
    private Integer islike=0;
    private String like_count_list="[]";
    private List<User> like_count_list_user;
}
