package com.mlform.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class PermissionIntercepotor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {
        if (request.getSession() != null) {
            Integer permission = 0;
            permission = Integer.valueOf(request.getHeader("permission"));
            if (permission == 1) {
                return true;
            }
        }
        response.getWriter().println("权限不足");
        System.out.println("权限不足");
        return false;
    }
}
