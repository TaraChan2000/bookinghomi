package com.vnua.hieu.service.imp;

import com.vnua.hieu.entity.RoomImage;
import com.vnua.hieu.service.RoomImageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomImageImp implements RoomImageService {
    @Override
    public RoomImage save(RoomImage roomImage) {
        return null;
    }

    @Override
    public List<RoomImage> findByRoom(Long roomId) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
