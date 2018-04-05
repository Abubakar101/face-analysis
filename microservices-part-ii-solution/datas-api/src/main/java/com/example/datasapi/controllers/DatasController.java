package com.example.datasapi.controllers;


import com.example.datasapi.models.Data;
import com.example.datasapi.repositories.DataRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.datasapi.models.Data;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RestController
public class DatasController {

    @Autowired
    private DataRepository dataRepository;

    @GetMapping("/")
    public Iterable<Data> findAllDatas() {
        return dataRepository.findAll();
    }

    @GetMapping("/{dataId}")
    public Data findDataById(@PathVariable Long dataId) throws NotFoundException {

        Data foundData = dataRepository.findOne(dataId);

        if (foundData == null) {
            throw new NotFoundException("Data with ID of " + dataId + " was not found!");
        }


        return foundData;
    }

    @DeleteMapping("/{dataId}")
    public HttpStatus deleteDataById(@PathVariable Long dataId) throws EmptyResultDataAccessException {
        dataRepository.delete(dataId);
        return HttpStatus.OK;
    }

//    @PostMapping("/")
    @RequestMapping(method = RequestMethod.POST, value = "/")
    public Data createNewData(@RequestBody Data newData) {

        return  dataRepository.save(newData);
    }

    @PatchMapping("/{dataId}")
    public Data updateDataById(@PathVariable Long dataId, @RequestBody Data dataRequest) throws NotFoundException {
        Data dataFromDb = dataRepository.findOne(dataId);

        if (dataFromDb == null) {
            throw new NotFoundException("Data with ID of " + dataId + " was not found!");
        }

        Data foundData = dataRepository.findOne(dataId);

        dataFromDb.setFace(foundData.getFace());
        dataFromDb.setImage(foundData.getImage());
        dataFromDb.setFavorite(dataRequest.getFavorite());

        System.out.println("Boolean");
        System.out.println(dataRequest.getFavorite());
        System.out.println(foundData.getFace());
        System.out.println(foundData.getImage());

        return dataRepository.save(dataFromDb);
    }

    @ExceptionHandler
    void handleDataNotFound(
            NotFoundException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    @ExceptionHandler
    void handleDeleteNotFoundException(
            EmptyResultDataAccessException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value());
    }
}
