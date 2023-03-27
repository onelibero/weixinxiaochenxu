package com.mlform.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mlform.dao.Friend_CircleDao;
import com.mlform.dao.NotificationDao;
import com.mlform.dao.UserDao;
import com.mlform.entity.Friend_Circle_Message;
import com.mlform.entity.Notification;
import com.mlform.entity.NotificationAndMessage;
import com.mlform.service.NotificationService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Resource
    private NotificationDao notificationDao;
    @Resource
    private Friend_CircleDao friend_circleDao;
    @Resource
    private UserDao userDao;

    @Override
    public String checknewnoticefication(String uid) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("Result", notificationDao.select_NoReadNotificationByuid(uid));
        return jsonObject.toJSONString();
    }

    @Override
    public String getallnotification(String uid,Integer page) {
        List<NotificationAndMessage> list = new ArrayList<>();

        List<Notification> notificationList = notificationDao.select_allnotificationByuid(uid,page);

        for (Notification notification : notificationList) {
            notification.setReviewer_user(userDao.getUserInfo(notification.getReviewer_uid()));
            Friend_Circle_Message message = friend_circleDao.select_message_byid(notification.getMessage_id());
            String imgurl = null;
            if (JSON.parseArray(message.getImgurl()).size() > 0) {
                imgurl = (String) JSON.parseArray(message.getImgurl()).get(0);
            }

            message.setUser(userDao.getUserInfo(message.getUid()));
            list.add(new NotificationAndMessage(notification, message.getId(), imgurl, message.getUser().getNickname(), message.getContent()));
        }
        notificationDao.update_setread(uid);
        return JSON.toJSONString(list);
    }
}
