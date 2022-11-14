package com.vnua.hieu.rest;

import com.vnua.hieu.dao.RoomDao;
import com.vnua.hieu.dto.AddressDto;
import com.vnua.hieu.dto.SearchDto;
import com.vnua.hieu.entity.Room;
import com.vnua.hieu.entity.TypeRoom;
import com.vnua.hieu.entity.User;
import com.vnua.hieu.entity.Utilities;
import com.vnua.hieu.repository.RoomRepository;
import com.vnua.hieu.repository.UserRepository;
import com.vnua.hieu.service.AddressNumService;
import com.vnua.hieu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RoomResource {

    private final RoomRepository roomRepository;

    private final UserService userService;

    private final UserRepository userRepository;

    @Autowired
    private AddressNumService addressNumService;

    private final RoomDao roomDao;

    public RoomResource(RoomRepository roomRepository, UserService userService, UserRepository userRepository, RoomDao roomDao) {
        this.roomRepository = roomRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.roomDao = roomDao;
    }

    @GetMapping("/admin/getAllRoom")
    public List<Room> findAll(){
        return roomRepository.findAllByRoleAdmin(0);
    }

    public ResponseEntity<Room> uploadRoom(@RequestBody Room room) throws URISyntaxException {
        Room result = roomRepository.save(room);

        return ResponseEntity
                .created(new URI("/api/admin/saveutilities" + result.getId()))
                .body(result);
    }

    @PostMapping("/user/rooms")
    public ResponseEntity<Room> save(@RequestBody Room room) throws URISyntaxException {
        User user = userService.getUserWithAuthority();
        room.setUser(user);
        room.setActived(0);
        if(user.getNumOfFree() > 0){
            user.setNumOfFree(user.getNumOfFree() - 1);
        }
        else if(user.getNumOfFree() == 0 && user.getMoney() < 5000){
            return ResponseEntity.status(300).body(room);
        }
        else if(user.getMoney() > 5000){
            user.setMoney(user.getMoney() - 5000);
        }

        room.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        Room result = roomRepository.save(room);
        userRepository.save(user);

        System.out.println(result);
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("/user/updaterooms")
    public ResponseEntity<Room> update(@RequestBody Room room) throws URISyntaxException {
        User user = userService.getUserWithAuthority();
        Room r = roomRepository.findById(room.getId()).get();
        room.setCensorshipDate(r.getCensorshipDate());
        room.setCreatedDate(r.getCreatedDate());
        System.out.println("room update: "+room);
        if(r.getUser().getId() != user.getId()){
            return ResponseEntity.status(500).body(null);
        }
        room.setUser(user);

        Room result = roomRepository.save(room);
        userRepository.save(user);

        System.out.println(result);
        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/admin/activeOrUnactiveRoom")
    public void activeRoom(@RequestParam("id") Long id){
        Room result = roomRepository.findById(id).get();
        result.setCensorshipDate(new Timestamp(System.currentTimeMillis()));
        if(result.getActived() == 0){
            result.setActived(1);
        }
        else{
            result.setActived(0);
        }

        roomRepository.save(result);
    }

    @GetMapping("/public/roomOfProfileUser")
    public List<Room> getRoomOfProfileUser(@RequestParam("id") Long id){
        return roomRepository.getRoomOfProfileUser(id,1,0);
    }

    @GetMapping("/user/roomOfMyProfile")
    public List<Room> getRoomOfMyProfile(){
        User user = userService.getUserWithAuthority();
        return roomRepository.getRoomOfProfileUser(user.getId(),1,0);
    }

    @GetMapping("/user/roomNotActiveOfMyProfile")
    public List<Room> getRoomNotActiveOfMyProfile(){
        User user = userService.getUserWithAuthority();
        return roomRepository.getRoomOfProfileUser(user.getId(),0,0);
    }

    @GetMapping("/user/roomDeletedOfMyProfile")
    public List<Room> getRoomDeletedOfMyProfile(){
        User user = userService.getUserWithAuthority();
        return roomRepository.getRoomOfProfileUser(user.getId(),1,1);
    }

    @GetMapping("/user/countRoomProfile")
    public Map<String,Long> countRoomProfile(){
        User user = userService.getUserWithAuthority();
        Map<String,Long> map = new HashMap<>();
        map.put("daduyet", roomRepository.countRoomProfile(user.getId(),1,0));
        map.put("chuaduyet", roomRepository.countRoomProfile(user.getId(),0,0));
        map.put("daxoa", roomRepository.countRoomProfile(user.getId(),1,1));
        return map;
    }


    @GetMapping("/public/findAlls")
    public List<Room> findAlls(){
        Long str = System.currentTimeMillis();
        List<Room> list = roomDao.finds();
        Long ss = System.currentTimeMillis() - str;
        System.out.println("=====> "+ ss);
        return list;
    }

    @PostMapping("/user/deleteOrRestore")
    public ResponseEntity<Void> deleteOrRestore(@RequestParam("id") Long id){
        User user = userService.getUserWithAuthority();
        Room room = roomRepository.findById(id).get();
        if(room.getUser().getId() != user.getId()){
            return ResponseEntity.status(300).body(null);
        }
        else if(room.getActived() == 1 && room.getDeleted()==0 && room.getUser().getId() == user.getId()){
            room.setDeleted(1);
            roomRepository.save(room);
        }
        else if(room.getActived() == 1 && room.getDeleted()==1 && room.getUser().getId() == user.getId()){
            room.setDeleted(0);
            roomRepository.save(room);
        }
        return ResponseEntity.status(200).body(null);
    }

    @GetMapping("/public/roomIndexPage")
    public Page<Room> loadIndexPage(Pageable pageable){
        return roomRepository.findIndex(0,1,pageable);
    }

//    @PostMapping("/public/search")
//    public List<Room> search(@RequestBody SearchDto searchDto, Pageable pageable){
//        Long str = System.currentTimeMillis();
//        System.out.println("----> search: "+searchDto);
//        String sql = "select r from Room r inner join r.typeRoom t inner join r.address v " +
//                "where r.price > ?1 and r.price < ?2 and r.sex = ?3 and r.deleted = ?4 and r.actived = ?5";
//        int position = 6;
//        if(searchDto.getTypeRooms().size() > 0){
//            int k = 0;
//            for(TypeRoom t : searchDto.getTypeRooms()){
//                if(k == 0){
//                    sql += " and (t.id = ?"+position;
//                }
//                else{
//                    sql += " or t.id = ?"+position;
//                }
//                ++position;
//                ++k;
//            }
//            sql += " )";
//        }
//        if(searchDto.getVillage() != null){
//            sql += " and v.id = ?"+position;
//        }
//
//        sql += " group by r.id order by r.createdDate desc";
//        return roomDao.search(sql, searchDto, position,searchDto.getVillage() == null,pageable);
//    }

    @PostMapping("/public/search")
    public List<Room> searchFull(@RequestBody SearchDto searchDto){
        System.out.println(searchDto);
        List<Room> list = null;
        if(searchDto.getVillage() == null){
            list = roomRepository.search(0,1,searchDto.getSex(), searchDto.getPriceSmall(), searchDto.getPriceLarge());
        }
        else{
            list = roomRepository.searchFull(0,1,searchDto.getSex(), searchDto.getPriceSmall(), searchDto.getPriceLarge(), searchDto.getVillage().getId());
        }
        System.out.println("result before: "+list.size());
        for(int i=0; i<list.size(); i++){
            if(searchDto.getUtilities().size()>0){
                if(list.get(i).getUtilities().containsAll(searchDto.getUtilities()) == false){
                    list.remove(i);
                    --i;
                    continue;
                }
            }
            if(searchDto.getTypeRooms().size() != 0){
                if(searchDto.getTypeRooms().contains(list.get(i).getTypeRoom()) == false){
                    list.remove(i);
                    --i;
                    continue;
                }
            }

        }
        System.out.println("list result: "+list.size());
        return list;
    }


    @GetMapping("/public/detailRoomForUser")
    public Room findByIdForUser(@RequestParam("id") Long id){
        return roomRepository.findByIdForUser(0,1,id).get();
    }

    @GetMapping("/public/detailRoomForAll")
    public Room findByIdForAll(@RequestParam("id") Long id){
        return roomRepository.findById(id).get();
    }

    @GetMapping("/public/searchParam")
    public Page<Room> searchParam(@RequestParam("search") String param, Pageable pageable){
        for(int i=0; i<param.length(); i++){
            if(param.charAt(i) == ','){
                param = param.split(",")[0];
                break;
            }
        }
        return roomRepository.searchWithParam("%"+param+"%",pageable);
    }

    @GetMapping("/admin/totalRoom")
    public List<Long> totalRoom(){
        List<Long> list = new ArrayList<>();
        // tong phong
        list.add(roomRepository.totalRoom());
        // tong phong xoa
        list.add(roomRepository.totalDeleteRoom(1));

        return list;
    }

    @GetMapping("/admin/addressAndNum")
    public List<AddressDto> findAllAddressDto(){
        return addressNumService.findAll();
    }
}
