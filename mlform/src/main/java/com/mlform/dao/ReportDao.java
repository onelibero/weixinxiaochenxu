package com.mlform.dao;

import com.mlform.entity.Friend_Circle_Message;
import com.mlform.entity.Report;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ReportDao {

    @Select("select * from friend_circle_message where id=#{id}")
    Friend_Circle_Message getmessagebyid(Integer id);



    @Select("select * from report")
    List<Report> select_report_message();

    @Delete("delete from report where message_id=#{message_id}")
    Integer delete_report_message(Integer message_id);
}
