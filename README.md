# Blog API

A RESTful API for managing a blog platform with user authentication, role-based access control, and commenting system.

## 🚀 Features

- **Authentication & Authorization**
  - User registration with role selection (Admin/Editor/User)
  - Email verification system
  - JWT-based authentication
  - Role-based access control

- **Blog Management**
  - Create blogs (Admin only)
  - Edit blogs (Admin and assigned Editors)
  - View blogs (All users)
  - Editor assignment system

- **Comment System**
  - Create comments on blogs
  - Delete own comments
  - View all comments for a specific blog

## 📋 Prerequisites

- Node.js
- MongoDB
- Email service provider (for verification emails)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
cd blog-api
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password
```

4. Start the server:
```bash
npm start
```

## 🔑 API Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer your-token-here
```

## 🔄 API Testing Flow

1. Register three accounts (admin, editor, user)
2. Verify each email address
3. Login as admin and create a blog
4. Assign the blog to an editor
5. Test blog editing permissions
6. Create and manage comments
7. Test comment deletion permissions

## 📚 API Documentation

Full API documentation is available:
- [HTML Documentation](link-to-your-documentation)
- [Postman Collection](https://www.postman.com/satellite-specialist-9716583/workspace/appening-assignment-testing-collection/collection/33771149-b8cdd380-f5af-4df8-ad0c-f5f67ab9774c?action=share&source=copy-link&creator=33771149)

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/login` - Login user

#### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog (Admin)
- `PUT /api/blogs/:id` - Edit blog (Admin/Editor)
- `POST /api/blogs/assign-editor` - Assign editor to blog (Admin)

#### Comments
- `POST /api/comments` - Create comment
- `DELETE /api/comments/:id` - Delete own comment
- `GET /api/comments/blog/:blogId` - Get blog comments

## 👥 User Roles

1. **Admin**
   - Create blogs
   - Edit any blog
   - Assign editors to blogs
   - Manage comments

2. **Editor**
   - Edit assigned blogs
   - Create comments
   - Manage own comments

3. **User**
   - View blogs
   - Create comments
   - Manage own comments

## ⚙️ Request Examples

### Register User
```json
POST /api/auth/register
{
    "email": "user@example.com",
    "password": "password123",
    "role": "admin"
}
```

### Create Blog
```json
POST /api/blogs
{
    "title": "Blog Title",
    "content": "Blog Content"
}
```

### Create Comment
```json
POST /api/comments
{
    "content": "Comment text here",
    "blog": "blog-id-here"
}
```

