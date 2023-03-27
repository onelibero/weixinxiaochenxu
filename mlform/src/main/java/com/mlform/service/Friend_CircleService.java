package com.mlform.service;

import com.mlform.entity.Friend_Circle_Comment;
import com.mlform.entity.Friend_Circle_Message;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface Friend_CircleService {

    String addinfo(String uid, String content);

    String addinfo_pic(String uid,Integer message_id,MultipartFile file);

    String deletemessage(Integer messageid,String uid);

    String getsomeinfo(Integer page,String _openid);

    String getinfoByid(Integer message_id,String _openid);

    String fuzzy_query(String content);

    String getOwnMessage(String _openid);

    String addFavorites(String _openid,Integer message_id);

    String deleteFavoriter(String _openid,Integer message_id);

    String getFavoriter(String _openid);

    String update_message_like(Integer message_id,String user_id,Integer operate);

    String add_comment(Integer fcmid, String review_to, String uid, String content);

    String delete_comment(Integer comment_id,String uid);

    String add_report_message(Integer message_id,String uid,String content);
}
