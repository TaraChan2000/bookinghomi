package com.vnua.hieu.dto;

import com.vnua.hieu.entity.TypeRoom;
import com.vnua.hieu.entity.Utilities;
import com.vnua.hieu.entity.Village;

import java.util.List;

public class SearchDto {
    private Village village;
    private Double priceSmall;
    private Double priceLarge;
    private String sex;
    private List<Utilities> utilities;
    private List<TypeRoom> typeRooms;

    public Village getVillage() {
        return village;
    }

    public void setVillage(Village village) {
        this.village = village;
    }

    public Double getPriceSmall() {
        return priceSmall;
    }

    public void setPriceSmall(Double priceSmall) {
        this.priceSmall = priceSmall;
    }

    public Double getPriceLarge() {
        return priceLarge;
    }

    public void setPriceLarge(Double priceLarge) {
        this.priceLarge = priceLarge;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public List<Utilities> getUtilities() {
        return utilities;
    }

    public void setUtilities(List<Utilities> utilities) {
        this.utilities = utilities;
    }

    public List<TypeRoom> getTypeRooms() {
        return typeRooms;
    }

    public void setTypeRooms(List<TypeRoom> typeRooms) {
        this.typeRooms = typeRooms;
    }

    @Override
    public String toString() {
        return "SearchDto{" +
                "village=" + village +
                ", priceSmall=" + priceSmall +
                ", priceLarge=" + priceLarge +
                ", sex='" + sex + '\'' +
                ", utilities=" + utilities +
                ", typeRooms=" + typeRooms +
                '}';
    }
}
