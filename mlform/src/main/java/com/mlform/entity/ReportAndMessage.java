package com.mlform.entity;

import lombok.Data;

@Data
public class ReportAndMessage {
    private Report report;
    private Integer message_id;
    private String imgurl;
    private String nickname;
    private String content;

    public ReportAndMessage(Report report, Integer message_id, String imgurl, String nickname, String content){
        this.report=report;
        this.message_id=message_id;
        this.imgurl=imgurl;
        this.nickname=nickname;
        this.content=content;

    }
}
