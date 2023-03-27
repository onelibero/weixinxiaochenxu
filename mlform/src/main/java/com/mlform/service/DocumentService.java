package com.mlform.service;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;

public interface DocumentService {

    String upload(MultipartFile file);


    MultipartFile download(String filename);
}
