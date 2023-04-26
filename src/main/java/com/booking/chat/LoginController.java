package com.booking.chat;

import com.booking.entity.User;
import com.booking.jwt.JwtTokenProvider;
import com.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/api")
@CrossOrigin
public class LoginController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/public/initsession",method = RequestMethod.GET)
    public String home(HttpSession session, @RequestParam("token") String token){
        Long userId = jwtTokenProvider.getUserIdFromJWT(token);
        User user = userRepository.findById(userId).get();
        System.out.println("------> user: "+user.getId());
        if(user.getId() != null){
            session.setAttribute("iduser", user.getId());
            System.out.println("-----------> session: "+session.getAttribute("iduser"));
            return "redirect:/chat";
        }
        return "";
    }
}
