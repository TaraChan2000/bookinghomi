package com.booking.repository;

import com.booking.entity.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomStatusRepository extends JpaRepository<RoomStatus,Long> {
}
