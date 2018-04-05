package com.example.datasapi.controllers;


import com.example.datasapi.models.Data;
import com.example.datasapi.repositories.DataRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;


import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@WebMvcTest(DatasController.class)
public class DatasControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private Data newData;

    private Data updatedSecondData;


    @Autowired
    private ObjectMapper jsonObjectMapper;


    @MockBean
    private DataRepository mockDataRepository;

    @Before
    public void setUp() {
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

        newData = new Data(
                "[{},{},{},{}]",
                "https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg",
                true
        );
        given(mockDataRepository.save(newData)).willReturn(newData);

        updatedSecondData = new Data(
                "[{},{},{},{},{}]",
                "https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg",
                true
        );
        given(mockDataRepository.save(updatedSecondData)).willReturn(updatedSecondData);

        Iterable<Data> mockDatas =
                Stream.of(firstData, secondData).collect(Collectors.toList());

        given(mockDataRepository.findAll()).willReturn(mockDatas);
        given(mockDataRepository.findOne(1L)).willReturn(firstData);
        given(mockDataRepository.findOne(4L)).willReturn(null);
        doAnswer(invocation -> {
            throw new EmptyResultDataAccessException("ERROR MESSAGE FROM MOCK!!!", 1234);
        }).when(mockDataRepository).delete(4L);


    }

    @Test
    public void findAllData_success_returnsStatusOK() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(status().isOk());
    }

    @Test
    public void findAllData_success_returnAllDataAsJSON() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void findAllData_success_returnDataNameForEachData() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].face", is("[{},{}]")));
    }

    @Test
    public void findAllData_success_returnFaceForEachData() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].face", is("[{},{}]")));
    }

    @Test
    public void findAllData_success_returnImageForEachData() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].image", is("https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg")));
    }

    @Test
    public void findAllData_success_returnFavoriteForEachData() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].favorite", is(true)));
    }

    @Test
    public void findDataById_success_returnsStatusOK() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void findDataById_success_returnFace() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.face", is("[{},{}]")));
    }

    @Test
    public void findDataById_success_returnImage() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.image", is("https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg")));
    }

    @Test
    public void findDataById_success_returnFavorite() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.favorite", is(true)));
    }

    @Test
    public void findDataById_failure_dataNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(get("/4"))
                .andExpect(status().reason(containsString("Data with ID of 4 was not found!")));
    }

    @Test
    public void deleteDataById_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(delete("/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteDataById_success_deletesViaRepository() throws Exception {

        this.mockMvc.perform(delete("/1"));

        verify(mockDataRepository, times(1)).delete(1L);
    }

    @Test
    public void deleteDataById_failure_dataNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(delete("/4"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void createData_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newData))
                )
                .andExpect(status().isOk());
    }

    @Test
    public void createData_success_returnsFace() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newData))
                )
                .andExpect(jsonPath("$.face", is("[{},{},{},{}]")));
    }

    @Test
    public void createData_success_returnsImage() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newData))
                )
                .andExpect(jsonPath("$.image", is("https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg")));
    }

    @Test
    public void createData_success_returnsFavorite() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newData))
                )
                .andExpect(jsonPath("$.favorite", is(true)));
    }

    @Test
    public void updateDataById_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondData))
                )
                .andExpect(status().isOk());
    }

    @Test
    public void updateDataById_success_returnsUpdatedFavorite() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondData))
                )
                .andExpect(jsonPath("$.favorite", is(true)));
    }


    @Test
    public void updateDataById_failure_dataNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(
                        patch("/4")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondData))
                )
                .andExpect(status().isNotFound());
    }

    @Test
    public void updateDataById_failure_dataNotFoundReturnsNotFoundErrorMessage() throws Exception {

        this.mockMvc
                .perform(
                        patch("/4")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondData))
                )
                .andExpect(status().reason(containsString("Data with ID of 4 was not found!")));
    }

}
