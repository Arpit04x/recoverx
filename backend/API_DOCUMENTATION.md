# API Documentation - Lost and Found Management System

Base URL: `http://localhost:5000/api`

## Authentication

Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@college.edu",
  "password": "password123",
  "studentId": "STU001",
  "phone": "9876543210"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@college.edu",
    "studentId": "STU001",
    "phone": "9876543210",
    "isAdmin": false
  }
}
```

---

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@college.edu",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@college.edu",
    "studentId": "STU001",
    "phone": "9876543210",
    "isAdmin": false
  }
}
```

---

### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@college.edu",
    "studentId": "STU001",
    "phone": "9876543210",
    "isAdmin": false,
    "createdAt": "2024-02-07T10:30:00.000Z"
  }
}
```

---

## 📦 Lost Items Endpoints

### Get All Lost Items
```http
GET /lost-items
```

**Query Parameters:**
- `category` (optional): Filter by category
- `status` (optional): Filter by status (active, claimed, returned, closed)
- `location` (optional): Search by location
- `userId` (optional): Filter by user ID

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "user": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "John Doe",
        "email": "john@college.edu",
        "studentId": "STU001"
      },
      "category": "Electronics",
      "itemName": "iPhone 13 Pro",
      "description": "Black iPhone with blue case",
      "color": "Black",
      "location": "Library Reading Room",
      "dateLost": "2024-02-05T00:00:00.000Z",
      "timeLost": "14:30",
      "images": ["uploads/lost-items/1707308400000-123456789.jpg"],
      "status": "active",
      "matchedFoundItems": [],
      "createdAt": "2024-02-07T10:00:00.000Z"
    }
  ]
}
```

---

### Get Single Lost Item
```http
GET /lost-items/:id
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "John Doe",
      "email": "john@college.edu",
      "phone": "9876543210"
    },
    "category": "Electronics",
    "itemName": "iPhone 13 Pro",
    "description": "Black iPhone with blue case",
    "color": "Black",
    "location": "Library Reading Room",
    "dateLost": "2024-02-05T00:00:00.000Z",
    "timeLost": "14:30",
    "images": ["uploads/lost-items/1707308400000-123456789.jpg"],
    "verificationQuestions": [
      {
        "question": "What is the phone wallpaper?"
      }
    ],
    "status": "active",
    "matchedFoundItems": [],
    "createdAt": "2024-02-07T10:00:00.000Z"
  }
}
```

**Note:** Verification answers are only shown to the item owner.

---

### Report Lost Item
```http
POST /lost-items
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
category: Electronics
itemName: iPhone 13 Pro
description: Black iPhone with blue case and cracked screen protector
color: Black
location: Library Reading Room
dateLost: 2024-02-05
timeLost: 14:30
verificationQuestions: [{"question":"What is the wallpaper?","answer":"Mountain"}]
images: [file1, file2] (optional, max 3)
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Lost item reported successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "user": {...},
    "category": "Electronics",
    "itemName": "iPhone 13 Pro",
    "description": "Black iPhone with blue case",
    "color": "Black",
    "location": "Library Reading Room",
    "dateLost": "2024-02-05T00:00:00.000Z",
    "timeLost": "14:30",
    "images": ["uploads/lost-items/1707308400000-123456789.jpg"],
    "verificationQuestions": [
      {
        "question": "What is the wallpaper?",
        "answer": "Mountain"
      }
    ],
    "status": "active",
    "createdAt": "2024-02-07T10:00:00.000Z"
  },
  "matches": {
    "count": 1,
    "items": [
      {
        "foundItem": {...},
        "matchScore": 94,
        "breakdown": {
          "category": 100,
          "color": 100,
          "location": 70,
          "date": 100
        }
      }
    ]
  }
}
```

---

