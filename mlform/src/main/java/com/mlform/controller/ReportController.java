package com.mlform.controller;

import com.mlform.entity.Report;
import com.mlform.service.Friend_CircleService;
import com.mlform.service.ReportService;
import org.springframework.boot.rsocket.context.LocalRSocketServerPort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class ReportController {
    @Resource
    private ReportService reportService;
    @Resource
    private Friend_CircleService friend_circleService;

    /***
     * 获取所有举报内容
     * @Description 返回Report类的list集合，例如[{"content":"黄色","id":4,"message_id":22,"uid":9}]
     * @return
     */
    @GetMapping("/report/get_report_message")
    public String get_report_message(){
        return reportService.get_report_message();
    }

    /***
     * 删除举报内容
     * @Description 删除所有与该message_id相同的举报
     * @param message_id
     * @return
     */
    @PostMapping("/report/delete_report_message")
    public String delete_report_message(Integer message_id){
        return reportService.delete_report_message(message_id);
    }


    /***
     * 管理员删除动态
     * @param message_id
     * @return
     */
    @PostMapping("/report/delete_message")
    public String delete_message(Integer message_id){
        return reportService.delete_message(message_id);
    }
}
