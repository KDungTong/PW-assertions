# Playwright Assertions hướng dẫn

Tài liệu tổng hợp các assertion quan trọng trong Playwright, được chuẩn hóa để dễ đọc, dễ maintain và phù hợp sử dụng trong team.

---

## 1. Mục đích

Tài liệu này cung cấp:

* Danh sách các assertion phổ biến theo từng nhóm
* Cách sử dụng tiêu chuẩn
* Best practices khi viết test

---

## 2. Phân loại Assertions

### 2.1 Trạng thái phần tử (Element State)

Dùng để kiểm tra trạng thái và khả năng tương tác của UI element.

```ts
await expect(locator).toBeVisible();     // Element hiển thị
await expect(locator).toBeHidden();      // Element bị ẩn
await expect(locator).toBeEnabled();     // Có thể tương tác
await expect(locator).toBeDisabled();    // Không thể tương tác
await expect(locator).toBeChecked();     // Checkbox/radio được chọn
await expect(locator).toBeFocused();     // Element đang được focus
```

---

### 2.2 Text & Nội dung (Text & Content)

Kiểm tra text, attribute và số lượng element.

```ts
await expect(locator).toHaveText('exact');           // So khớp chính xác
await expect(locator).toContainText('partial');      // Chứa chuỗi con
await expect(locator).toHaveValue('value');          // Giá trị input
await expect(locator).toHaveAttribute('name', 'v');  // Kiểm tra attribute
await expect(locator).toHaveClass(/regex/);          // So khớp class
await expect(locator).toHaveCount(n);                // Số lượng element
```

---

### 2.3 Cấp độ trang (Page Level)

Kiểm tra các thuộc tính của trang.

```ts
await expect(page).toHaveTitle('title');             // Tiêu đề trang
await expect(page).toHaveURL(/pattern/);             // URL
await expect(page).toHaveScreenshot();               // So sánh hình ảnh
await expect(locator).toHaveCSS('prop', 'val');      // CSS của element
```

---

### 2.4 API Response

Kiểm tra response từ backend.

```ts
await expect(response).toBeOK();                     // Status 2xx
await expect(response.status()).toBe(200);           // Status cụ thể
await expect(body).toContain('value');               // Chứa giá trị
await expect(value).toBeTruthy();                    // Giá trị truthy
await expect(array).toHaveLength(n);                 // Độ dài mảng
```

---

### 2.5 Assertions nâng cao (Advanced)

Dùng cho các case async, retry, hoặc kiểm tra phức tạp.

```ts
// 1. Soft assertion (không dừng test ngay)
await expect.soft(locator).toBeVisible();

// 2. Retry đến khi pass
await expect(async () => {
  const result = await getData();
  expect(result).toBe('success');
}).toPass();

// 3. Polling điều kiện async
await expect.poll(async () => {
  const response = await api.get('/status');
  return response.status();
}).toBe(200);

// 4. So khớp object một phần
await expect(obj).toMatchObject({ key: 'value' });

// 5. So sánh số
await expect(count).toBeGreaterThan(n);
```

---

## 3. Best Practices (Tips)

Các khuyến nghị giúp test ổn định và dễ maintain:

* Ưu tiên dùng **Playwright assertion** thay vì tự check thủ công
* Dùng `expect.soft()` khi cần **ghi nhận nhiều lỗi trong 1 lần chạy**
* Tránh dùng `waitForTimeout` → thay bằng assertion hoặc polling
* Đặt assertion **gần action cần verify**
* Đặt tên biến rõ ràng, dễ hiểu
* Không assert quá nhiều → chỉ focus vào **behavior quan trọng**

---

## 4. Lưu ý quan trọng (Notes)

Các behavior cần nắm rõ để tránh hiểu sai:

* **Auto-retry:**
  Assertion sẽ tự retry đến khi đạt điều kiện hoặc timeout

* **Auto-waiting:**
  Playwright tự chờ element đạt trạng thái mong muốn

* **Soft assertion:**
  `expect.soft()` không fail test ngay

* **Polling & Retry:**
  `expect.poll()` và `toPass()` dùng cho case async/flaky

* **Locator-based:**
  Nên dùng `locator` thay vì selector raw để tăng độ ổn định

---

## 5. Quy chuẩn sử dụng trong Team

* Nhóm assertion theo từng flow hoặc feature
* Không trộn UI assertion và API assertion nếu không cần thiết
* Sử dụng `test.step()` để tăng readability khi cần
* Thống nhất naming convention trong toàn bộ test
* Mỗi assertion phải có **mục đích rõ ràng**

---

## 6. Tổng kết

* Chọn đúng assertion cho đúng context
* Tận dụng auto-wait của Playwright
* Viết test rõ ràng, ngắn gọn, dễ hiểu

---