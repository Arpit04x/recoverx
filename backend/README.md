# Lost and Found Management System 🔍

A complete web-based Lost and Found Management System designed for college campuses. This system helps students report lost/found items, intelligently matches them, and provides a secure claim verification process.

## 🎯 Project Overview

**Purpose**: Streamline the process of reporting, matching, and claiming lost items on campus.

**Key Features**:
- Report lost items with detailed descriptions and images
- Report found items (with anonymous option)
- Smart metadata-based matching algorithm
- Proof-based claim verification system
- Admin panel for item and claim management
- Analytics dashboard

## 🏗️ System Architecture

```
Frontend (React) ↔ REST API (Node.js/Express) ↔ Database (MongoDB)
                            ↓
                    File Storage (Local/Cloud)
```

## 🛠️ Technology Stack

- **Frontend**: React.js, React Router, Axios, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Image Storage**: Local filesystem (easily upgradable to cloud)

## 📋 Features in Detail

### 1. Item Reporting
- **Lost Items**: Users can report items with category, color, location, date, description, and optional image
- **Found Items**: Similar reporting with option for anonymous submission
- **Categories**: Electronics, Clothing, Accessories, Books, Keys, IDs, Bags, Sports Equipment, Others

### 2. Smart Matching Algorithm
Matches items based on:
- **Category** (40% weight)
- **Color** (25% weight)
- **Location proximity** (20% weight)
- **Date/Time range** (15% weight)
- Match score threshold: 60%

### 3. Claim Verification
- Claimant answers verification questions about the item
- Admin reviews claim with all evidence
- Approve/Reject with reason
- Item marked as returned upon approval

### 4. Admin Dashboard
- View all items (lost/found/claimed/returned)
- Manage claims (approve/reject)
- View analytics and statistics
- User management

### 5. Analytics
- Most commonly lost items by category
- Hotspot locations for lost items
- Success rate metrics
- Time-based trends

## 📁 Project Structure

```
lost-and-found-system/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── LostItem.js        # Lost item schema
│   │   ├── FoundItem.js       # Found item schema
│   │   └── Claim.js           # Claim schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── lostItems.js       # Lost items routes
│   │   ├── foundItems.js      # Found items routes
│   │   ├── claims.js          # Claims routes
│   │   └── analytics.js       # Analytics routes
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   └── upload.js          # File upload handling
│   ├── utils/
│   │   └── matching.js        # Matching algorithm
│   ├── uploads/               # Uploaded images
│   ├── .env                   # Environment variables
│   ├── server.js              # Main server file
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ItemCard.jsx
│   │   │   ├── MatchList.jsx
│   │   │   ├── ClaimForm.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ReportLost.jsx
│   │   │   ├── ReportFound.jsx
│   │   │   ├── MyItems.jsx
│   │   │   ├── ClaimItem.jsx
│   │   │   └── Admin.jsx
│   │   ├── services/
│   │   │   └── api.js         # API service layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── MATCHING_ALGORITHM.md
│   ├── DEPLOYMENT.md
│   └── VIVA_QUESTIONS.md
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lost-and-found
JWT_SECRET=your_super_secret_jwt_key_here_change_this
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔑 Default Admin Credentials

After first setup, create an admin user via MongoDB or registration, then manually set `isAdmin: true` in the users collection.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Lost Items
- `GET /api/lost-items` - Get all lost items
- `GET /api/lost-items/:id` - Get specific lost item
- `POST /api/lost-items` - Report lost item
- `PUT /api/lost-items/:id` - Update lost item
- `DELETE /api/lost-items/:id` - Delete lost item
- `GET /api/lost-items/:id/matches` - Get matching found items

### Found Items
- `GET /api/found-items` - Get all found items
- `GET /api/found-items/:id` - Get specific found item
- `POST /api/found-items` - Report found item
- `PUT /api/found-items/:id` - Update found item
- `DELETE /api/found-items/:id` - Delete found item

### Claims
- `POST /api/claims` - Create new claim
- `GET /api/claims` - Get all claims (admin)
- `GET /api/claims/my-claims` - Get user's claims
- `PUT /api/claims/:id/approve` - Approve claim (admin)
- `PUT /api/claims/:id/reject` - Reject claim (admin)

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics

## 🧪 Testing the System

1. Register a new user
2. Report a lost item (e.g., "Blue iPhone lost in Library")
3. Report a found item matching the description
4. View matches on the lost item page
5. Submit a claim with verification details
6. Login as admin to approve/reject claims

## 🎓 For College Project Evaluation

### Strengths to Highlight:
1. **Complete Full-Stack Implementation**: Frontend + Backend + Database
2. **Smart Matching Algorithm**: Explainable, metadata-based (no black-box AI)
3. **Security**: JWT authentication, input validation, secure claim process
4. **Scalability**: RESTful API design, modular architecture
5. **User Experience**: Intuitive UI, real-time matching, image support
6. **Admin Features**: Complete management dashboard
7. **Analytics**: Data-driven insights

### Viva Preparation:
- Review `docs/VIVA_QUESTIONS.md` for common questions
- Understand the matching algorithm thoroughly
- Know the database schema and relationships
- Be able to explain REST API design choices
- Demo the claim verification flow

## 🔧 Customization Options

### Adding New Item Categories
Edit `backend/models/LostItem.js` and `FoundItem.js` to add categories to the enum.

### Adjusting Match Weights
Modify weights in `backend/utils/matching.js`:
```javascript
const weights = {
  category: 0.40,  // Adjust these
  color: 0.25,
  location: 0.20,
  date: 0.15
};
```

### Cloud Storage for Images
Replace Multer local storage with AWS S3 or Cloudinary integration.

## 📈 Future Enhancements

- Email/SMS notifications for matches
- Real-time chat between finder and owner
- QR code generation for claimed items
- Mobile app (React Native)
- Advanced search and filters
- Multi-language support
- Integration with campus ID system

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP

### CORS Errors
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS configuration in `backend/server.js`

### Image Upload Fails
- Ensure `uploads/` directory exists
- Check file size limits in `backend/middleware/upload.js`

## 📄 License

This project is created for educational purposes as a college project.

## 👥 Contributors

[Add your name and team members here]

## 📞 Support

For questions or issues during evaluation, contact: [Your Email]

---

**Note**: This is a complete, production-ready system suitable for college project submission. All code is well-commented and follows best practices.
