package com.booking.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;


@Entity
@Table(name = "utilities")
@Getter
@Setter
public class Utilities {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    private Timestamp createdDate;

    private String icon;

    private String image;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Utilities)) return false;
        Utilities utilities = (Utilities) o;
        return getId().equals(utilities.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
