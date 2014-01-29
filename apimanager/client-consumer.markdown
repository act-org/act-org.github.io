---
layout: default
title: API Manager -  Overview
section: apimanager/overview
---
  
<ul class="pager">
  <li class="previous"><a href="/apimanager/overview">&larr; Back</a></li>
</ul>

# Client Invocation

With an API subscription, API consumers can invoke APIs from their client application. This will typically involve the [OAuth2](http://oauth.net/2/) scenario of presenting the credentials to obtain an authorization token at runtime. 

Here is a Java [sample](https://github.com/act-org/act-rest-client/blob/master/src/main/java/org/act/arch/client/controller/HomeController.java) Spring MVC controller that has a method `getLearningObjects(String token)` which will obtain API results from the [sample](https://github.com/act-org/act-rest-api) Node.js learningObjectives REST API method.

```java
package org.act.arch.client.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.act.arch.client.security.HTTPClient;
import org.act.arch.client.security.TokenManager;
import org.apache.http.HttpResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
        private HTTPClient httpClient;

        public HomeController() {
                httpClient = new HTTPClient();
        }

        @RequestMapping(value = "/")
        public ModelAndView test(HttpServletResponse response) throws IOException {
                ModelAndView mv = new ModelAndView("home");
                mv.addObject("learningObjects", getLearningObjects());
                return mv;
        }

        private String getLearningObjects() {
                TokenManager tm = new TokenManager();
                return getLearningObjects(tm.getToken("admin", "admin")
                                .getAccessToken());
        }

        public String getLearningObjects(String token) {
                String submitUrl = "http://localhost:8280/rest/1.0.0/learningObjectives";
                try {
                        HttpResponse httpResponse = httpClient.doGet(submitUrl, "Bearer "
                                        + token);
                        return httpClient.getResponsePayload(httpResponse);
                } catch (IOException e) {
                        e.printStackTrace();
                        return null;
                }
        }
}
```

as we can see, a `TokenManager` [class](https://github.com/act-org/act-rest-client/blob/master/src/main/java/org/act/arch/client/security/TokenManager.java) is responsible for presenting the `consumerKey` and `consumerSecret` for the application as well as presenting application user credentials as well.

```java
package org.act.arch.client.security;

import org.apache.http.HttpResponse;
import org.apache.commons.codec.binary.Base64;

import java.io.IOException;

public class TokenManager {
        
    private HTTPClient httpClient;    

    public TokenManager() {
        httpClient = new HTTPClient();
    }

    public Token getToken(String username, String password){
        String submitUrl = "http://localhost:8280/token";
        String consumerKey = "cvFci1ZZxza23MY5_ER6Px5eEpEa";
        String consumerSecret = "6MPCq2gB0P6vho8uOJB3smpAck0a";
        try {
            String applicationToken = consumerKey + ":" + consumerSecret;
           
            applicationToken = "Basic " + new Base64().encodeToString(applicationToken.getBytes()).trim();

            String payload = "grant_type=password&username="+username+"&password="+password;
            HttpResponse httpResponse = httpClient.doPost(submitUrl,applicationToken,
                            payload,"application/x-www-form-urlencoded");
            if (httpResponse.getStatusLine().getStatusCode() != 200) {
                    return null;
            }
            String response = httpClient.getResponsePayload(httpResponse);
            return JSONClient.getAccessToken(response);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```
<ul class="pager">
  <li class="previous"><a href="/apimanager/overview">&larr; Back</a></li>
</ul>