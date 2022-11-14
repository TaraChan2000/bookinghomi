package com.vnua.hieu.service.imp;

import com.vnua.hieu.entity.TypeRoom;
import com.vnua.hieu.repository.TypeRoomRepository;
import com.vnua.hieu.service.TypeRoomService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeRoomImp implements TypeRoomService {

    private final TypeRoomRepository typeRoomRepository;

    public TypeRoomImp(TypeRoomRepository typeRoomRepository) {
        this.typeRoomRepository = typeRoomRepository;
    }

    @Override
    public TypeRoom save(TypeRoom typeRoom) {
        return typeRoomRepository.save(typeRoom);
    }

    @Override
    public void delete(Long id) {
        typeRoomRepository.deleteById(id);
    }

    @Override
    public List<TypeRoom> findAll() {
        return typeRoomRepository.findAll();
    }
}
