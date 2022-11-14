package com.vnua.hieu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "history_pay")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class HistoryPay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private Timestamp payDate;

    private String orderId;

    private String requestId;

    @ManyToOne
    @JoinColumn(name = "paylevel_id")
    private PayLevel payLevel;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
