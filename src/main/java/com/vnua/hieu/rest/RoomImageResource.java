package com.vnua.hieu.rest;

import com.vnua.hieu.entity.Room;
import com.vnua.hieu.entity.RoomImage;
import com.vnua.hieu.entity.User;
import com.vnua.hieu.repository.RoomImageRepository;
import com.vnua.hieu.repository.RoomRepository;
import com.vnua.hieu.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RoomImageResource {

    private final RoomImageRepository roomImageRepository;
    private final RoomRepository roomRepository;

    private final UserService userService;


    public RoomImageResource(RoomImageRepository roomImageRepository, RoomRepository roomRepository, UserService userService) {
        this.roomImageRepository = roomImageRepository;
        this.roomRepository = roomRepository;
        this.userService = userService;
    }

    @PostMapping("/user/roomImage")
    public ResponseEntity<RoomImage> save(@RequestBody RoomImage roomImage) throws URISyntaxException {
        User user = userService.getUserWithAuthority();
        roomImageRepository.save(roomImage);
        return ResponseEntity.status(200)
                .body(roomImage);
    }

    @GetMapping("/user/deleteImageRoom")
    public void delete(@RequestParam("id") Long id) throws URISyntaxException {
        roomImageRepository.deleteById(id);
    }

    @GetMapping("/public/imageByRoom")
    public List<RoomImage> findByRoomId(@RequestParam("id") Long id){
        return roomImageRepository.findByRoomId(id);
    }
}
