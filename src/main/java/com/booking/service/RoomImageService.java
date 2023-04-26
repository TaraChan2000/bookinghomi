package com.booking.service;

import com.booking.entity.RoomImage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoomImageService {

    public RoomImage save(RoomImage roomImage);

    public List<RoomImage> findByRoom(Long roomId);

    public void delete(Long id);
}
