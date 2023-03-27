package com.mlform.utils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JWTUtil {//过期时间
    private static final long EXPIRE_TIME =  24*60 * 60 * 1000;//默认1天
    //私钥
    private static final String TOKEN_SECRET = "heyJudyx";
    private static final Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
    /**
     * 生成签名，15分钟过期
     * @param userId UserID
     * @return tokenStr
     */
    public static String createToken(String userId) {
        return getString(userId, EXPIRE_TIME);
    }

    /**
     * 生成token，自定义过期时间 毫秒
     * @param userId UserId
     * @param expireDate 过期时间
     * @return tokenStr
     */
    public static String createToken(String userId,long expireDate) {
        return getString(userId, expireDate);
    }
    private static String getString(String userId, long expireTime) {
        try {
            // 设置过期时间
            Date date = new Date(System.currentTimeMillis() + expireTime);
            // 私钥和加密算法
            // 设置头部信息
            JSONObject header=new JSONObject();
            header.put("typ", "JWT");
            header.put("alg", "HS256");
            // 返回token字符串
            return JWT.create()
                    .withHeader(header)
                    .withClaim("userId", userId)
                    .withExpiresAt(date)
                    .sign(algorithm);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    /**
     * 检验token是否正确,范湖openid
     * @param token 用户的token
     */
    public static String verifyToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getClaim("userId").asString();
        } catch (Exception e){
            return null;
        }
    }

}