package com.mlform.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mlform.dao.PictureDao;
import com.mlform.service.DocumentService;
import jdk.jfr.ContentType;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

import java.io.*;

@Service
public class DocumentServiceImpl implements DocumentService {
    @Resource
    private PictureDao pictureDao;

    // 文件保存路径
    @Value("${myconfig.savelocation}")
    private String targetFilePath;
    @Value("${myconfig.url}")
    private String url;

    @Override
    public String upload(MultipartFile file) {
        // 获取上传文件的文件名
        String fileName = file.getOriginalFilename();
        String location = targetFilePath + File.separator + fileName;
        // 真正地进行文件保存
        File targetFile = new File(location);
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(targetFile);
            IOUtils.copy(file.getInputStream(), fileOutputStream);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = new JSONObject();
        if (pictureDao.insertImg("http://" + url + fileName) == 1) {
            jsonObject.put("Result", 1);
        } else {
            jsonObject.put("Result", 0);
        }
        return JSON.toJSONString(jsonObject);
    }


    @Override
    public MultipartFile download(String filename) {
        targetFilePath += "\\friend_circle";
        File file = new File(targetFilePath + File.separator + filename);
        MultipartFile multipartFile = null;
        try {
            multipartFile = new MockMultipartFile(
                    "file",
                    file.getName(),
                    "image/*",
                    new FileInputStream(file)
            );
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return multipartFile;
    }
}
