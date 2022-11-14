package com.vnua.hieu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "type_room")
@Getter
@Setter
@ToString
public class TypeRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    private Timestamp createdDate;

    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TypeRoom)) return false;
        TypeRoom typeRoom = (TypeRoom) o;
        return getId().equals(typeRoom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
