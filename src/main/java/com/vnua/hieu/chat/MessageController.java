package com.vnua.hieu.chat;

import com.vnua.hieu.entity.Chatting;
import com.vnua.hieu.entity.User;
import com.vnua.hieu.repository.ChatRepository;
import com.vnua.hieu.repository.UserRepository;
import com.vnua.hieu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@Controller
public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRepository chatRepository;

    @MessageMapping("/hello/{id}")
    public void send(SimpMessageHeaderAccessor sha, @Payload String message,@DestinationVariable String id) {
        System.out.println("sha: "+sha.getUser().getName());
        System.out.println("payload: "+message);
        User userNguoiNhan = userRepository.findById(Long.valueOf(id)).get();
        System.out.println("userss === : "+userNguoiNhan);
        User nguoiGui = userRepository.findByUsername(sha.getUser().getName()).get();
        Chatting chatting = new Chatting();
        chatting.setContent(message);
        chatting.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        chatting.setReceiver(userNguoiNhan);
        chatting.setSender(nguoiGui);
        chatRepository.save(chatting);
        Map<String, Object> map = new HashMap<>();
        map.put("usernguoigui", nguoiGui.getId());
        map.put("avatarnguoigui", nguoiGui.getAvatar());
        simpMessagingTemplate.convertAndSendToUser(userNguoiNhan.getUsername(), "/queue/messages", message,map);
    }
}
