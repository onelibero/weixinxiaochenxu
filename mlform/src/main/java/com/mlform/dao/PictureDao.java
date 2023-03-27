package com.mlform.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

@Repository
@Mapper
public interface PictureDao {

    @Insert("insert into picture values(null,#{imgurl})")
    Integer insertImg(String imgurl);

    @Select("select imgurl from picture where id=#{id}")
    String getImg(Integer id);

}
