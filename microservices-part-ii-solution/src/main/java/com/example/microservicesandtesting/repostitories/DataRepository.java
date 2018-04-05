package com.example.microservicesandtesting.repostitories;

import com.example.microservicesandtesting.models.Data;
import org.springframework.data.repository.CrudRepository;

public interface DataRepository extends CrudRepository<Data, Long> {

}
