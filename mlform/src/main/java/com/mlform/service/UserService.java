package com.mlform.service;

import com.alibaba.fastjson.JSONObject;
import com.mlform.entity.User;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public interface UserService {

    String addUser(String _openid, String profile,String nickname, String sex);

    String login(String code);

    String getOpenId(String code);

    String updatenickname(String _openid,String nickname);
}
