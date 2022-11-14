package com.vnua.hieu.service;

import com.vnua.hieu.entity.FeedBack;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FeedBackService {

    public FeedBack saveOrUpdate(FeedBack feedBack);

    public List<FeedBack> findAll();

    public List<FeedBack> findByRoom();
}
