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
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    Page<Notification> getAll(@PageableDefault(value = 20, sort = "id") Pageable pageable) {
        return this.notificationService.getAll(pageable);
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    Notification getOne(@PathVariable("id") Integer id) {
        return this.notificationService.getOne(id);
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    Notification create(@RequestBody Notification notification) throws Exception {
        return this.notificationService.create(notification);
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/sendToAll/{message}", method = RequestMethod.POST)
    String sendToAll(@PathVariable("message") String message) throws Exception {
        return this.notificationService.sendMessageToAllUsers(message);
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/sendToOne/{userId}/{message}", method = RequestMethod.POST)
    String sendToOne(@PathVariable("userId") String userId, @PathVariable("message") String message) throws Exception {
        return this.notificationService.sendMessageToUser(userId, message);
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/sendWithTag/{key}/{value}/{message}", method = RequestMethod.POST)
    String sendWithTag(@PathVariable("key") String key, @PathVariable("value") String value, @PathVariable("message") String message) throws Exception {
        return this.notificationService.sendMessageToUsersUsingDataTag(key, value, message);
    }

    @PutMapping
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    Notification update(@PathVariable("id") Integer id,
                        @RequestBody Notification notification)
            throws Exception {
        return this.notificationService.update(id, notification);
    }

    @DeleteMapping
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    Notification delete(@PathVariable("id") Integer id) throws Exception {
        return this.notificationService.delete(id);
    }
}
