package com.iguanait.test.test;

import com.iguanait.test.test.features.notification.dao.NotificationRepository;
import com.iguanait.test.test.features.notification.services.impl.NotificationServiceImpl;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class NotificationServiceTest {

    @Autowired
    private NotificationRepository repository;

    private NotificationServiceImpl notificationService = new NotificationServiceImpl(repository);

    @Test
    void generateJsonBodyTest(){
        String a = this.notificationService.generateJsonBody("aasd", "asda");
        String b = this.notificationService.generateJsonBody("aasd", "asda");
        Assert.assertEquals(a, b);
    }
}
