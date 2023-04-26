package com.booking.rest;

import com.booking.entity.TypeRoom;
import com.booking.repository.TypeRoomRepository;
import com.booking.service.TypeRoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TypeRoomResource {

    private final TypeRoomService typeRoomService;

    private final TypeRoomRepository typeRoomRepository;

    public TypeRoomResource(TypeRoomService typeRoomService, TypeRoomRepository typeRoomRepository) {
        this.typeRoomService = typeRoomService;
        this.typeRoomRepository = typeRoomRepository;
    }

    @GetMapping("/public/typeRooms")
    public List<TypeRoom> findAll(){
        return typeRoomService.findAll();
    }

    @PostMapping("/admin/typeRooms")
    public TypeRoom save(@RequestBody TypeRoom typeRoom){
        System.out.println("--- typeroom: "+typeRoom);
        return typeRoomRepository.save(typeRoom);
    }
}
