package com.mlform.interceptor;

import com.mlform.utils.JWTUtil;
import org.apache.ibatis.plugin.Intercepts;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;

public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {



        String token = request.getHeader("token");
        String openid= JWTUtil.verifyToken(token);
        if (openid != null) {
            return true;
        }
        response.setCharacterEncoding("UTF-8");
        System.out.println(new Date().toString()+"未登录，拦截请求"+request.getServletPath());
        response.getWriter().println("未登录，拦截请求"+request.getServletPath());
        return false;
    }

}
