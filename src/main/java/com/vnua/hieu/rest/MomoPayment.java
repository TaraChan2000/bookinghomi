package com.vnua.hieu.rest;

import com.vnua.edu.hieu.config.Environment;
import com.vnua.edu.hieu.enums.RequestType;
import com.vnua.edu.hieu.models.PaymentResponse;
import com.vnua.edu.hieu.models.QueryStatusTransactionResponse;
import com.vnua.edu.hieu.processor.CreateOrderMoMo;
import com.vnua.edu.hieu.processor.QueryTransactionStatus;
import com.vnua.hieu.dto.PaymentDto;
import com.vnua.hieu.dto.ResponsePayment;
import com.vnua.hieu.entity.HistoryPay;
import com.vnua.hieu.entity.PayLevel;
import com.vnua.hieu.entity.User;
import com.vnua.hieu.repository.HistoryPayRepository;
import com.vnua.hieu.repository.PayLevelRepository;
import com.vnua.hieu.repository.UserRepository;
import com.vnua.hieu.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api/user")
public class MomoPayment {

    private final UserService userService;
    private final UserRepository userRepository;
    private final HistoryPayRepository historyPayRepository;
    private final PayLevelRepository payLevelRepository;

    public MomoPayment(UserService userService, UserRepository userRepository, HistoryPayRepository historyPayRepository, PayLevelRepository payLevelRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.historyPayRepository = historyPayRepository;
        this.payLevelRepository = payLevelRepository;
    }

    @PostMapping("/urlpayment")
    public ResponsePayment getUrlPayment(@RequestBody PaymentDto paymentDto){
        String requestId = String.valueOf(System.currentTimeMillis());
        String orderId = String.valueOf(System.currentTimeMillis());
        Environment environment = Environment.selectEnv("dev");
        PaymentResponse captureATMMoMoResponse = null;
        try {
            captureATMMoMoResponse = CreateOrderMoMo.process(environment, orderId, requestId, Long.toString(paymentDto.getAmount()), paymentDto.getContent(), paymentDto.getReturnUrl(), paymentDto.getNotifyUrl(), "", RequestType.PAY_WITH_ATM, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("url ====: "+captureATMMoMoResponse.getPayUrl());
        ResponsePayment responsePayment = new ResponsePayment(captureATMMoMoResponse.getPayUrl(), orderId,requestId);
        return responsePayment;
    }

    @GetMapping("/checkPayment")
    public Integer checkPayment(@RequestParam("orderId") String orderId, @RequestParam("requestId") String requestId) throws Exception {
        Environment environment = Environment.selectEnv("dev");
        QueryStatusTransactionResponse queryStatusTransactionResponse = QueryTransactionStatus.process(environment, orderId, requestId);
        System.out.println("qqqq-----------------------------------------------------------"+queryStatusTransactionResponse.getMessage());
        if(queryStatusTransactionResponse.getResultCode() == 0){
            if(historyPayRepository.findByOrderIDAndRequestId(orderId, requestId).isPresent() == false) {
                User user = userService.getUserWithAuthority();
                user.setMoney(user.getMoney() + queryStatusTransactionResponse.getAmount());
                userRepository.save(user);
                PayLevel payLevel = payLevelRepository.findByAmount(Double.valueOf(queryStatusTransactionResponse.getAmount()));
                HistoryPay historyPay = new HistoryPay();
                historyPay.setPayDate(new Timestamp(System.currentTimeMillis()));
                historyPay.setPayLevel(payLevel);
                historyPay.setUser(user);
                historyPay.setOrderId(orderId);
                historyPay.setRequestId(requestId);
                historyPayRepository.save(historyPay);
                return 1;
            }
        }
        return 0;
    }
}
