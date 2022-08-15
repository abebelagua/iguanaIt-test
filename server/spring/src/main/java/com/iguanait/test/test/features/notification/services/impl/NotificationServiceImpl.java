package com.iguanait.test.test.features.notification.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iguanait.test.test.common.models.OneSignalResponse;
import com.iguanait.test.test.features.notification.services.NotificationService;
import com.iguanait.test.test.features.notification.dao.NotificationRepository;
import com.iguanait.test.test.features.notification.entities.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;
import java.util.*;

@Service("NotificationServiceImpl")
public class NotificationServiceImpl implements NotificationService {

    private final String REST_API_KEY = "M2Q2YjhiZmItMTVmMy00NjVlLWE2OGMtMzk2M2M0NzVmMTA1";
    private final String APP_ID = "a4381c6a-4ecd-490c-8926-6ec7c9997651";
    private final String ONE_SIGNAL_URL = "https://onesignal.com/api/v1/notifications";

    private final NotificationRepository notificationRepository;

    private final Logger logger = Logger.getLogger(NotificationServiceImpl.class.getName());

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Page<Notification> getAll(Pageable pageable) {
        this.logger.info("Searching all: Notifications");
        return this.notificationRepository.findAll(pageable);
    }

    @Override
    public Notification getOne(Integer id) {
        this.logger.info(String.format("Searching notification with id:%s", id));
        return this.notificationRepository.findById(id).orElse(null);
    }

    @Override
    public Notification create(Notification notification) {
        this.logger.info(String.format("Creating notification with body:%s", notification.toString()));
        return this.notificationRepository.save(notification);
    }

    @Override
    public Notification update(Integer id, Notification notification) {
        Notification notificationUpdated = null;

        this.logger.info(String.format("Updating notification with body:%s and id: %s", notification.toString(), id));
        var notificationOpt = this.notificationRepository.findById(id);
        if (notificationOpt.isPresent()) {
            var notificationGotten = notificationOpt.get();
            notificationGotten.withId(notification.getId())
                    .withOneSignalId(notification.getOneSignalId())
                    .withExternalUserId(notification.getExternalUserId())
                    .withMessage(notification.getMessage())
                    .withJsonBody(notification.getJsonBody());
            notificationUpdated = this.notificationRepository.save(notificationGotten);
        }

        return notificationUpdated;
    }

    @Override
    public Notification delete(Integer id) {
        this.logger.info(String.format("Deleting notification with id: %s", id));
        var notificationOpt = this.notificationRepository.findById(id);

        if (notificationOpt.isPresent()) {
            this.notificationRepository.deleteById(id);
        }

        return notificationOpt.orElse(null);
    }

    @Override
    public String sendMessageToAllUsers(String message) throws IOException {
        var connection = createConnection();
        var jsonBody = generateJsonBody(null, message);

        byte[] bytes = enableStreamingAndCreateByteArray(connection, jsonBody);

        String result = sendRequest(connection, bytes);

        OneSignalResponse oneSignalResponse = new ObjectMapper().readValue(result, OneSignalResponse.class);

        Notification notification = new Notification();
        notification.withOneSignalId(oneSignalResponse.getId())
                .withMessage(message)
                .withExternalUserId("")
                .withJsonBody(jsonBody);
        this.create(notification);

        return result;
    }

    @Override
    public String sendMessageToUser(String userId, String message) throws IOException {
        var connection = createConnection();
        var jsonBody = generateJsonBody(userId, message);

        byte[] bytes = enableStreamingAndCreateByteArray(connection, jsonBody);

        String result = sendRequest(connection, bytes);

        OneSignalResponse oneSignalResponse = new ObjectMapper().readValue(result, OneSignalResponse.class);

        Notification notification = new Notification();
        notification.withOneSignalId(oneSignalResponse.getId())
                .withMessage(message)
                .withExternalUserId(userId)
                .withJsonBody(jsonBody);
        this.create(notification);

        return result;
    }

    @Override
    public String sendMessageToUsersUsingDataTag(String key, String value, String message) throws IOException {
        var connection = createConnection();
        var jsonBody = generateJsonBodyDataTag(key, value, message);

        byte[] bytes = enableStreamingAndCreateByteArray(connection, jsonBody);

        String result = sendRequest(connection, bytes);

        OneSignalResponse oneSignalResponse = new ObjectMapper().readValue(result, OneSignalResponse.class);

        Notification notification = new Notification();
        notification.withOneSignalId(oneSignalResponse.getId())
                .withMessage(message)
                .withTagKey(key)
                .withTagValue(value)
                .withJsonBody(jsonBody);
        this.create(notification);

        return result;
    }

    public HttpURLConnection createConnection() throws IOException {
        var url = new URL(ONE_SIGNAL_URL);
        var connection = url.openConnection();
        configureConnection((HttpURLConnection) connection);
        return (HttpURLConnection) connection;
    }

    public void configureConnection(HttpURLConnection connection) throws ProtocolException {
        connection.setUseCaches(false);
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        connection.setRequestProperty("Authorization", "Basic " + REST_API_KEY);
        connection.setRequestMethod("POST");
    }

    public String generateJsonBody(String userId, String message) {
        return userId == null ? """
                {
                    "app_id": "%s",
                    "included_segments": ["Subscribed Users"],
                    "data": {
                        "foo": "bar"  
                    },
                    "contents": {
                        "en": "%s"
                    }
                }
                """.formatted(APP_ID, message) : """
                {
                    "app_id": "%s",
                    "include_external_user_ids": ["%s"],
                    "channel_for_external_user_ids": "push",
                    "data": {
                        "foo": "bar"  
                    },
                    "contents": {
                        "en": "%s"
                    }
                }
                """.formatted(APP_ID, userId, message);
    }

    public String generateJsonBodyDataTag(String key, String value, String message) {
        return """
                {
                    "app_id": "%s",
                    "filters": [{"field": "tag", "key": "%s", "relation": "=", "value": "%s"}],
                    "data": {
                        "foo": "bar"  
                    },
                    "contents": {
                        "en": "%s"
                    }
                }
                """.formatted(APP_ID, key, value, message);
    }

    public byte[] enableStreamingAndCreateByteArray(HttpURLConnection connection, String jsonBody) {
        var sendBytes = jsonBody.getBytes(StandardCharsets.UTF_8);
        connection.setFixedLengthStreamingMode(sendBytes.length);
        return sendBytes;
    }

    public String sendRequest(HttpURLConnection connection, byte[] sendBytes) throws IOException {
        var outputStream = connection.getOutputStream();
        outputStream.write(sendBytes);
        return createResponseRequest(connection, connection.getResponseCode());
    }

    public String createResponseRequest(HttpURLConnection connection, int httpResponse) throws IOException {
        if (httpResponse >= HttpURLConnection.HTTP_OK && httpResponse < HttpURLConnection.HTTP_BAD_REQUEST) {
            return createJsonResponse(connection.getInputStream());
        } else {
            return createJsonResponse(connection.getErrorStream());
        }
    }

    public String createJsonResponse(InputStream inputStream) {
        var scanner = new Scanner(inputStream, StandardCharsets.UTF_8);

        var jsonResponse = "";
        if (scanner.useDelimiter("\\A").hasNext()) {
            jsonResponse = scanner.next();
        }
        scanner.close();
        return jsonResponse;
    }
}
