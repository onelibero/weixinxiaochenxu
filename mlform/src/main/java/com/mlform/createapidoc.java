package com.mlform;

import io.github.yedaxia.apidocs.Docs;
import io.github.yedaxia.apidocs.DocsConfig;
import org.springframework.boot.SpringApplication;

public class createapidoc {
    public static void main(String[] args) {
        DocsConfig config = new DocsConfig();
        config.setProjectPath("D:\\intellij idea\\save\\mlform"); // 项目根目录
        config.setProjectName("mlform"); // 项目名称
        config.setApiVersion("V1.0");       // 声明该API的版本
        config.setDocsPath("D:\\intellij idea\\save\\mlform\\japidocs\\docs"); // 生成API 文档所在目录
        config.setAutoGenerate(Boolean.TRUE);  // 配置自动生成
        Docs.buildHtmlDocs(config); // 执行生成文档
        SpringApplication.run(createapidoc.class, args);

//        DocsConfig config = new DocsConfig();
//        config.setProjectPath("D:\\intellij idea\\save\\tongfeng"); // 项目根目录
//        config.setProjectName("tongfeng"); // 项目名称
//        config.setApiVersion("V1.0");       // 声明该API的版本
//        config.setDocsPath("D:\\intellij idea\\save\\tongfeng\\japidocs\\docs"); // 生成API 文档所在目录
//        config.setAutoGenerate(Boolean.TRUE);  // 配置自动生成
//        Docs.buildHtmlDocs(config); // 执行生成文档
//        SpringApplication.run(createapidoc.class, args);
    }
}
