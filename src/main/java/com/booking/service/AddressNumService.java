package com.booking.service;

import com.booking.dto.AddressDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class AddressNumService {

    private JdbcTemplate jdbcTemplate;

    public AddressNumService(DataSource dataSource){
        jdbcTemplate = new JdbcTemplate(dataSource);
    }
    public List<AddressDto> findAll(){
        String sql = "select p.name,\n" +
                "(select count(rs.id) from room rs \n" +
                "inner JOIN Village v on v.id = rs.village_id\n" +
                "inner join Town t on t.id = v.town_id\n" +
                "where t.province_id = p.id) as total\n" +
                "from Province p\n" +
                "inner join Town t on t.province_id = p.id\n" +
                "inner join Village vl on vl.town_id = t.id\n" +
                "inner join room r on r.village_id = vl.id\n" +
                "group by p.id";
        List<AddressDto> list = jdbcTemplate.query(sql, new RowMapper<AddressDto>() {
            @Override
            public AddressDto mapRow(ResultSet rs, int rowNum) throws SQLException {
                AddressDto contact = new AddressDto();
                contact.setName(rs.getString("name"));
                contact.setTotal(rs.getLong("total"));
                return contact;
            }

        });

        return list;
    }
}
