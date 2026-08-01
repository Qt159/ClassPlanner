package com.tuan.classplanner.service;

import com.tuan.classplanner.dto.StudentRequest;
import com.tuan.classplanner.dto.StudentResponse;
import com.tuan.classplanner.model.Student;
import com.tuan.classplanner.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
@Transactional
public class StudentService {

    private final StudentRepository studentRepository;
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    public StudentResponse createStudent(StudentRequest request) {
        Student student = new Student(
                request.getName(),
                request.getPhone(),
                request.getAddress(),
                request.getNote());
        Student savedStudent = studentRepository.save(student);
        return mapToResponse(savedStudent);}
    public StudentResponse updateStudent(Integer id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        student.setName(request.getName());
        student.setPhone(request.getPhone());
        student.setAddress(request.getAddress());
        student.setNote(request.getNote());
        Student updatedStudent = studentRepository.save(student);
        return mapToResponse(updatedStudent);
    }
    public void deleteStudent(Integer id) {
        if (!studentRepository.existsById(id)) {
            throw new EntityNotFoundException("Student not found");}
        studentRepository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public StudentResponse getStudentById(Integer id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        return mapToResponse(student);
    }
    @Transactional(readOnly = true)
    public List<StudentResponse> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        List<StudentResponse> responses = new ArrayList<>();
        for (Student student : students) {
            responses.add(mapToResponse(student));
        }
        return responses;
    }

    private StudentResponse mapToResponse(Student student) {
        return StudentResponse.builder()
                .id(student.getId())
                .name(student.getName())
                .phone(student.getPhone())
                .address(student.getAddress())
                .note(student.getNote())
                .build();
    }
}