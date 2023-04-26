package com.booking.rest;

import com.booking.entity.User;
import com.booking.repository.RoomImageRepository;
import com.booking.repository.RoomRepository;
import com.booking.service.UserService;
import com.booking.entity.RoomImage;
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
