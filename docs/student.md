Here’s the revised plan for building the dynamic `StudentProfile.tsx` page, reflecting your clarifications:

---

## A. **API Endpoints & Expected JSONs**

All endpoints will be under the base URL (from api-service.ts):  
`http://localhost/college/api/student/`

### a. **Profile Section**

- **Source:** `authStore` (already available after login)
- **No API call needed.**

### b. **Summary Section**

- **API:** `GET student/summary/`
- **State:** `summary`
- **JSON Example:**

```json
{
  "totalHours": "16h",
  "videosWatched": 25,
  "mcqsAttempted": 120,
  "testsTaken": 5,
  "overallAccuracy": 78,
  "avgScore": 62
}
```

### c. **Login Heatmap**

- **API:** `GET student/login-heatmap/?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
- **State:** `loginHeatmap`
- **Pagination:** By week (offset, similar to InstitutionOverview)
- **JSON Example:**

```json
// Optionally, include lastLogin in the response:
{
  "lastLogin": "2025-07-28T18:30:00.000Z",
  "heatmap": [
    { "date": "2025-07-21", "day": "Mon", "intensity": 2, "loginCount": 3 },
    { "date": "2025-07-22", "day": "Tue", "intensity": 1, "loginCount": 1 },
    { "date": "2025-07-23", "day": "Wed", "intensity": 0, "loginCount": 0 },
    { "date": "2025-07-24", "day": "Thu", "intensity": 3, "loginCount": 7 },
    { "date": "2025-07-25", "day": "Fri", "intensity": 2, "loginCount": 4 },
    { "date": "2025-07-26", "day": "Sat", "intensity": 1, "loginCount": 2 },
    { "date": "2025-07-27", "day": "Sun", "intensity": 2, "loginCount": 3 }
  ]
}
```

### d. **Video Activity**

- **API:** `GET student/video-activity/?range=7days`
- **States:** `videoChartData`, `recentVideos`
- **JSON Example:**

```json
{
  "chart": [
    { "date": "2025-07-21", "hoursWatched": 2.5 },
    { "date": "2025-07-22", "hoursWatched": 1.8 },
    { "date": "2025-07-23", "hoursWatched": 3.2 },
    { "date": "2025-07-24", "hoursWatched": 2.1 },
    { "date": "2025-07-25", "hoursWatched": 4.0 },
    { "date": "2025-07-26", "hoursWatched": 1.5 },
    { "date": "2025-07-27", "hoursWatched": 2.8 }
  ],
  "recentVideos": [
    {
      "id": 1,
      "title": "Cardiovascular System Overview",
      "duration": "45:30",
      "progress": 85,
      "watchedDate": "2025-07-27"
    }
    // ...
  ]
}
```

### e. **Test Performance**

- **API:** `GET student/test-performance/`
- **States:** `summary` (for test stats), `testHistory`
- **JSON Example:**

```json
{
  "summary": {
    "overallAccuracy": 78,
    "avgScore": 62
  },
  "testHistory": [
    {
      "id": 1,
      "testName": "Anatomy Mid-term Assessment",
      "score": 85,
      "date": "2025-07-27",
      "totalStudents": 248
    }
    // ...
  ]
}
```

- **Note:** No rank field in testHistory.

---

## 1. **API Service Layer**

**Goal:** Centralize all student-related API calls in a new service (e.g., `student-api-service.ts` in `src/data/student/`).

**Endpoints:**

- `GET student/summary/`
- `GET student/login-heatmap/?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
- `GET student/video-activity/?range=7days`
- `GET student/test-performance/`

**Actions:**

- Create a class `StudentAPIService` with methods for each endpoint.
- Use the same baseURL pattern as in `api-service.ts`.
- Handle errors and return consistent response shapes.

---

## 2. **Zustand Store for Student Profile**

**Goal:** Manage all student profile states in a single store for easy access and updates.

**States:**

- `summary` (object, for summary stats)
- `loginHeatmap` (object: `{ lastLogin, heatmap }`)
- `currentWeekOffset` (number, for heatmap pagination)
- `videoChartData` (array)
- `recentVideos` (array)
- `testSummary` (object, for test stats)
- `testHistory` (array)
- `loading` and `error` states for each section

**Actions:**

- Fetch and set each state via async actions.
- Expose methods for pagination (e.g., `setCurrentWeekOffset`).

---

## 3. **Component Refactor: StudentProfile.tsx**

**Goal:** Refactor the component to use the new store and API, with clear loading/error handling.

**Sections:**

- **Profile:** Use `authStore` for user info.
- **Summary:** Use `summary` state.
- **Login Heatmap:** Use `loginHeatmap` and `currentWeekOffset`, with week navigation logic.
- **Video Activity:** Use `videoChartData` and `recentVideos`.
- **Test Performance:** Use `testSummary` and `testHistory` (no rank column).

**Actions:**

- On mount, trigger all fetch actions.
- Use loading/error states for skeletons and error messages.
- Use the same heatmap and pagination logic as `InstitutionOverview.tsx`.

---

## 4. **API Response Shape Reference**

**Keep this handy for backend/frontend contract:**

- **Summary:**  
  `{ totalHours, videosWatched, mcqsAttempted, testsTaken, overallAccuracy, avgScore }`
- **Login Heatmap:**  
  `{ lastLogin, heatmap: [ { date, day, intensity, loginCount } ] }`
- **Video Activity:**  
  `{ chart: [ { date, hoursWatched } ], recentVideos: [ { id, title, duration, progress, watchedDate } ] }`
- **Test Performance:**  
  `{ summary: { overallAccuracy, avgScore }, testHistory: [ { id, testName, score, date, totalStudents } ] }`

---

## 5. **Integration Steps (Recommended Order)**

1. **Create `student-api-service.ts`**
   - Implement all API methods.
2. **Create `studentProfileStore.ts`**
   - Define all states and async actions.
   - Use the new API service.
3. **Refactor `StudentProfile.tsx`**
   - Replace all static/sample data with store selectors.
   - Add loading/error UI.
   - Implement heatmap pagination.
4. **Test End-to-End**
   - Check all states, loading, error, and pagination.
   - Validate with mock or real backend.

---

## 6. **Why This Order?**

- **API service first:** Ensures all endpoints are ready and consistent.
- **Store second:** Centralizes state, making the component refactor easy and context-rich.
- **Component last:** You’ll have all the hooks and data ready, so you won’t lose context or have to refactor twice.

---

**Ready to proceed!**  
Would you like to start with the API service implementation, the Zustand store, or see a sample of the refactored component first?
