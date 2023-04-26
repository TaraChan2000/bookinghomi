package com.booking.chat;

import com.booking.entity.User;
import com.booking.repository.ChatRepository;
import com.booking.repository.UserRepository;
import com.booking.entity.Chatting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

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
        com.booking.entity.User userNguoiNhan = userRepository.findById(Long.valueOf(id)).get();
        System.out.println("userss === : "+userNguoiNhan);
        com.booking.entity.User nguoiGui = userRepository.findByUsername(sha.getUser().getName()).get();
        Chatting chatting = new Chatting();
        chatting.setContent(message);
        chatting.setTypeFile(0);
        chatting.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        chatting.setReceiver(userNguoiNhan);
        chatting.setSender(nguoiGui);
        chatRepository.save(chatting);
        Map<String, Object> map = new HashMap<>();
        map.put("usernguoigui", nguoiGui.getId());
        map.put("avatarnguoigui", nguoiGui.getAvatar());
        map.put("typefile", 0);
        map.put("filename", "");
        simpMessagingTemplate.convertAndSendToUser(userNguoiNhan.getUsername(), "/queue/messages", message,map);
    }

    @MessageMapping("/file/{id}/{filename}")
    public void sendFile(SimpMessageHeaderAccessor sha, @Payload String message,@DestinationVariable String id,
                         @DestinationVariable String filename) {
        System.out.println("sha: "+sha.getUser().getName());
        System.out.println("payload: "+message);
        com.booking.entity.User userNguoiNhan = userRepository.findById(Long.valueOf(id)).get();
        System.out.println("userss === : "+userNguoiNhan);
        User nguoiGui = userRepository.findByUsername(sha.getUser().getName()).get();
        Chatting chatting = new Chatting();
        chatting.setContent(message);
        chatting.setTypeFile(1);
        chatting.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        chatting.setReceiver(userNguoiNhan);
        chatting.setSender(nguoiGui);
        chatting.setFileName(filename);
        chatRepository.save(chatting);
        Map<String, Object> map = new HashMap<>();
        map.put("usernguoigui", nguoiGui.getId());
        map.put("avatarnguoigui", nguoiGui.getAvatar());
        map.put("typefile", 1);
        map.put("filename", filename);
        simpMessagingTemplate.convertAndSendToUser(userNguoiNhan.getUsername(), "/queue/messages", message,map);
    }
}