### Get Matching Found Items
```http
GET /lost-items/:id/matches
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "foundItem": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
        "category": "Electronics",
        "itemName": "Black iPhone",
        "description": "Found iPhone near reading area",
        "color": "Black",
        "location": "Library Entrance",
        "dateFound": "2024-02-05T00:00:00.000Z",
        "currentLocation": "Library Lost and Found Desk",
        "status": "available"
      },
      "matchScore": 94,
      "breakdown": {
        "category": 100,
        "color": 100,
        "location": 70,
        "date": 100
      }
    }
  ]
}
```

---

### Update Lost Item
```http
PUT /lost-items/:id
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Authorization:** Owner or Admin only

**Form Data:** (all fields optional)
```
itemName: Updated iPhone 13 Pro
description: Updated description
status: closed
```

**Response:** `200 OK`

---

### Delete Lost Item
```http
DELETE /lost-items/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Authorization:** Owner or Admin only

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Lost item deleted successfully"
}
```

---

### Get My Lost Items
```http
GET /lost-items/user/my-items
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK` (Similar to Get All Lost Items)

---

## 📦 Found Items Endpoints

### Get All Found Items
```http
GET /found-items
```

**Query Parameters:**
- `category` (optional)
- `status` (optional): available, claimed, returned
- `location` (optional)

**Response:** `200 OK` (Similar structure to lost items)

---

### Get Single Found Item
```http
GET /found-items/:id
```

**Response:** `200 OK`

---

### Report Found Item
```http
POST /found-items
```

**Headers:**
```
Content-Type: multipart/form-data
Authorization: Bearer <token> (optional if anonymous)
```

**Form Data:**
```
category: Electronics
itemName: Black iPhone
description: Found iPhone with blue case
color: Black
location: Library Entrance
dateFound: 2024-02-05
timeFound: 16:00
currentLocation: Library Lost and Found Desk
isAnonymous: false
anonymousContact: (required if isAnonymous=true)
images: [file1, file2] (optional, max 3)
```

**Response:** `201 Created`

---

### Update Found Item
```http
PUT /found-items/:id
```

**Authorization:** Reporter or Admin

**Response:** `200 OK`

---

### Delete Found Item
```http
DELETE /found-items/:id
```

**Authorization:** Reporter or Admin

**Response:** `200 OK`

---

### Get My Found Items
```http
GET /found-items/user/my-items
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`

---

## 🎯 Claims Endpoints

### Create Claim
```http
POST /claims
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
lostItemId: 65a1b2c3d4e5f6g7h8i9j0k1
foundItemId: 65a1b2c3d4e5f6g7h8i9j0k2
verificationAnswers: [{"question":"What is the wallpaper?","answer":"Mountain landscape"}]
additionalProof: I bought it from Apple Store on Jan 15
proofImages: [receipt.jpg] (optional, max 3)
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Claim submitted successfully. Awaiting admin review.",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
    "lostItem": {...},
    "foundItem": {...},
    "claimant": {...},
    "verificationAnswers": [
      {
        "question": "What is the wallpaper?",
        "answer": "Mountain landscape"
      }
    ],
    "additionalProof": "I bought it from Apple Store on Jan 15",
    "proofImages": ["uploads/claims/1707308400000-123456789.jpg"],
    "status": "pending",
    "createdAt": "2024-02-07T11:00:00.000Z"
  }
}
```

---

### Get All Claims (Admin Only)
```http
GET /claims
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status` (optional): pending, approved, rejected

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
      "lostItem": {...},
      "foundItem": {...},
      "claimant": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "John Doe",
        "email": "john@college.edu",
        "phone": "9876543210",
        "studentId": "STU001"
      },
      "verificationAnswers": [...],
      "additionalProof": "...",
      "proofImages": [...],
      "status": "pending",
      "createdAt": "2024-02-07T11:00:00.000Z"
    }
  ]
}
```

---

### Get My Claims
```http
GET /claims/my-claims
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`

---

