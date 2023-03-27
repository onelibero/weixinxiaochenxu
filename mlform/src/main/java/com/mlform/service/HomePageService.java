package com.mlform.service;

import com.mlform.entity.HomePage;
import org.springframework.web.multipart.MultipartFile;

public interface HomePageService {

    String addinfo(String _openid, String title,String content);

    String addinfo_coverpic(String _openid, Integer info_id, MultipartFile file);

    String addinfo_pic(String _openid, Integer info_id, MultipartFile file);

    String deleteinfo(String _openid,Integer id);

    String updateinfo(String _openid,Integer info_id,String title,String content);

    String getsomeinfo(Integer page);

    String getinfoBynum(Integer num);

}
