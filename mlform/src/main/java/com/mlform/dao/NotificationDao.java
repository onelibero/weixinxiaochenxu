package com.mlform.dao;


import com.mlform.entity.Notification;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface NotificationDao {

    @Insert("insert into notification values(null,#{uid},#{reviewer_uid},#{message_id},#{type},#{content},#{time},0)")
    Integer insert_notification(Notification notification);

    @Select("select * from notification where uid=#{uid} order by time desc limit #{page} ")
    List<Notification> select_allnotificationByuid(String uid,Integer page);

    @Select("select count(*) from notification where uid=#{uid} and isread=0")
    Integer select_NoReadNotificationByuid(String uid);

    @Update("update notification set isread=1 where uid=#{uid}")
    Integer update_setread(String uid);
}