### Get Single Claim
```http
GET /claims/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Authorization:** Claimant, Item Owners, or Admin

**Response:** `200 OK`

---

### Approve Claim (Admin Only)
```http
PUT /claims/:id/approve
```

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "reviewNotes": "Verification answers match. Approved."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Claim approved successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
    "status": "approved",
    "reviewedBy": {...},
    "reviewDate": "2024-02-07T12:00:00.000Z",
    "reviewNotes": "Verification answers match. Approved.",
    ...
  }
}
```

**Side Effects:**
- Found item status → "returned"
- Lost item status → "returned"

---

### Reject Claim (Admin Only)
```http
PUT /claims/:id/reject
```

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "rejectionReason": "Verification answers do not match.",
  "reviewNotes": "Claimant provided incorrect details."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Claim rejected",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
    "status": "rejected",
    "reviewedBy": {...},
    "reviewDate": "2024-02-07T12:00:00.000Z",
    "rejectionReason": "Verification answers do not match.",
    "reviewNotes": "Claimant provided incorrect details.",
    ...
  }
}
```

**Side Effects:**
- Found item status → "available" (can be claimed by others)

---

## 📊 Analytics Endpoints (Admin Only)

### Get Dashboard Analytics
```http
GET /analytics/dashboard
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalLostItems": 45,
      "totalFoundItems": 38,
      "totalClaims": 25,
      "activeLostItems": 15,
      "activeFoundItems": 12,
      "pendingClaims": 5,
      "successfulReturns": 20,
      "successRate": 44.44
    },
    "categories": [
      {
        "_id": "Electronics",
        "count": 15
      },
      {
        "_id": "Keys",
        "count": 10
      }
    ],
    "locations": [
      {
        "_id": "Library",
        "count": 12
      },
      {
        "_id": "Cafeteria",
        "count": 8
      }
    ],
    "recentActivity": {
      "lost": 8,
      "found": 6,
      "returned": 4
    },
    "claims": {
      "total": 25,
      "pending": 5,
      "approved": 18,
      "rejected": 2
    },
    "performance": {
      "avgResolutionTime": 3.5
    },
    "trends": {
      "monthly": [...],
      "monthlyFound": [...]
    }
  }
}
```

---

### Get Category Analytics
```http
GET /analytics/categories
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "_id": "Electronics",
      "total": 15,
      "active": 6,
      "returned": 9
    },
    {
      "_id": "Keys",
      "total": 10,
      "active": 4,
      "returned": 6
    }
  ]
}
```

---

### Get Location Hotspots
```http
GET /analytics/locations
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "_id": "Library",
      "count": 12,
      "categories": ["Electronics", "Books", "Keys"]
    },
    {
      "_id": "Cafeteria",
      "count": 8,
      "categories": ["Bags", "IDs", "Keys"]
    }
  ]
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Lost item not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Detailed error message"
}
```

---

## 📝 Notes

1. **Image Upload:**
   - Use `multipart/form-data` for requests with images
   - Maximum 3 images per item
   - Supported formats: JPEG, JPG, PNG, GIF, WebP
   - Maximum file size: 5MB per image

2. **JWT Token:**
   - Expires in 7 days by default
   - Store securely (localStorage or httpOnly cookies)
   - Include in Authorization header for protected routes

3. **Matching Algorithm:**
   - Automatically runs when lost item is reported
   - Threshold: 60% match score
   - Based on category, color, location, and date

4. **Anonymous Reporting:**
   - Found items can be reported without authentication
   - Must provide contact information

5. **Admin Features:**
   - Admins have full access to all endpoints
   - Can manage all items and claims
   - Access analytics dashboard

---

## 🧪 Postman Collection

Import this collection for easy testing:

1. Create environment variables:
   - `base_url`: http://localhost:5000/api
   - `token`: (set after login)

2. Use {{base_url}} and {{token}} in requests

Example request:
```
GET {{base_url}}/lost-items
Authorization: Bearer {{token}}
```

---

## 📞 Support

For API questions or issues:
- Check server logs for detailed errors
- Ensure MongoDB is running
- Verify environment variables are set correctly
- Test with Postman/Thunder Client first
