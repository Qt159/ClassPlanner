package com.tuan.classplanner.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StudentResponse {
    private Integer id;
    private String name;
    private String phone;
    private String address;
    private String note;
}