package com.mlform.entity;

import lombok.Data;

import java.util.Date;

@Data
public class HomePage {
    private Integer id;
    private String title;
    private String coverimgurl;
    private String content;
    private String imgurl;
    private Date date=new Date();
}
