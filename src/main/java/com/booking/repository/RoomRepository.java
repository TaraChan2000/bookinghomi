package com.booking.repository;

import com.booking.dto.AddressDto;
import com.booking.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query(value = "select * from room where user_id = ?1 and actived = ?2 and deleted = ?3",nativeQuery = true)
    public List<Room> getRoomOfProfileUser(Long userId, Integer actived, Integer deleted);

    @Query(value = "select count(*) from room where user_id = ?1 and actived = ?2 and deleted = ?3",nativeQuery = true)
    public Long countRoomProfile(Long userId, Integer actived, Integer deleted);

    @Query(value = "SELECT * from room where deleted = ?1 order by actived asc, createdDate asc",nativeQuery = true)
    public List<Room> findAllByRoleAdmin(Integer deleted);

    @Query(value = "select * from room where deleted = ?1 and actived = ?2 order by createdDate desc",nativeQuery = true)
    public Page<Room> findIndex(Integer deleted, Integer actived, Pageable pageable);


    @Query(value = "select * from room where deleted = ?1 and actived = ?2 and sex = ?3 and price>= ?4 and price <= ?5 order by createdDate desc",nativeQuery = true)
    public List<Room> search(Integer deleted, Integer actived, String sex, Double small, Double lager);

    @Query(value = "select * from room where deleted = ?1 and actived = ?2 and sex = ?3 and price>= ?4 and price <= ?5 and village_id = ?6 order by createdDate desc",nativeQuery = true)
    public List<Room> searchFull(Integer deleted, Integer actived, String sex, Double small, Double lager, Long idVillage);

    @Query(value = "select * from room where deleted = ?1 and actived = ?2 and id = ?3",nativeQuery = true)
    public Optional<Room> findByIdForUser(Integer deleted, Integer actived, Long idRoom);

    @Query(value = "select r from Room r\n" +
            " inner join r.address v inner join v.town t inner join t.province p inner join r.typeRoom tr " +
            "where v.name like ?1 or t.name like ?1 or p.name like ?1 or tr.name like ?1 or r.title like ?1 order by r.censorshipDate desc",nativeQuery = false)
    public Page<Room> searchWithParam(String param, Pageable pageable);

    @Query(value = "select count(id) from room", nativeQuery = true)
    public Long totalRoom();

    @Query(value = "select count(id) from room where deleted = ?1", nativeQuery = true)
    public Long totalDeleteRoom(Integer deleted);

    @Query(value = "select p.name,\n" +
            "(select count(rs.id) from room rs \n" +
            "inner JOIN village v on v.id = rs.village_id\n" +
            "inner join town t on t.id = v.town_id\n" +
            "where t.province_id = p.id) as total\n" +
            "from province p\n" +
            "inner join town t on t.province_id = p.id\n" +
            "inner join village vl on vl.town_id = t.id\n" +
            "inner join room r on r.village_id = vl.id\n" +
            "group by p.id",nativeQuery = true)
    public List<AddressDto> getAddressAndNumRoom();
}
