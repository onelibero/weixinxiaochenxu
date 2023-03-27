package com.mlform.entity;

import lombok.Data;

import java.util.List;

@Data
public class User {

    private String _openid;
    private String nickname;
    private String profileUrl;
    private String sex;
    private String favorites;
    private Integer permission;

}
