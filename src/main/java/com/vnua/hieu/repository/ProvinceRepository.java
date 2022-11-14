package com.vnua.hieu.repository;

import com.vnua.hieu.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ProvinceRepository extends JpaRepository<Province,Long> {

    @Query(value = "select p.* from province p",nativeQuery = true)
    public List<Province> findAlls();
}
