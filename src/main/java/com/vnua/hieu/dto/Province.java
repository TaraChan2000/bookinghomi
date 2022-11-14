package com.vnua.hieu.dto;

import java.util.ArrayList;
import java.util.List;

public class Province {
    private String name;
    private Integer code;
    private String codename;
    private String division_type;
    private Integer phone_code;
    private List<Districts> districts = new ArrayList<>();

    public Province() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getCodename() {
        return codename;
    }

    public void setCodename(String codename) {
        this.codename = codename;
    }

    public String getDivision_type() {
        return division_type;
    }

    public void setDivision_type(String division_type) {
        this.division_type = division_type;
    }

    public Integer getPhone_code() {
        return phone_code;
    }

    public void setPhone_code(Integer phone_code) {
        this.phone_code = phone_code;
    }

    public List<Districts> getDistricts() {
        return districts;
    }

    public void setDistricts(List<Districts> districts) {
        this.districts = districts;
    }

    @Override
    public String toString() {
        return "Province{" +
                "name='" + name + '\'' +
                ", code=" + code +
                ", codename='" + codename + '\'' +
                ", division_type='" + division_type + '\'' +
                ", phone_code=" + phone_code +
                ", districts=" + districts +
                '}';
    }
}
