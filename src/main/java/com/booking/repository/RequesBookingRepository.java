package com.booking.repository;

import com.booking.entity.RequesBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface RequesBookingRepository extends JpaRepository<RequesBooking,Long> {

    @Query("select r from RequesBooking r where r.room.user.id = ?1")
    public List<RequesBooking> findByUserId(Long userId);

    @Query("select r from RequesBooking r where r.room.user.id = ?1 and r.createdDate >= ?2 and r.createdDate <= ?3")
    public List<RequesBooking> findByUserIdAndDate(Long userId, Date d1, Date d2);

    @Query("select r from RequesBooking r where r.userReques.id = ?1 and r.confirm = ?2")
    public List<RequesBooking> requestSuccessdByUser(Long userId, Integer type);

    @Query("select r from RequesBooking r where r.room.user.id = ?1 and r.confirm = ?2")
    public List<RequesBooking> requestByUserOnwer(Long userId, Integer type);

    @Query("select r from RequesBooking r where r.userReques.id = ?1 and r.createdDate >= ?2 and r.createdDate <= ?3")
    public List<RequesBooking> findByUserNotOwnerAndDate(Long userId, Date d1, Date d2);

    @Query("select r from RequesBooking r where r.room.id = ?1 and r.fromDate >= ?2")
    public List<RequesBooking> findByRoomAndDate(Long roomId, Date d);

    @Query("select r from RequesBooking r where r.room.id = ?3 and ((r.fromDate >= ?1 and r.toDate <= ?2) or (r.fromDate >= ?1 and r.fromDate <= ?2) or (r.toDate >= ?1 and r.toDate <= ?2) or(r.fromDate <= ?1 and r.toDate >= ?2))")
    List<RequesBooking> findByDateAndRoom(Date d1, Date d2, Long roomid);
}
