package com.vnua.hieu;

import com.vnua.hieu.entity.Province;
import org.hibernate.Hibernate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication(exclude = HibernateJpaAutoConfiguration.class)
@EnableConfigurationProperties
@EntityScan(basePackages = {"com.vnua.hieu.entity"})  // force scan JPA entities
public class QuanlynhatroApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuanlynhatroApplication.class, args);
    }

}
