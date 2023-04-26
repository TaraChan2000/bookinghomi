package com.booking.service.imp;

import com.booking.entity.RoomImage;
import com.booking.service.RoomImageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomStatusImp implements RoomImageService {
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
