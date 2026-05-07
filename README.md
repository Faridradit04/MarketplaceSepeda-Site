# Bike Shop Full-Stack Application

A complete bike shop management system with authentication and bike CRUD operations.

## 🚀 Quick Setup

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
DB_NAME=bike_shop
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=3306
PORT=3040
```

Start backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will open at `http://localhost:5173`

## 📋 Features

### Authentication
- User registration with email and password validation
- User login with JWT tokens
- Secure token refresh mechanism
- Logout functionality

### Bike Management
- View all available bikes
- Add new bikes (with name and price)
- Delete bikes
- Edit functionality (coming soon)

### UI/UX
- Responsive Tailwind CSS design
- Clean authentication pages
- Dashboard with bike listings
- Error handling and feedback

## 🏗️ Architecture

### Backend
- **Express.js** - Server framework
- **Sequelize** - ORM for database operations
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing

### Frontend
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client with interceptors
- **Vanilla JavaScript** - No framework dependencies

## 📊 Database Relations

- **Users** have many **Shops**
- **Shops** have many **Bikes**
- Cascade delete enabled for data integrity

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Authorization middleware for protected routes
- Request validation and sanitization
- CORS enabled for frontend-backend communication

## 🎯 API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Bikes
- `GET /api/bikes` - Get all bikes
- `GET /api/bikes/:id` - Get bike by ID
- `POST /api/bikes` - Create new bike
- `PUT /api/bikes/:id` - Update bike
- `DELETE /api/bikes/:id` - Delete bike

## 🔧 Troubleshooting

### Backend won't start
- Check `.env` file is created with correct database credentials
- Ensure MySQL is running
- Check if port 3040 is available

### Frontend can't connect to backend
- Verify backend is running on `http://localhost:3040`
- Check CORS is enabled in backend
- Clear browser cache if tokens are stale

### Database errors
- Run migrations: `npm run migrate` (if available)
- Check database user permissions
- Verify table relationships in `model/index.js`

## 📝 Next Steps

- Implement edit functionality for bikes
- Add shop management features
- Add user profile management
- Implement pagination for bike listings
- Add search/filter functionality
- Add bike images/gallery
- Implement shopping cart and orders

---

**Happy biking! 🏍️**
