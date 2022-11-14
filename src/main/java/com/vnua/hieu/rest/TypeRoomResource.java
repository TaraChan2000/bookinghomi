package com.vnua.hieu.rest;

import com.vnua.hieu.entity.TypeRoom;
import com.vnua.hieu.repository.TypeRoomRepository;
import com.vnua.hieu.service.TypeRoomService;
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
