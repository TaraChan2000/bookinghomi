package com.booking.dto;

import java.util.ArrayList;
import java.util.List;

public class Districts {
    private String name;
    private Integer code;
    private String codename;
    private String division_type;
    private String short_codename;
    private List<Wards> wards = new ArrayList<>();

    public Districts() {
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

    public String getShort_codename() {
        return short_codename;
    }

    public void setShort_codename(String short_codename) {
        this.short_codename = short_codename;
    }

    public List<Wards> getWards() {
        return wards;
    }

    public void setWards(List<Wards> wards) {
        this.wards = wards;
    }

    @Override
    public String toString() {
        return "Districts{" +
                "name='" + name + '\'' +
                ", code=" + code +
                ", codename='" + codename + '\'' +
                ", division_type='" + division_type + '\'' +
                ", short_codename='" + short_codename + '\'' +
                ", wards=" + wards +
                '}';
    }
}
