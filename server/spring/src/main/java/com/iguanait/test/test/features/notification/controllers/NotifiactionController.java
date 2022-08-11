package com.iguanait.test.test.features.notification.controllers;

import com.iguanait.test.test.features.notification.entities.Notification;
import com.iguanait.test.test.features.notification.services.NotificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notification")
public class NotifiactionController {

    private final NotificationService notificationService;

    public NotifiactionController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    Page<Notification> getAll(@PageableDefault(value = 20, sort = "id") Pageable pageable) {
        return this.notificationService.getAll(pageable);
    }

    @GetMapping
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    Notification getOne(@PathVariable("id") Integer id) {
        return this.notificationService.getOne(id);
    }

    @PostMapping
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    Notification create(@RequestBody Notification notification) throws Exception {
        return this.notificationService.create(notification);
    }

    @PostMapping
    @RequestMapping(value = "/sendToAll/{message}", method = RequestMethod.POST)
    String sendToAll(@PathVariable("message") String message) throws Exception {
        return this.notificationService.sendMessageToAllUsers(message);
    }

    @PostMapping
    @RequestMapping(value = "/sendToOne/{userId}/{message}", method = RequestMethod.POST)
    String sendToOne(@PathVariable("userId") String userId, @PathVariable("message") String message) throws Exception {
        return this.notificationService.sendMessageToUser(userId, message);
    }

    @PutMapping
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    Notification update(@PathVariable("id") Integer id,
                        @RequestBody Notification notification)
            throws Exception {
        return this.notificationService.update(id, notification);
    }

    @DeleteMapping
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    Notification delete(@PathVariable("id") Integer id) throws Exception {
        return this.notificationService.delete(id);
    }
}
