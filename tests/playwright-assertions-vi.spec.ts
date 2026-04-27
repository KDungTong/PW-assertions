import { test, expect } from '@playwright/test';

/**
 * Bộ code mẫu tổng hợp toàn bộ 26 assertions quan trọng nhất.
 * Cấu trúc: Được chia thành 5 nhóm thực chiến.
 */

test.describe('Playwright Assertions Mastery - Toàn tập 26 Assertions', () => {

  test('1. Element State Assertions - Kiểm tra trạng thái UI', async ({ page }) => {
    const button = page.locator('#submit-btn');
    const checkbox = page.locator('#terms');

    await test.step('Verify element visibility & interactivity', async () => {
      // 1. toBeVisible(): Element hiển thị trên màn hình
      await expect(button).toBeVisible();
      
      // 2. toBeHidden(): Element không hiển thị (hoặc không tồn tại)
      await expect(page.locator('#loading-spinner')).toBeHidden();

      // 3. toBeEnabled(): Element có thể click/tương tác được
      await expect(button).toBeEnabled();

      // 4. toBeDisabled(): Element bị vô hiệu hóa
      await expect(page.locator('#disabled-btn')).toBeDisabled();

      // 5. toBeChecked(): Checkbox hoặc Radio button đã được chọn
      await expect(checkbox).toBeChecked();

      // 6. toBeFocused(): Element đang được focus
      await expect(button).toBeFocused();
    });
  });

  test('2. Text & Content Assertions - Kiểm tra nội dung', async ({ page }) => {
    const header = page.locator('h1');
    const input = page.locator('#username');
    const listItems = page.locator('.item');

    await test.step('Verify text and attributes', async () => {
      // 7. toHaveText(): Khớp chính xác toàn bộ text
      await expect(header).toHaveText('Welcome to Playwright');

      // 8. toContainText(): Chứa một phần đoạn text
      await expect(header).toContainText('Playwright');

      // 9. toHaveValue(): Kiểm tra giá trị nhập vào của input field
      await expect(input).toHaveValue('admin');

      // 10. toHaveAttribute(): Kiểm tra thuộc tính (ví dụ: placeholder, src, href)
      await expect(input).toHaveAttribute('placeholder', 'Enter username');

      // 11. toHaveClass(): Kiểm tra class CSS (có thể dùng Regex)
      await expect(header).toHaveClass(/main-title/);

      // 12. toHaveCount(): Kiểm tra số lượng element trong danh sách
      await expect(listItems).toHaveCount(5);
    });
  });

  test('3. Page Level Assertions - Kiểm tra cấp độ trang', async ({ page }) => {
    await test.step('Verify page status and UI', async () => {
      // 13. toHaveTitle(): Kiểm tra Title của tab trình duyệt
      await expect(page).toHaveTitle(/Dashboard/);

      // 14. toHaveURL(): Kiểm tra đường dẫn URL hiện tại
      await expect(page).toHaveURL(/.*\/dashboard/);

      // 15. toHaveCSS(): Kiểm tra thuộc tính CSS cụ thể (style)
      const box = page.locator('.box');
      await expect(box).toHaveCSS('background-color', 'rgb(255, 0, 0)');

      // 16. toHaveScreenshot(): So sánh hình ảnh thực tế với ảnh gốc (Visual Testing)
      await expect(page).toHaveScreenshot('landing-page.png');
    });
  });

  test('4. API Response Assertions - Kiểm tra kết quả API', async ({ request }) => {
    const response = await request.get('/api/v1/status');
    const data = await response.json();

    await test.step('Verify API status and data structure', async () => {
      // 17. toBeOK(): Status code trả về nằm trong khoảng 200-299
      expect(response).toBeOK();

      // 18. toBe(): So sánh bằng tuyệt đối (thường dùng cho primitive types)
      expect(response.status()).toBe(200);

      // 19. toContain(): Kiểm tra xem mảng hoặc chuỗi có chứa phần tử này không
      expect(data.roles).toContain('admin');

      // 20. toBeTruthy(): Đảm bảo giá trị trả về không phải falsy (null/undefined/false)
      expect(data.isActive).toBeTruthy();

      // 21. toHaveLength(): Kiểm tra độ dài của mảng hoặc chuỗi
      expect(data.users).toHaveLength(10);
    });
  });

  test('5. Advanced Assertions - Kỹ thuật nâng cao', async ({ page }) => {
    await test.step('Soft assertions & Custom waiting logic', async () => {
      // 22. expect.soft(): Nếu fail, test vẫn chạy tiếp (Rất hữu ích cho non-critical UI check)
      await expect.soft(page.locator('#sidebar')).toBeVisible();

      // 23. toPass(): Thử lại liên tục một khối logic cho đến khi pass hoặc timeout
      await expect(async () => {
        const response = await page.request.get('/api/check-status');
        expect(response.status()).toBe(200);
      }).toPass({ timeout: 5000 });

      // 24. expect.poll(): Liên tục poll kết quả của một hàm cho đến khi thỏa mãn điều kiện
      await expect.poll(async () => {
        return await page.locator('.status-label').textContent();
      }, { message: 'Chờ trạng thái chuyển sang Completed' }).toBe('Completed');

      // 25. toMatchObject(): So sánh một phần của Object (không cần khớp toàn bộ key)
      const user = { id: 1, name: 'QA', role: 'Lead' };
      expect(user).toMatchObject({ role: 'Lead' });

      // 26. toBeGreaterThan(): So sánh giá trị số (thường dùng khi tính toán, đếm)
      const count = 10;
      expect(count).toBeGreaterThan(5);
    });
  });
});