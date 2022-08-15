package com.iguanait.test.test.features.notification.services;

import com.iguanait.test.test.features.notification.entities.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService {
    Page<Notification> getAll(Pageable pageable);

    Notification getOne(Integer id);

    Notification create(Notification notification) throws Exception;

    Notification update(Integer id, Notification notification) throws Exception;

    Notification delete(Integer id) throws Exception;

    String sendMessageToAllUsers(String message) throws Exception;

    String sendMessageToUser(String userId, String message) throws Exception;

    String sendMessageToUsersUsingDataTag(String key, String value, String message) throws Exception;
}
