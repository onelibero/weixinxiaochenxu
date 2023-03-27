package com.mlform.controller;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Controller
public class UploadController {

    @Value("${myconfig.savelocation2}")
    private String targetFilePath;

    @RequestMapping("/uploadview")
    public String uploadview() {
        return "upload2";
    }


    @PostMapping("/upload2")
    @ResponseBody
    public String upload2(MultipartFile file, HttpServletRequest request) {
        String fileName = file.getOriginalFilename();
        String location = targetFilePath + File.separator + fileName;
        // 真正地进行文件保存
        File targetFile = new File(location);
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(targetFile);
            IOUtils.copy(file.getInputStream(), fileOutputStream);
            fileOutputStream.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        Integer num=judgenum()-1;
        return num.toString();
    }

    private Integer judgenum(){
        String basepath = targetFilePath;
        File dir = new File(basepath);
        List<File> allFileList = new ArrayList<>();
        if (!dir.exists()) {
            System.out.println("目录不存在");
            return 0;
        }
        allFileList = getFileSort(basepath);
        return allFileList.size();
    }

    @PostMapping("/downloadpic")
    public String downloadpic(Integer num, HttpServletResponse response) {
        if (num==null){
            num=0;
        }
        String basepath = targetFilePath;
        File dir = new File(basepath);

        List<File> allFileList = new ArrayList<>();
        if (!dir.exists()) {
            System.out.println("目录不存在");
            return "";
        }
        allFileList = getFileSort(basepath);

        Collections.reverse(allFileList);
        File res = allFileList.get(num);
        try {
            InputStream inputStream = new FileInputStream(res);
            OutputStream outputStream = response.getOutputStream();
            byte[] buff = new byte[1024];
            int index = 0;
            while ((index = inputStream.read(buff)) != -1) {
                outputStream.write(buff, 0, index);
                outputStream.flush();
            }
            outputStream.close();
            inputStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static List<File> getFileSort(String path) {

        List<File> list = getFiles(path, new ArrayList<File>());

        if (list != null && list.size() > 0) {
            Collections.sort(list, new Comparator<File>() {
                public int compare(File file, File newFile) {
                    if (file.lastModified() < newFile.lastModified()) {
                        return 1;
                    } else if (file.lastModified() == newFile.lastModified()) {
                        return 0;
                    } else {
                        return -1;
                    }

                }
            });

        }

        return list;
    }

    public static List<File> getFiles(String realpath, List<File> files) {

        File realFile = new File(realpath);
        if (realFile.isDirectory()) {
            File[] subfiles = realFile.listFiles();
            for (File file : subfiles) {
                if (file.isDirectory()) {
                    getFiles(file.getAbsolutePath(), files);
                } else {
                    files.add(file);
                }
            }
        }
        return files;
    }
}
