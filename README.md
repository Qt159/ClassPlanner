# Hệ Thống Quản Lý Lịch Dạy Gia Sư

## Giới thiệu

Hệ thống quản lý lịch dạy gia sư là ứng dụng hỗ trợ gia sư quản lý học sinh, lịch dạy và thông báo nhắc lịch. Ứng dụng được xây dựng cho **một người dùng**, không yêu cầu đăng nhập và tập trung vào việc quản lý lịch dạy hằng ngày.

---

# Mục tiêu

* Quản lý thông tin học sinh.
* Quản lý lịch dạy.
* Nhắc lịch trước giờ dạy.
* Theo dõi trạng thái các buổi học.
* Thống kê số buổi đã dạy theo tháng.

---

# Chức năng

## 1. Quản lý học sinh

Cho phép:

* Thêm học sinh.
* Cập nhật thông tin học sinh.
* Xóa học sinh.
* Xem danh sách học sinh.
* Xem chi tiết học sinh.

Thông tin lưu trữ:

* Họ tên.
* Số điện thoại.
* Địa chỉ.
* Ghi chú.

---

## 2. Quản lý lịch dạy

Cho phép:

* Thêm buổi dạy.
* Chỉnh sửa buổi dạy.
* Xóa buổi dạy.
* Xem danh sách buổi dạy.
* Xem lịch theo ngày.
* Xem lịch theo tuần.
* Xem lịch theo tháng.

Thông tin của một buổi dạy:

* Học sinh.
* Môn học.
* Tiêu đề.
* Thời gian bắt đầu.
* Thời gian kết thúc.
* Địa điểm dạy.
* Ghi chú.
* Thời gian nhắc lịch.
* Trạng thái.

Trạng thái buổi học:

* SCHEDULED
* COMPLETED
* CANCELLED

---

## 3. Thông báo

Hệ thống tự động tạo thông báo trước giờ dạy thông qua Spring Scheduler.

Cho phép:

* Xem danh sách thông báo.
* Đánh dấu đã đọc.

---

## 4. Dashboard

Hiển thị:

* Lịch dạy hôm nay.
* Buổi dạy sắp diễn ra.
* Các buổi chưa hoàn thành.
* Thống kê số buổi đã dạy trong tháng.

---

# Công nghệ sử dụng

## Backend

* Java 21
* Spring Boot 3
* Spring Web
* Spring Data JPA
* PostgreSQL (Supabase)
* Hibernate
* Lombok
* Spring Validation
* Spring Scheduler
* Swagger / OpenAPI

## Frontend

* React
* TypeScript
* Vite
* Axios
* Tailwind CSS
* FullCalendar

---

# Kiến trúc hệ thống

```text
React Web
     │
     │ REST API
     ▼
Spring Boot
     │
     ├── Spring Scheduler
     │
     ▼
PostgreSQL (Supabase)
```

---

# Cấu trúc dự án

```text
src/main/java

├── common
│
├── config
│
├── dashboard
│   ├── controller
│   └── service
│
├── student
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   └── dto
│
├── session
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   └── dto
│
├── notification
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   └── dto
│
└── exception
```

---

# Thiết kế cơ sở dữ liệu

## Bảng Student

| Tên cột | Kiểu dữ liệu | Mô tả         |
| ------- | ------------ | ------------- |
| id      | Integer      | Khóa chính    |
| name    | VARCHAR(100) | Tên học sinh  |
| phone   | VARCHAR(20)  | Số điện thoại |
| address | TEXT         | Địa chỉ       |
| note    | TEXT         | Ghi chú       |

---

## Bảng TeachingSession

| Tên cột          | Kiểu dữ liệu | Mô tả                              |
| ---------------- | ------------ | ---------------------------------- |
| id               | Integer      | Khóa chính                         |
| student_id       | Integer      | Khóa ngoại đến Student             |
| subject          | VARCHAR(100) | Môn học                            |
| title            | VARCHAR(100) | Tiêu đề buổi học                   |
| start_time       | TIMESTAMP    | Thời gian bắt đầu                  |
| end_time         | TIMESTAMP    | Thời gian kết thúc                 |
| custom_location  | TEXT         | Địa điểm nếu khác địa chỉ mặc định |
| note             | TEXT         | Ghi chú                            |
| reminder_minutes | INTEGER      | Nhắc trước bao nhiêu phút          |
| status           | ENUM         | SCHEDULED, COMPLETED, CANCELLED    |

