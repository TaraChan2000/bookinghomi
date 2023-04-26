package com.booking.service.imp;

import com.booking.repository.TypeRoomRepository;
import com.booking.service.TypeRoomService;
import com.booking.entity.TypeRoom;
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
