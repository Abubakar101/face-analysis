package com.example.microservicesandtesting.features;

import com.example.microservicesandtesting.models.Data;
import com.example.microservicesandtesting.repostitories.DataRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.core.Is.is;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class DatasApiFeatureTest {

    @Autowired
    private DataRepository dataRepository;

    @Before
    public void setUp() {
        dataRepository.deleteAll();
    }

    @After
    public void tearDown() {
        dataRepository.deleteAll();
    }

    @Test
    public void shouldAllowFullCrudForAData() throws Exception {
        Data firstData = new Data(
                "[{},{}]",
                "https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg",
                true
        );

        Data secondData = new Data(
                "[{},{},{}]",
                "https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg",
                true
        );

        Stream.of(firstData, secondData)
                .forEach(data -> {
                    dataRepository.save(data);
                });

        when()
                .get("http://localhost:8080/datas/")
                .then()
                .statusCode(is(200))
                .and().body(containsString("https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg"));

        // Test creating a Data
        Data dataNotYetInDb = new Data(
                "[{},{},{},{}]",
                "https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg",
                true
        );

        given()
                .contentType(JSON)
                .and().body(dataNotYetInDb)
                .when()
                .post("http://localhost:8080/datas")
                .then()
                .statusCode(is(200))
                .and().body(containsString("[{},{},{},{}]"));

        // Test get all Datas
        when()
                .get("http://localhost:8080/datas/")
                .then()
                .statusCode(is(200))
                .and().body(containsString("https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg"))
                .and().body(containsString("true"))
                .and().body(containsString("[{},{},{}]"));

        // Test finding one data by ID
        when()
                .get("http://localhost:8080/datas/" + secondData.getId())
                .then()
                .statusCode(is(200))
                .and().body(containsString("[{},{},{}]"))
                .and().body(containsString("https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg"));

        // Test updating a data
        secondData.setFavorite(false);

        given()
                .contentType(JSON)
                .and().body(secondData)
                .when()
                .patch("http://localhost:8080/datas/" + secondData.getId())
                .then()
                .statusCode(is(200))
                .and().body(containsString("false"));

        // Test deleting a data
        when()
                .delete("http://localhost:8080/datas/" + secondData.getId())
                .then()
                .statusCode(is(200));
    }

}
