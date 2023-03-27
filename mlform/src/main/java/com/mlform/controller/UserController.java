package com.mlform.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mlform.dao.UserDao;
import com.mlform.entity.User;
import com.mlform.service.UserService;
import com.mlform.service.impl.UserServiceImpl;
import com.mlform.utils.JWTUtil;
import org.apache.catalina.Session;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;

@RestController
public class UserController {

    @Resource
    private UserServiceImpl userService;

    /***
     * 用户注册
     * @Description 经典返回值, 请求nickname，sex
     * @param nickname
     * @param profileUrl 头像
     * @param sex
     * @return
     */
    @PostMapping("/user/register")
    public String inserUser(String nickname,String profileUrl, String sex, HttpServletRequest request) {
        String token = request.getHeader("token");
        String openid = JWTUtil.verifyToken(token);
        return userService.addUser(openid,profileUrl,nickname, sex);
    }

    /***
     * 用户登录
     * @Description
     * @param code
     * @return
     */
    @PostMapping("/user/login")
    public String login(String code, HttpServletResponse response) {
        String s = userService.login(code);
        return s;
    }

    /***
     * 更改昵称
     * @param nickname
     * @return
     */
    @PostMapping("/user/updatenickname")
    public String updatenickname(String nickname,HttpServletRequest request){
        String token = request.getHeader("token");
        String openid = JWTUtil.verifyToken(token);
        return userService.updatenickname(openid,nickname);
    }

    @GetMapping("/set")
    public String set_openid(String openid, HttpSession session) {
        session.setAttribute("_openid", openid);
        return null;
    }
}
