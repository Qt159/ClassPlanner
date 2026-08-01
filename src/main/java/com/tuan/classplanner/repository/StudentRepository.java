package com.tuan.classplanner.repository;

import com.tuan.classplanner.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Integer> {

}
