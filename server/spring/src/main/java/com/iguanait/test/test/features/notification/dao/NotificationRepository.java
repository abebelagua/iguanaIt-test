package com.iguanait.test.test.features.notification.dao;

import com.iguanait.test.test.features.notification.entities.Notification;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface NotificationRepository extends CrudRepository<Notification, Integer>
        , PagingAndSortingRepository<Notification, Integer> {
}
