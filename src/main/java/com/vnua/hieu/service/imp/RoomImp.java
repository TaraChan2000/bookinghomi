package com.vnua.hieu.service.imp;

import com.vnua.hieu.entity.Room;
import com.vnua.hieu.service.RoomService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class RoomImp implements RoomService {
    @Override
    public Room save(Room room) {
        return null;
    }

    @Override
    public Room active(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public Page<Room> findByUserId(Long userId, Pageable pageable) {
        return null;
    }

    @Override
    public Page<Room> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Page<Room> search(String param, Pageable pageable) {
        return null;
    }

    @Override
    public Page<Room> searchAdvance(String province, String town, String village, Double priceSmall, Double priceLager, List<Long> listUtility, Long typeRoom_id, Pageable pageable) {
        return null;
    }

    @Override
    public Long totalRoomBetweenDate(Date startDate, Date endDate) {
        return null;
    }

    @Override
    public Page<Room> getRoomIsBlock(Pageable pageable) {
        return null;
    }
}
