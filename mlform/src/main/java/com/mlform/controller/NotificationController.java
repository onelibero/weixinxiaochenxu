package com.mlform.controller;

import com.mlform.service.NotificationService;
import com.mlform.utils.JWTUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class NotificationController {
    @Resource
    private NotificationService service;

    /***
     * 检测是否有新消息
     * @Description 返回{"Result",一个数字},数字即为未读消息数量
     * @return
     */
    @GetMapping("/user/checknewnoticefication")
    public String checknewnoticefication(HttpServletRequest request){
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.checknewnoticefication(_openid);
    }

    /***
     * 获取所有消息
     * @return
     */
    @GetMapping("/user/getallnotification")
    public String getallnotification(Integer page,HttpServletRequest request){
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.getallnotification(_openid,page);
    }

}
