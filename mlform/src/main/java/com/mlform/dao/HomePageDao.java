package com.mlform.dao;

import com.mlform.entity.Friend_Circle_Message;
import com.mlform.entity.HomePage;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface HomePageDao {

    @Insert("insert into homepage values(null,#{title},#{coverimgurl},#{content},#{imgurl},#{date})")
    @Options(useGeneratedKeys = true,keyProperty="id")
    Integer insertinfo(HomePage homePage);

    @Select("select * from homepage where id=#{id}")
    HomePage selectinfoByid(Integer id);

    @Select("select * from homepage ORDER BY date DESC limit #{peag};")
    List<HomePage> selectsomeinfo(Integer page);

    @Update("update homepage set coverimgurl=#{coverimgurl} where id=#{id}")
    Integer updateinfo_coverimgurl(Integer id,String coverimgurl);

    @Update("update homepage set imgurl=#{imgurl} where id=#{id}")
    Integer updateinfo_imgurl(Integer id,String imgurl);

    @Delete("delete from homepage where id=#{id}")
    Integer deleteinfo(Integer id);


}
