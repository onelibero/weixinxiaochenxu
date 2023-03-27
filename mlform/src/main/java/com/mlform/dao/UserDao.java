package com.mlform.dao;

import com.mlform.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;


@Repository
@Mapper
public interface UserDao {

    @Insert("insert into users values(null,#{_openid},#{profileUrl},#{nickname},#{sex},null,0)")
    Integer insertUser(String _openid, String profileUrl, String nickname, String sex);

    @Select("select _openid,profileUrl,nickname,sex,favorites,permission from users where _openid=#{_openid}")
    User getUserInfo(String _openid);

    @Select("select id from users where _openid=#{_openid}")
    Integer getidbyopenid(String _openid);

    @Select("select count(*) from users where _openid=#{_openid}")
    Integer judgeexist(String _openid);

    @Update("update users set nickname=#{nickname} where _openid=#{_openid}")
    Integer updatenicknamebyopenid(String _openid,String nickname);

}
