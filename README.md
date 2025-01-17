This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# DevsRocket Platform Specification

## Overview

The DevsRocket Application is a Learning and Development Platform. This platform is designed for students and instructors, providing tools to create, discover, and complete courses.

---

## Features

### 1. User Roles and Registration

#### User Roles

- **Student**: Can enroll in and complete courses.
- **Instructor**: Can create, publish, and manage courses.

#### Registration & Login

**Common Features:**

- **Register Page**:
  - Fields:
    - First Name
    - Last Name
    - Email
    - Password
    - Confirm Password
  - Role Selection: `Student` or `Instructor`.
- **Login Page**:
  - Fields:
    - Email
    - Password
  - Includes "Forgot Password" option for resetting the password.
- **Profile Settings**: Users can update their personal information.

**Instructor Onboarding:**

- After registration, a guided onboarding process to set up their instructor profile.

---

### 2. Landing Page

#### Features

- **Explore Now Button**: Redirects users to the courses page for browsing.
- **Become an Instructor Button**: Redirects users to the instructor registration page.
- **Course Categories**: Display key categories with call-to-action buttons for category-based browsing.
- **Highlighted Courses**: Showcase top or trending courses with visuals and descriptions.

---

### 3. Navigation Bar

#### Common Elements

- **Register Button**: Links to the registration page for both roles.
- **Login Button**: Links to the login page.
- **Categories Dropdown**: Lists all course categories for easy navigation.

---

### 4. Courses Page

#### Features

- **Filters**:
  - By category.
  - By price range.
  - By rating.
- **Search Bar**: Search courses by name or keyword.
- **Sorting Options**:
  - Price: Low to High / High to Low.
  - Popularity / Rating.
- **Course Cards**:
  - Title
  - Image
  - Brief Description
  - Price
  - Ratings

---

### 5. Course Details Page

#### Details to Display

- Course Image and Title.
- Creator Name (Clickable to view instructor profile).
- Short Description.
- Full Description.
- Last Update Date.
- Total Curriculum:
  - Number of Modules.
  - Number of Lessons.
- Reviews and Testimonials from students.

#### Call-to-Actions

- **Enroll Now Button**: Redirects to login if not logged in.

#### Instructor Section

- Profile Picture and Bio.
- List of other courses by the instructor (with enroll options).

---

### 6. Course Enrollment

#### Process

- **Enroll Button**: Available on the course details page.
  - Redirect to login if not already logged in.
- Upon successful enrollment:
  - Confirmation email sent to the student.
  - Redirect to "Success" page with:
    - Browse Courses button.
    - Play Course button.

---

### 7. Course Learning Journey

#### Features

- **Progress Tracker**: Tracks student progress.
- **Lessons**:
  - Locked content until logged in and enrolled.
- **Quizzes**:
  - Interactive and scored.
  - Progress saved.
- **Course Completion**:
  - Certificate of completion as downloadable PDF.
- **Review Option**:
  - Students can leave reviews for the course.

---

### 8. Student-Specific Features

#### Dashboard

- View enrolled courses.
- Progress tracker for each course.

#### Profile

- Update personal information.

#### Enrolled Courses Page

- List of enrolled courses with status (e.g., In Progress, Completed).

---

### 9. Instructor-Specific Features

#### Dashboard

- **Quick Analytics**:
  - Total Courses.
  - Total Enrollments.
  - Total Revenue.

#### Course Management

- **List of All Courses**:
  - Published and Unpublished status.
- **Add New Course**:
  - Course Title and Description.
  - Multi-step process to define curriculum and upload content.

#### Live Sessions

- Schedule live classes with duration and details.

#### Quizzes

- Create reusable quizzes.
- Assign quizzes to multiple courses.

#### Profile Page

- **Publicly Accessible**:
  - Name, Bio, and Picture.
  - List of courses created.
  - Reviews and Ratings.

---

### 10. General Features

#### Responsive Design

- Optimized for desktop, tablet, and mobile.

#### Email Notifications

- Registration confirmation.
- Enrollment confirmation.
- Course completion acknowledgment.

#### Progress Saving

- Automatically save student progress within a course.

#### Public Lesson Preview

- Allow non-logged-in users to preview limited course content (e.g., one unlocked lesson).
