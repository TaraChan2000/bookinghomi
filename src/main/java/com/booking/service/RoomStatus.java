package com.booking.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoomStatus {

    public RoomStatus save(RoomStatus roomStatus);

    public List<RoomStatus> findAll();

    public void delete(Long id);
}
