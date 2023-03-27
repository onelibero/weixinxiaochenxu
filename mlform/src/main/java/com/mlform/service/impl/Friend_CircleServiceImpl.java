package com.mlform.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.mlform.dao.Friend_CircleDao;
import com.mlform.dao.NotificationDao;
import com.mlform.dao.UserDao;
import com.mlform.entity.*;
import com.mlform.service.Friend_CircleService;
import com.mlform.utils.DocumentUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class Friend_CircleServiceImpl implements Friend_CircleService {

    @Resource
    private Friend_CircleDao dao;
    @Resource
    private UserDao userDao;
    @Resource
    private NotificationDao notificationDao;

    @Override
    public String addinfo(String uid, String content) {
        Friend_Circle_Message message = new Friend_Circle_Message();
        message.setUid(uid);
        message.setUser(userDao.getUserInfo(uid));
        message.setContent(content);
        message.setImgurl("[]");

        JSONObject jsonObject = new JSONObject();
        if (dao.insertinfo(message) != 0) {
            jsonObject.put("message_id", message.getId());
            jsonObject.put("Result", 1);
        } else {
            jsonObject.put("Result", 0);
        }
        return JSON.toJSONString(jsonObject);
    }

    @Resource
    DocumentUtil documentUtil;

    @Override
    public String addinfo_pic(String uid, Integer message_id, MultipartFile file) {
        JSONObject jsonObject = new JSONObject();
        Friend_Circle_Message message = dao.getmessagebyid(message_id);
        if (uid.equals(message.getUid())) {
            List<String> list = new ArrayList<>();
            if (message.getImgurl() != null) {
                list = JSON.parseArray(message.getImgurl(), String.class);
            }
            list.add(documentUtil.upload("friend_circle", "friend_circle", file));
            if (dao.update_message_imgurl(message_id, JSON.toJSONString(list)) == 1) {
                jsonObject.put("Result", 1);
            } else {
                jsonObject.put("Result", 0);
                dao.deleteinfo(message_id);
            }
        }
        return jsonObject.toJSONString();
    }

    @Override
    public String deletemessage(Integer message_id, String uid) {
        JSONObject jsonObject = new JSONObject();
        if (dao.judegedelete(message_id).equals(uid)) {
            if (dao.deleteinfo(message_id) == 1) {
                jsonObject.put("Result", 1);
            }
        } else {
            jsonObject.put("Result", 0);
        }
        return JSON.toJSONString(jsonObject);
    }


    @Override
    public String getsomeinfo(Integer page, String _openid) {
        JSONObject jsonObject = new JSONObject();
        List<Friend_Circle_Message> list = dao.getsomeinfo(page * 2);
        List<Friend_Circle_MessageAndComment> list2 = packageMessageAndComment(list, _openid);
        return JSON.toJSONString(list2);
    }

    @Override
    public String getinfoByid(Integer message_id, String _openid) {
        JSONObject jsonObject = new JSONObject();
        Friend_Circle_Message message = dao.select_message_byid(message_id);
        message.setUser(userDao.getUserInfo(message.getUid()));  //根据uid获取并放入对应user实体
        message.setImgurl(message.getImgurl().substring(1, message.getImgurl().length() - 1));
        List<User> list_user = new ArrayList<>();          //将like_count_list中的openid集合拿出来，放入对应的user实体
        for (String openid : JSON.parseArray(message.getLike_count_list(), String.class)) {
            list_user.add(userDao.getUserInfo(openid));
            if (_openid.equals(openid)) {
                message.setIslike(1);
            }
        }
        message.setLike_count_list_user(list_user);
        List<Friend_Circle_Comment> comments = dao.get_comments(message.getId());
        for (Friend_Circle_Comment comment : comments) {
            comment.setReview_to(userDao.getUserInfo(comment.getReview_to_uid()));
            comment.setReview(userDao.getUserInfo(comment.getUid()));
        }
        Friend_Circle_MessageAndComment friend_circle_messageAndComment = new Friend_Circle_MessageAndComment(message, comments);
        return JSON.toJSONString(friend_circle_messageAndComment);
    }

    @Override
    public String fuzzy_query(String content) {
        JSONObject jsonObject = new JSONObject();
        List<Friend_Circle_Message> list = dao.fuzzy_query(content);

        List<Friend_Circle_MessageAndComment> list2 = new ArrayList<>();
        if (list != null) {
            for (Friend_Circle_Message message : list) {
                list2.add(new Friend_Circle_MessageAndComment(message, dao.get_comments(message.getId())));
            }
        }

        return JSON.toJSONString(list2);
    }

    @Override
    public String getOwnMessage(String _openid) {
        JSONObject jsonObject = new JSONObject();
        List list = new ArrayList();
        if ((list = dao.select_ownmessage(_openid)) != null) {
            List<Friend_Circle_MessageAndComment> list1 = packageMessageAndComment(list, _openid);
            return JSON.toJSONString(list1);
        } else {
            return null;
        }
    }

    @Override
    public String addFavorites(String _openid, Integer message_id) {
        JSONObject jsonObject = new JSONObject();
        User user = userDao.getUserInfo(_openid);
        List<Integer> list = JSON.parseArray(user.getFavorites(), Integer.class);
        if (list == null) {
            list = new ArrayList<>();
        }
        if (!list.contains(message_id)) {
            list.add(message_id);
            if (dao.update_favorties(_openid, list.toString()) == 1) {
                jsonObject.put("Result", 1);
            }
        } else {
            jsonObject.put("Result", 0);
        }
        return jsonObject.toJSONString();
    }

    @Override
    public String deleteFavoriter(String _openid, Integer message_id) {
        JSONObject jsonObject = new JSONObject();
        User user = userDao.getUserInfo(_openid);
        List<Integer> list = JSON.parseArray(user.getFavorites(), Integer.class);
        if (list == null) {
            list = new ArrayList<>();
        }
        if (list.contains(message_id)) {
            list.remove(message_id);
            if (dao.update_favorties(_openid, list.toString()) == 1) {
                jsonObject.put("Result", 1);
            }
        } else {
            jsonObject.put("Result", 0);
        }
        return jsonObject.toJSONString();
    }

    @Override
    public String getFavoriter(String _openid) {
        User user = userDao.getUserInfo(_openid);
        List<Integer> favoriteslist = new ArrayList<>();
        List<Integer> list2;
        if((list2=JSON.parseArray(user.getFavorites(), Integer.class))!=null){
            favoriteslist=list2;
        }
        List<Friend_Circle_Message> messageslist = new ArrayList<>();
        List<Friend_Circle_MessageAndComment> list1 = new ArrayList<>();
        if (favoriteslist.size() > 0) {
            for (Integer id : favoriteslist) {
                messageslist.add(dao.select_message_byid(id));
            }
            list1 = packageMessageAndComment(messageslist, _openid);
        }
        return JSON.toJSONString(list1);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public String update_message_like(Integer message_id, String user_id, Integer operate) {
        JSONObject jsonObject = new JSONObject();
        String liststr = dao.get_message_like_list(message_id);
        if (liststr == null)
            liststr = "[]";
        List<String> list = JSONArray.parseArray(liststr, String.class);

        if (operate == 1 && !list.contains(user_id)) {
            list.add(user_id);
        } else if (operate == -1 && list.contains(user_id)) {
            list.remove(user_id);
        } else {
            throw new RuntimeException("点赞异常");
        }
        if (dao.selectsomeone(user_id) != 1) {
            throw new RuntimeException("用户异常");
        }
        if (dao.update_message_like_list(message_id, JSON.toJSONString(list)) == 1 && dao.update_message_like_count(message_id, operate) == 1) {
            jsonObject.put("Result", 1);
            if (operate == 1 && !dao.getmessagebyid(message_id).getUid().equals(user_id)) {
                notificationDao.insert_notification(new Notification(dao.select_uidByid(message_id), user_id, message_id, 0, null));
            }
        } else {
            jsonObject.put("Result", 0);
        }
        return JSON.toJSONString(jsonObject);
    }

    @Override
    public String add_comment(Integer fcmid, String review_to_id, String uid, String content) {
        JSONObject jsonObject = new JSONObject();
        User review_to = userDao.getUserInfo(review_to_id);
        User review = userDao.getUserInfo(uid);
        if (dao.add_comment(new Friend_Circle_Comment(fcmid, review_to, review, content)) == 1) {
            jsonObject.put("Result", 1);
            if (!review_to_id.equals(uid))
                notificationDao.insert_notification(new Notification(review_to_id, uid, fcmid, 1, content));
        } else {
            jsonObject.put("Result", 0);
        }
        return JSON.toJSONString(jsonObject);
    }


    public String delete_comment(Integer comment_id, String uid) {
        Friend_Circle_Comment comment = dao.getcommentbyid(comment_id);
        String author = dao.getmessageauthorbyid(comment.getFcmid());
        JSONObject jsonObject = new JSONObject();
        if (uid.equals(comment.getUid()) || uid.equals(author)) {
            if (dao.delete_comment(comment_id) == 1) {
                jsonObject.put("Result", 1);
            }
        } else {
            jsonObject.put("Result", 0);
        }
        return JSON.toJSONString(jsonObject);
    }

    @Override
    public String add_report_message(Integer message_id, String uid, String content) {
        JSONObject jsonObject = new JSONObject();
        Report report = new Report(message_id, uid, content);
        if (dao.add_report_message(report) == 1) {
            jsonObject.put("Result", 1);
        } else {
            jsonObject.put("Result", 0);
        }

        return JSON.toJSONString(jsonObject);
    }

    private List<Friend_Circle_MessageAndComment> packageMessageAndComment(List<Friend_Circle_Message> messageslist, String _openid) {

        for (Friend_Circle_Message message : messageslist) {
            if (message != null) {
                message.setUser(userDao.getUserInfo(message.getUid()));  //根据uid获取并放入对应user实体
                message.setImgurl(message.getImgurl().substring(1, message.getImgurl().length() - 1));
                List<User> list_user = new ArrayList<>();          //将like_count_list中的openid集合拿出来，放入对应的user实体
                for (String openid : JSON.parseArray(message.getLike_count_list(), String.class)) {
                    list_user.add(userDao.getUserInfo(openid));
                    if (_openid.equals(openid)) {
                        message.setIslike(1);
                    }
                }
                message.setLike_count_list_user(list_user);
            }
        }
        List<Friend_Circle_MessageAndComment> list2 = new ArrayList<>();
        if (messageslist != null) {
            for (Friend_Circle_Message message : messageslist) {
                if (message != null) {
                    List<Friend_Circle_Comment> comments = dao.get_comments(message.getId());
                    for (Friend_Circle_Comment comment : comments) {
                        comment.setReview_to(userDao.getUserInfo(comment.getReview_to_uid()));
                        comment.setReview(userDao.getUserInfo(comment.getUid()));
                    }
                    list2.add(new Friend_Circle_MessageAndComment(message, comments));
                } else {
                    list2.add(null);
                }
            }
        }
        return list2;
    }
}
