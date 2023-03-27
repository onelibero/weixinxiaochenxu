package com.mlform.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mlform.dao.UserDao;
import com.mlform.entity.User;
import com.mlform.service.UserService;
import com.mlform.utils.DocumentUtil;
import com.mlform.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao userDao;

    @Override
    public String addUser(String _openid,String profileUrl,String nickname,String sex) {
        Integer result=0;
        if(userDao.judgeexist(_openid)==0){
            result = userDao.insertUser(_openid,profileUrl,nickname, sex);
        }
        JSONObject jsonObject = new JSONObject();
        if (result == 1) {
            jsonObject.put("Result", 1);
        } else {
            jsonObject.put("Result", 0);
        }

        return JSON.toJSONString(jsonObject);
    }


//    @Autowired
//    private final RestTemplate restTemplate = new RestTemplate();
//    @Bean
//    public RestTemplate restTemplate(RestTemplateBuilder builder){
//        return builder.build();
//    }

    @Override
    public String login(String code) {
        String openid = getOpenId(code);
        if (openid == null)
            return "code错误";
        User user;
        user = userDao.getUserInfo(openid);
        JSONObject object = new JSONObject();
        String token = JWTUtil.createToken(openid);

        if(user==null){
            object.put("Result",0);
            object.put("token", token);
            return object.toJSONString();
        }
        object.put("Result",1);
        object.put("openid", openid);
        object.put("nickname", user.getNickname());
        object.put("profileUrl", user.getProfileUrl());
        object.put("sex", user.getSex());
        object.put("permission", user.getPermission());
        object.put("token", token);
        return object.toJSONString();
    }

    @Override
    public String getOpenId(String code) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
        RestTemplate restTemplate = new RestTemplate();
        String strBody = restTemplate.exchange(getCodeUrl(code), HttpMethod.GET, entity, String.class).getBody();
        JSONObject jsonObject = JSON.parseObject(strBody);
        String openid;
        try {
            openid = jsonObject.get("openid").toString();
        } catch (Exception e) {
            return null;
        }
        return openid;
    }

    @Override
    public String updatenickname(String _openid, String nickname) {
        JSONObject jsonObject = new JSONObject();
        User user = userDao.getUserInfo(nickname);
        if(userDao.updatenicknamebyopenid(_openid,nickname)==1){
            jsonObject.put("Result",1);
        }else {
            jsonObject.put("Result",0);
        }
        return jsonObject.toJSONString();
    }

    private final String SECRET = "bf6a4a8b8ebd936a285657443b097f79";
    private final String APPID= "wxccde75dade0ff18d";
    private String getCodeUrl(String code) {
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid="+APPID+"&secret="+ SECRET + "&js_code=";
        String last = "&grant_type=authorization_code";
        String re = url + code + last;
        return url + code + last;
    }

}
