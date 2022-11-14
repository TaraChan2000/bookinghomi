package com.vnua.hieu.repository;

import com.vnua.hieu.entity.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomImageRepository extends JpaRepository<RoomImage, Long> {

    @Query(value = "select * from room_image where room_id = ?1", nativeQuery = true)
    public List<RoomImage> findByRoomId(Long roomId);
}
