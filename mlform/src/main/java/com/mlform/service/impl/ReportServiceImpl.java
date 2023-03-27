package com.mlform.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mlform.dao.Friend_CircleDao;
import com.mlform.dao.ReportDao;
import com.mlform.dao.UserDao;
import com.mlform.entity.Friend_Circle_Message;
import com.mlform.entity.Report;
import com.mlform.entity.ReportAndMessage;
import com.mlform.service.ReportService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {
    @Resource
    private ReportDao reportdao;

    @Resource
    private Friend_CircleDao friend_circleDao;
    @Resource
    private UserDao userDao;

    @Override
    public String get_report_message() {

        List<ReportAndMessage> list = new ArrayList<>();
        List<Report> reportList = reportdao.select_report_message();
        for (Report reporot : reportList) {
            Friend_Circle_Message message = friend_circleDao.select_message_byid(reporot.getMessage_id());
            String imgurl = null;
            if (JSON.parseArray(message.getImgurl()).size() > 0) {
                imgurl = (String) JSON.parseArray(message.getImgurl()).get(0);
            }
            message.setUser(userDao.getUserInfo(message.getUid()));
            list.add(new ReportAndMessage(reporot, message.getId(), imgurl, message.getUser().getNickname(), message.getContent()));
        }
        return JSON.toJSONString(list);
    }

    @Override
    public String delete_report_message(Integer message_id) {

        JSONObject jsonObject = new JSONObject();
        if (reportdao.delete_report_message(message_id) == 1) {
            jsonObject.put("Result", 1);
        } else {
            jsonObject.put("Result", 0);
        }
        return JSON.toJSONString(jsonObject);
    }

    @Override
    public String delete_message(Integer message_id) {
        JSONObject jsonObject = new JSONObject();
        if (friend_circleDao.deleteinfo(message_id) == 1) {
            jsonObject.put("Result", 1);
        } else {
            jsonObject.put("Result", 0);
        }
        return JSON.toJSONString(jsonObject);
    }


}
