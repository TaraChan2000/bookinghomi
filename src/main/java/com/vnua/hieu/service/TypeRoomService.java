package com.vnua.hieu.service;

import com.vnua.hieu.entity.TypeRoom;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TypeRoomService {

    public TypeRoom save(TypeRoom typeRoom);

    public void delete(Long id);

    public List<TypeRoom> findAll();
}