---

## Bảng Notification

| Tên cột    | Kiểu dữ liệu | Mô tả                          |
| ---------- | ------------ | ------------------------------ |
| id         | Integer      | Khóa chính                     |
| session_id | Integer      | Khóa ngoại đến TeachingSession |
| title      | VARCHAR(200) | Tiêu đề                        |
| message    | TEXT         | Nội dung thông báo             |
| is_read    | BOOLEAN      | Đã đọc hay chưa                |
| created_at | TIMESTAMP    | Thời gian tạo                  |

---

# Quan hệ giữa các bảng

* Một học sinh có nhiều buổi dạy.
* Một buổi dạy có thể sinh nhiều thông báo.

---

# Thiết kế REST API

## Dashboard

| Method | Endpoint         | Mô tả                 |
| ------ | ---------------- | --------------------- |
| GET    | `/api/dashboard` | Lấy dữ liệu Dashboard |

---

## Student API

| Method | Endpoint             | Mô tả                  |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/students`      | Lấy danh sách học sinh |
| GET    | `/api/students/{id}` | Lấy chi tiết học sinh  |
| POST   | `/api/students`      | Thêm học sinh          |
| PUT    | `/api/students/{id}` | Cập nhật học sinh      |
| DELETE | `/api/students/{id}` | Xóa học sinh           |

---

## Teaching Session API

| Method | Endpoint                    | Mô tả                  |
| ------ | --------------------------- | ---------------------- |
| GET    | `/api/sessions`             | Lấy danh sách buổi dạy |
| GET    | `/api/sessions/{id}`        | Lấy chi tiết buổi dạy  |
| POST   | `/api/sessions`             | Thêm buổi dạy          |
| PUT    | `/api/sessions/{id}`        | Cập nhật buổi dạy      |
| DELETE | `/api/sessions/{id}`        | Xóa buổi dạy           |
| PATCH  | `/api/sessions/{id}/status` | Cập nhật trạng thái    |

---

## Notification API

| Method | Endpoint                       | Mô tả                   |
| ------ | ------------------------------ | ----------------------- |
| GET    | `/api/notifications`           | Lấy danh sách thông báo |
| PATCH  | `/api/notifications/{id}/read` | Đánh dấu đã đọc         |

---

# Luồng hoạt động

## Thêm buổi dạy

```
React
    │
    ▼
POST /api/sessions
    │
    ▼
SessionController
    │
    ▼
SessionService
    │
    ▼
SessionRepository
    │
    ▼
PostgreSQL
```

---

## Hiển thị Dashboard

```
React
    │
    ▼
GET /api/dashboard
    │
    ▼
DashboardController
    │
    ▼
DashboardService
    │
    ▼
TeachingSessionRepository
NotificationRepository
    │
    ▼
PostgreSQL
```

---

## Scheduler tạo thông báo

Spring Scheduler chạy mỗi phút:

```
Scheduler
    │
    ▼
Kiểm tra các buổi dạy sắp bắt đầu
    │
    ▼
Tạo Notification
    │
    ▼
Lưu vào PostgreSQL
```

---

# Thống kê

Hệ thống không lưu số buổi đã dạy trong cơ sở dữ liệu.

Thống kê được tính trực tiếp từ bảng **TeachingSession** dựa trên:

* Tháng.
* Năm.
* Trạng thái COMPLETED.

Ví dụ:

* Số buổi đã dạy trong tháng.
* Số buổi đã hủy.
* Số buổi sắp diễn ra.
* Thống kê theo từng học sinh.

---

# Hướng phát triển

* Kéo thả lịch (Drag & Drop).
* Bộ lọc theo học sinh.
* Bộ lọc theo trạng thái.

