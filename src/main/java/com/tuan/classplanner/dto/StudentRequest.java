package com.tuan.classplanner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentRequest {
    @NotBlank(message = "Tên học viên không được để trống")
    @Size(max = 100, message = "Tên học viên không được vượt quá 100 ký tự")
    private String name;
    @Size(max = 20, message = "Số điện thoại không được vượt quá 20 ký tự")
    private String phone;

    private String address;

    private String note;
}