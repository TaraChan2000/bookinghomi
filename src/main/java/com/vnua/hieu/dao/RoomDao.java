package com.vnua.hieu.dao;

import com.vnua.hieu.dto.SearchDto;
import com.vnua.hieu.entity.Room;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import java.util.List;

@Transactional
@Repository
public class RoomDao {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    public List<Room> finds(){
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        List<Room> list = null;
        System.out.println("session: "+sessionFactory);
        Session session = sessionFactory.openSession();
        System.out.println("session 1: "+session);
        Query query = session.createQuery("FROM Room");
        list = query.getResultList();

        return list;
    }

    public List<Room> search(String sql, SearchDto searchDto, Integer positionNext, Boolean address, Pageable pageable){
        Long str = System.currentTimeMillis();
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        List<Room> list = null;
        Session session = sessionFactory.openSession();
        Query query = session.createQuery(sql);
        query.setParameter(1, searchDto.getPriceSmall());
        query.setParameter(2, searchDto.getPriceLarge());
        query.setParameter(3, searchDto.getSex());
        query.setParameter(4, 0);
        query.setParameter(5, 1);
        if(searchDto.getTypeRooms().size()>0){
            int j =0;
            for(int i=6; i< searchDto.getTypeRooms().size()+6; i++){
                query.setParameter(i, searchDto.getTypeRooms().get(j).getId());
                ++j;
            }

        }
        if(searchDto.getVillage() != null){
            query.setParameter(positionNext, searchDto.getVillage().getId());
        }
        query.setMaxResults(pageable.getPageSize());
        query.setFirstResult(pageable.getPageNumber()*(pageable.getPageSize()));
        list = query.getResultList();
        for(int i=0; i<list.size(); i++){
            if(list.get(i).getUtilities().containsAll(searchDto.getUtilities()) == false){
                list.remove(i);
                --i;
            }
        }
        System.out.println("=== end: "+(System.currentTimeMillis()-str));
        System.out.println("result: === "+list.size());
        session.close();
        return list;
    }
}
