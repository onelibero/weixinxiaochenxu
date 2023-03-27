package com.mlform.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mlform.dao.HomePageDao;
import com.mlform.dao.UserDao;
import com.mlform.entity.Friend_Circle_Message;
import com.mlform.entity.HomePage;
import com.mlform.service.HomePageService;
import com.mlform.utils.DocumentUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.xml.bind.util.JAXBSource;
import java.util.ArrayList;
import java.util.List;
@Service
public class HomePageServiceImpl implements HomePageService {

    @Resource
    private HomePageDao homePageDao;
    @Resource
    private UserDao userDao;
    @Resource
    private DocumentUtil documentUtil;

    @Value("${myconfig.url}")
    private String url;

    @Override
    public String addinfo(String _openid, String title, String content) {
        HomePage homePage = new HomePage();
        homePage.setTitle(title);
        content=content.replace("http://tmp",url+"getimage/home_page");
        homePage.setContent(content);
        homePage.setCoverimgurl("[]");
        homePage.setImgurl("[]");
        JSONObject jsonObject = new JSONObject();
        if (userDao.getUserInfo(_openid).getPermission() == 1) {
            if (homePageDao.insertinfo(homePage) == 1) {
                jsonObject.put("info_id", homePage.getId());
                jsonObject.put("Result", 1);
            }
        } else {
            jsonObject.put("Result", 0);
        }
        return jsonObject.toJSONString();
    }

    @Override
    public String addinfo_coverpic(String _openid, Integer info_id, MultipartFile file) {
        JSONObject jsonObject = new JSONObject();
        if (userDao.getUserInfo(_openid).getPermission() == 1) {
            if (homePageDao.updateinfo_coverimgurl(info_id, documentUtil.upload("home_page","home_page", file)) == 1) {
                jsonObject.put("Result", 1);
            }
        } else {
            jsonObject.put("Result", 0);
            homePageDao.deleteinfo(info_id);
        }
        return jsonObject.toJSONString();
    }

    @Override
    public String addinfo_pic(String _openid, Integer info_id, MultipartFile file) {
        JSONObject jsonObject = new JSONObject();
        if (userDao.getUserInfo(_openid).getPermission() == 1) {
            String imgurl=homePageDao.selectinfoByid(info_id).getImgurl();
            List<String> list = new ArrayList<>();
            if (imgurl != null) {
                list = JSON.parseArray(imgurl, String.class);
            }
            list.add(documentUtil.upload("homepage","home_page", file));
            if (homePageDao.updateinfo_imgurl(info_id, JSON.toJSONString(list)) == 1) {
                jsonObject.put("Result", 1);
            }
        } else {
            jsonObject.put("Result", 0);
            homePageDao.deleteinfo(info_id);
        }
        return jsonObject.toJSONString();
    }

    @Override
    public String deleteinfo(String _openid, Integer id) {
        JSONObject jsonObject = new JSONObject();
        if (userDao.getUserInfo(_openid).getPermission() == 1) {
            if (homePageDao.deleteinfo(id) == 1) {
                jsonObject.put("Result", 1);
            }
        } else {
            jsonObject.put("Result", 0);
        }
        return jsonObject.toJSONString();
    }

    @Override
    public String updateinfo(String _openid,Integer info_id,String title,String content) {

        homePageDao.deleteinfo(info_id);
        return addinfo(_openid,title,content);
    }

    @Override
    public String getsomeinfo(Integer page) {

        List<HomePage> list=homePageDao.selectsomeinfo(page);

        return JSON.toJSONString(list);
    }

    @Override
    public String getinfoBynum(Integer num) {
        return null;
    }
}
