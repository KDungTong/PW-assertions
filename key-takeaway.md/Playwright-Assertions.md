# Playwright Assertions Guide

A structured reference for commonly used Playwright assertions, designed for readability, maintainability, and team collaboration.

---

## 1. Purpose

This document provides:

* A categorized list of Playwright assertions
* Standard usage patterns
* Best practices for writing stable and readable tests

---

## 2. Assertion Categories

### 2.1 Element State

Verify the state and interaction capability of UI elements.

```ts
await expect(locator).toBeVisible();     // Element is visible
await expect(locator).toBeHidden();      // Element is not visible
await expect(locator).toBeEnabled();     // Element is interactive
await expect(locator).toBeDisabled();    // Element is not interactive
await expect(locator).toBeChecked();     // Checkbox/radio is checked
await expect(locator).toBeFocused();     // Element has focus
```

---

### 2.2 Text & Content

Validate text, attributes, and element collections.

```ts
await expect(locator).toHaveText('exact');           // Exact match
await expect(locator).toContainText('partial');      // Partial match
await expect(locator).toHaveValue('value');          // Input value
await expect(locator).toHaveAttribute('name', 'v');  // Attribute check
await expect(locator).toHaveClass(/regex/);          // Class pattern
await expect(locator).toHaveCount(n);                // Element count
```

---

### 2.3 Page Level

Validate page-level properties and styles.

```ts
await expect(page).toHaveTitle('title');             // Page title
await expect(page).toHaveURL(/pattern/);             // URL pattern
await expect(page).toHaveScreenshot();               // Visual snapshot
await expect(locator).toHaveCSS('prop', 'val');      // CSS property
```

---

### 2.4 API Response

Validate backend responses and data integrity.

```ts
await expect(response).toBeOK();                     // Status 2xx
await expect(response.status()).toBe(200);           // Exact status
await expect(body).toContain('value');               // Contains value
await expect(value).toBeTruthy();                    // Truthy check
await expect(array).toHaveLength(n);                 // Array length
```

---

### 2.5 Advanced Assertions

Handle asynchronous, retryable, and partial validations.

```ts
// Soft assertion (does not stop test immediately)
await expect.soft(locator).toBeVisible();

// Retry block until pass
await expect(async () => {
  const result = await getData();
  expect(result).toBe('success');
}).toPass();

// Polling for async condition
await expect.poll(async () => {
  const response = await api.get('/status');
  return response.status();
}).toBe(200);

// Partial object match
await expect(obj).toMatchObject({ key: 'value' });

// Numeric comparison
await expect(count).toBeGreaterThan(n);
```

---

## 3. Best Practices (Tips)

These recommendations improve test quality and maintainability:

* Prefer **Playwright assertions over manual checks** (auto-waiting built-in)
* Use `expect.soft()` when you need to **capture multiple failures in one run**
* Replace hard waits (`waitForTimeout`) with **assertions or polling**
* Keep assertions **close to the action being verified**
* Use **clear and descriptive variable names**
* Avoid over-asserting (focus on **critical behaviors only**)

---

## 4. Important Notes

These are key behaviors of Playwright that must be understood:

* **Auto-retry:**
  Most Playwright assertions automatically retry until timeout

* **Auto-waiting:**
  Assertions wait for elements to reach the expected state

* **Soft assertions:**
  `expect.soft()` records failure but allows test execution to continue

* **Polling & retry mechanisms:**
  `expect.poll()` and `toPass()` are designed for unstable or delayed conditions

* **Locator-based assertions:**
  Always prefer `locator` over raw selectors for better stability

---

## 5. Usage Guidelines (Team Standard)

* Group assertions logically by feature or flow
* Avoid mixing **UI assertions and API assertions** in the same block unless necessary
* Keep test steps readable using `test.step()` when needed
* Use consistent naming conventions across tests
* Ensure each assertion has a **clear purpose**

---

## 6. Summary

* Use the right assertion for the right context
* Rely on Playwright’s built-in waiting instead of manual handling
* Write assertions that are **clear, minimal, and meaningful**

---

