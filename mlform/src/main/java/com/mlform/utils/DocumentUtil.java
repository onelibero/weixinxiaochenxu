package com.mlform.utils;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.omg.CORBA.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

@Component

public class DocumentUtil {

    @Value("${myconfig.url}")
    private String url;

    @Value("${myconfig.savelocation}")
    private String savelocation;

    public String upload(MultipartFile file) {  //将file保存到服务器，返回url
        // 文件保存路径

        // 获取上传文件的文件名
        String fileName = file.getOriginalFilename();

        String location = savelocation + File.separator + fileName;
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
        return url + "getimage/" + fileName;
    }

    public String upload(String prefix, String path, MultipartFile file) {  //将file保存到服务器，返回url
        // 文件保存路径

        // 获取上传文件的文件名
        String fileName = file.getOriginalFilename();
        String location = savelocation + File.separator + path + File.separator + fileName;
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

        return url + "getimage/" + prefix + "/" + fileName;
    }

}
