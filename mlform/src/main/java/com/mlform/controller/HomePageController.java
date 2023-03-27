package com.mlform.controller;

import com.mlform.service.HomePageService;
import com.mlform.utils.JWTUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class HomePageController {
    @Resource
    private HomePageService homePageService;

    /***添加首页信息
     * @param title
     * @param content
     * @return
     */
    @PostMapping("/homepage/addinfo")
    public String addinfo(String title, String content, HttpServletRequest request) {
        String token = request.getHeader("token");
        String _openid = JWTUtil.verifyToken(token);
        return homePageService.addinfo(_openid, title, content);
    }

    /***
     * 添加首页信息封面
     * @param info_id
     * @param file
     * @return
     */
    @PostMapping("/homepage/addinfo_coverpic")
    public String addinfo_coverpic(Integer info_id, MultipartFile file, HttpServletRequest request) {
        String token = request.getHeader("token");
        String _openid = JWTUtil.verifyToken(token);
        return homePageService.addinfo_coverpic(_openid, info_id, file);
    }

    /***
     * 添加首页信息图片
     * @param info_id
     * @param file
     * @return
     */
    @PostMapping("/homepage/addinfo_pic")
    public String addinfo_pic(Integer info_id, MultipartFile file, HttpServletRequest request) {
        String token = request.getHeader("token");
        String _openid = JWTUtil.verifyToken(token);
        return homePageService.addinfo_pic(_openid, info_id, file);
    }

    /***
     * 删除首页信息
     * @param info_id
     * @return
     */
    @PostMapping("/homepage/deleteinfo")
    public String deleteinfo(Integer info_id, HttpServletRequest request) {
        String token = request.getHeader("token");
        String _openid = JWTUtil.verifyToken(token);
        return homePageService.deleteinfo(_openid, info_id);
    }

    /***
     * 更新首页信息
     * @param info_id
     * @param title
     * @param content
     * @return
     */
    @PostMapping("/homepage/updateinfo")
    public String updateinfo(Integer info_id, String title, String content, HttpServletRequest request) {
        String token = request.getHeader("token");
        String _openid = JWTUtil.verifyToken(token);
        return homePageService.updateinfo(_openid,info_id,title,content);
    }

    /***
     * 获取首页信息
     * @param page
     * @return
     */
    @GetMapping("/homepage/getsomeinfo")
    public String getsomeinfo(Integer page){

        return homePageService.getsomeinfo(page);
    }
}
