package com.vnua.hieu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "history_search")
@Getter
@Setter
public class HistorySearch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String content;

    private Timestamp searchDate;

    private Integer deleted;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
