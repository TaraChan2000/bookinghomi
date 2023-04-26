package com.booking.dto;

public class Wards {
    private String name;
    private Integer code;
    private String codename;
    private String division_type;
    private String short_codename;

    public Wards() {
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

    @Override
    public String toString() {
        return "Wards{" +
                "name='" + name + '\'' +
                ", code=" + code +
                ", codename='" + codename + '\'' +
                ", division_type='" + division_type + '\'' +
                ", short_codename='" + short_codename + '\'' +
                '}';
    }
}
