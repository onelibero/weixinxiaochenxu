package com.mlform.controller;

import com.mlform.service.Friend_CircleService;
import com.mlform.utils.JWTUtil;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


@RestController
public class Friend_CircleController {
    @Resource
    private Friend_CircleService service;

    /***
     * 发动态第一步，发送内容
     * @Description 成功返回{"Result",1},失败返回{"Result",0},经典返回
     * @param content
     * @return
     */
    @PostMapping("/friend_circle/addinfo")
    public String addinfo(String content,HttpServletRequest request) {
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);

        return service.addinfo(_openid, content);
    }

    /***
     * 发动态第二步，发送图片
     * @param message_id  第一步返回值中的message_id
     * @param file
     * @return
     */
    @PostMapping("/friend_circle/addinfo_pic")
    public String addinfo_pic(Integer message_id, MultipartFile file, HttpServletRequest request) {
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);

        return service.addinfo_pic(_openid,message_id,file);
    }

    /***
     *删动态
     * @Dercription 经典返回值
     * @param message_id
     * @return
     */
    @PostMapping("/friend_circle/deleteinfo")
    public String deletemessage(Integer message_id, HttpServletRequest request) {
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.deletemessage(message_id,_openid);
    }

    /***
     *获取一些动态
     * @Description 返回message和对应comment的list集合
     *
     *  @param page 返回多少page*n以前的内容，n由后台已确定
     * @return
     */
    @GetMapping("/friend_circle/getsomeinfo")
    public String getsomeinfo(Integer page,HttpServletRequest request) {
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.getsomeinfo(page,_openid);
    }

    /***
     * 关键词搜索动态
     * @Description 返回值同/friend_circle/getsomeinfo请求一样
     * @param content
     * @return
     */
    @GetMapping("/friend_circle/fuzzy_query")
    public String fuzzy_query(String content){
        return service.fuzzy_query(content);
    }

    /***
     *获取本人动态
     * @return
     */
    @GetMapping("/friend_cilrcle/getownmessage")
    public String getOwnMessage(HttpServletRequest request){
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.getOwnMessage(_openid);
    }

    /***
     * 添加动态到收藏夹
     * @param message_id
     * @return
     */
    @PostMapping("/friend_circle/addfavorites")
    public String addfavorites(Integer message_id,HttpServletRequest request){
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.addFavorites(_openid,message_id);
    }

    /***
     * 删除收藏夹中动态
     * @param message_id
     * @return
     */
    @PostMapping("/friend_circle/deletefavoriter")
    public String deletefavorites(Integer message_id,HttpServletRequest request){
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.deleteFavoriter(_openid,message_id);
    }

    /**
     * 获取收藏夹中动态
     * @return
     */
    @GetMapping("friend_circle/getfavorites")
    public String getfavorites(HttpServletRequest request){
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.getFavoriter(_openid);
    }


    /***
     * 朋友圈动态点赞
     * @Description 经典返回值
     * @param message_id 动态id
     * @param operate 1为增加,-1为取消
     * @return
     */
    @PostMapping("/friend_circle/message_like")
    public String update_message_like(Integer message_id, Integer operate,HttpServletRequest request) {
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.update_message_like(message_id,_openid, operate);
    }

    /***
     * 添加动态评论
     * @Description 经典返回值
     * @param fcmid  动态id
     * @param review_to 回复给id
     * @param content 内容
     * @return
     */
    @PostMapping("/friend_circle/addcomment")
    public String add_comment(Integer fcmid, String review_to, String content,HttpServletRequest request) {
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.add_comment(fcmid, review_to, _openid, content);
    }

    /***
     * 删除评论
     * @Description 评论者拥有删除自己评论的权限，动态所有者有删除全部评论的权限
     * @param comment_id 评论id
     * @return
     */
    @PostMapping("/friend_circle/deletecomment")
    public String delete_comment(Integer comment_id, HttpServletRequest request){
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.delete_comment(comment_id,_openid);
    }

    /***
     * 添加动态举报
     * @Description 经典返回值
     * @param message_id 动态id
     * @param content 举报内容
     * @return
     */
    @PostMapping("/friend_circle/addreport")
    public String add_report_message(Integer message_id,String content,HttpServletRequest request){
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.add_report_message(message_id,_openid,content);
    }

    /***
     * 获取动态bymessage_id
     * @param message_id
     * @return
     */
    @GetMapping("/friend_circle/getMessageByid")
    public String getMessageByid(Integer message_id,HttpServletRequest request){
        String token=request.getHeader("token");
        String _openid= JWTUtil.verifyToken(token);
        return service.getinfoByid(message_id,_openid);
    }
}
