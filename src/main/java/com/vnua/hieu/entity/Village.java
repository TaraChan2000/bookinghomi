package com.vnua.hieu.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Village")
@Getter
@Setter
@JsonIgnoreProperties(value = {"villages","towns" }, ignoreUnknown = true)
public class Village {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    @JsonIgnoreProperties(value = {"villages","towns" }, ignoreUnknown = true)
    @ManyToOne
    @JoinColumn(name = "town_id")
    private Town town;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonIgnoreProperties(value = {"villages","towns" }, ignoreUnknown = true)
    public Town getTown() {
        return town;
    }

    public void setTown(Town town) {
        this.town = town;
    }
}
