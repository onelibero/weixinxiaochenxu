package com.mlform.controller;

import com.mlform.service.DocumentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Arrays;

@Controller
public class DocumentController {
    @Resource
    private DocumentService service;

    @ResponseBody
    @PostMapping("/upload")
    public String upload(MultipartFile file) throws IOException {
        return service.upload(file);
    }

//    @ResponseBody
//    @GetMapping("/getimage/{name}")
//    public MultipartFile getimage(@PathVariable(name = "name") String filename) throws IOException {
//
////        ServletOutputStream outputStream = response.getOutputStream();
//
//        MultipartFile file = service.download(filename);
//
////        byte[] inputStream = getBytesByStream(file.getInputStream());
////
////        response.setContentType("image/*");
////        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
////
////        outputStream.write(inputStream);
//        return file;
//    }

    @Value("${myconfig.savelocation}")
    private String savelocation;

    @RequestMapping("/getimage/{perfix}/{name}")
    public String getimage(@PathVariable(name = "perfix") String perfix,@PathVariable(name = "name") String filename, HttpServletResponse response) {
        File file = new File(savelocation +"\\"+perfix+ File.separator + filename);
        try {
            InputStream inputStream = new FileInputStream(file);
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


    public byte[] getBytesByStream(InputStream inputStream) {
        byte[] bytes = new byte[1024];

        int b;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            while ((b = inputStream.read(bytes)) != -1) {

                byteArrayOutputStream.write(bytes, 0, b);
            }
            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
