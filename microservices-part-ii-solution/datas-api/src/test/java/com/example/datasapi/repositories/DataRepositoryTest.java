package com.example.datasapi.repositories;

import com.example.datasapi.models.Data;
import com.google.common.collect.Iterables;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DataRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private DataRepository dataRepository;

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

        entityManager.persist(firstData);
        entityManager.persist(secondData);
        entityManager.flush();
    }

    @Test
    public void findAll_returnsAllDatas() {
        Iterable<Data> datasFromDb = dataRepository.findAll();

        assertThat(Iterables.size(datasFromDb), is(2));
    }

    @Test
    public void findAll_returnsFace() {
        Iterable<Data> datasFromDb = dataRepository.findAll();

        String secondDatasFace = Iterables.get(datasFromDb, 1).getFace();

        assertThat(secondDatasFace, is("[{},{},{}]"));
    }

    @Test
    public void findAll_returnsImage() {
        Iterable<Data> datasFromDb = dataRepository.findAll();

        String secondDatasImage = Iterables.get(datasFromDb, 1).getImage();

        assertThat(secondDatasImage, is("https://i.pinimg.com/originals/f7/bd/0c/f7bd0c57ff9d04132455c55b32421f8c.jpg"));
    }

    @Test
    public void findAll_returnsFavorite() {
        Iterable<Data> datasFromDb = dataRepository.findAll();

        Boolean secondDatasFavorite = Iterables.get(datasFromDb, 1).getFavorite();

        assertThat(secondDatasFavorite, is(true));
    }

}
