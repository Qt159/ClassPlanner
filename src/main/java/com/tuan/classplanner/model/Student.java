package com.tuan.classplanner.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 20)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(columnDefinition = "TEXT")
    private String note;

    @OneToMany(mappedBy = "student")
    private List<TeachingSession> teachingSessions = new ArrayList<>();

    public Student() {
    }

    public Student(String name, String phone, String address, String note) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.note = note;
    }

}