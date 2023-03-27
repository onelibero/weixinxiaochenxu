package com.mlform.dao;

import com.mlform.entity.Friend_Circle_Comment;
import com.mlform.entity.Friend_Circle_Message;
import com.mlform.entity.Report;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.security.SecureRandom;
import java.util.List;
import java.util.function.IntToDoubleFunction;

@Repository
@Mapper
public interface Friend_CircleDao {

    @Insert("insert into friend_circle_message values(null,#{uid},#{content},#{imgurl},#{create_time},#{like_count},#{like_count_list})")
    @Options(useGeneratedKeys = true,keyProperty="id")
    Integer insertinfo(Friend_Circle_Message message);

    @Update("update friend_circle_message set imgurl=#{imgurl} where id=#{id}")
    Integer update_message_imgurl(Integer id,String imgurl);

    @Delete("delete from friend_circle_message where id=#{id}")
    Integer deleteinfo(Integer id);

    @Select("select uid from friend_circle_message where id=#{id}")
    String judegedelete(Integer id);

    @Select("select * from friend_circle_message OER BY create_time DESC limit #{page};")
    List<Friend_Circle_Message> getsomeinfo(Integer page);

    @Select("select nickname from users where _openid=#{_openid}")
    String select_nicknameByuid(String _openid);

    @Select("select profileUrl from users where _openid=#{_openid}")
    String select_profileByuid(String _openid);

    @Select("select uid from friend_circle_message where id=#{id}")
    String select_uidByid(Integer id);

    @Select("select * from friend_circle_message where content like concat('%',#{content},'%')")   //此处不能用'%#{content}%'，因为被单引号包围的mybatis会自动解析为'%?%'
    List<Friend_Circle_Message> fuzzy_query(String content);

    @Select("select * from friend_circle_message where uid=#{_openid}")
    List<Friend_Circle_Message> select_ownmessage(String _openid);

    @Select("select * from friend_circle_message where id=#{id}")
    Friend_Circle_Message select_message_byid(Integer id);

    @Update("update users set favorites=#{favorites} where _openid=#{_openid}")
    Integer update_favorties(String _openid,String favorites);

    @Select("select * from friend_circle_message where id=#{id}")
    Friend_Circle_Message getmessagebyid(Integer id);

    @Select("SELECT count(*) FROM friend_circle_message")
    Integer count();

    @Update("update friend_circle_message set like_count=like_count+#{num} where id=#{id}")
    Integer update_message_like_count(Integer id,Integer num);

    @Select("select like_count_list from friend_circle_message where id=#{id}")
    String get_message_like_list(Integer id);

    @Update("update friend_circle_message set like_count_list=#{list} where id=#{id}")
    Integer update_message_like_list(Integer id,String list);

    @Select("select count(*) from users where _openid=#{_openid}")
    Integer selectsomeone(String _openid);

    @Select("select * from friend_circle_comment where fcmid=#{fcmid}")
    List<Friend_Circle_Comment> get_comments(Integer fcmid);

    @Insert("insert into friend_circle_comment values(null,#{fcmid},#{review_to_uid},#{uid},#{content},#{create_time},#{like_count})")
    Integer add_comment(Friend_Circle_Comment comment);

    @Delete("delete from friend_circle_comment where id=#{id}")
    Integer delete_comment(Integer id);

    @Select("select * from friend_circle_comment where id=#{id}")
    Friend_Circle_Comment getcommentbyid(Integer id);

    @Select("select uid from friend_circle_message where id=#{id}")
    String getmessageauthorbyid(Integer id);

    @Insert("insert into report values(null,#{message_id},#{uid},#{content})")
    Integer add_report_message(Report report);
}
