package com.vnua.hieu.service;

import com.vnua.hieu.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public interface RoomService {

    public Room save(Room room);

    public Room active(Long id);

    public void delete(Long id);

    public Page<Room> findByUserId(Long userId, Pageable pageable);

    public Page<Room> findAll(Pageable pageable);

    public Page<Room> search(String param, Pageable pageable);

    public Page<Room> searchAdvance(String province, String town, String village, Double priceSmall,
                                    Double priceLager, List<Long> listUtility, Long typeRoom_id, Pageable pageable);

    public Long totalRoomBetweenDate(Date startDate, Date endDate);

    public Page<Room> getRoomIsBlock(Pageable pageable);

}
