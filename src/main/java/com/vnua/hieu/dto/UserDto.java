package com.vnua.hieu.dto;

import com.vnua.hieu.entity.Authority;
import com.vnua.hieu.entity.User;
import com.vnua.hieu.entity.Village;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;

@Getter
@Setter
public class UserDto {
    private Long id;

    private String username;

    private String email;

    private String phone;

    private Integer actived;

    private String address;

    private String avatar;

    private Integer numOfFree;

    private Double money;

    private Set<Authority> authorities;

    private Village village;

    private Timestamp created_date;

    public UserDto(User user){
        this.actived = user.getActived();
        this.address = user.getAddress();
        this.authorities = user.getAuthorities();
        this.avatar = user.getAvatar();
        this.phone = user.getPhone();
        this.id = user.getId();
        this.email = user.getEmail();
        this.money = user.getMoney();
        this.numOfFree = user.getNumOfFree();
        this.username = user.getUsername();
        this.village = user.getVillage();
        this.created_date = user.getCreated_date();
    }
}
