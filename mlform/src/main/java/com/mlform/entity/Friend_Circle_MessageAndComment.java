package com.mlform.entity;

import lombok.Data;

import java.util.List;

@Data
public class Friend_Circle_MessageAndComment {
    private Friend_Circle_Message message;
    private List<Friend_Circle_Comment> comments;

    public Friend_Circle_MessageAndComment(Friend_Circle_Message message, List<Friend_Circle_Comment> comments) {
        this.message=message;
        this.comments=comments;
    }
}
