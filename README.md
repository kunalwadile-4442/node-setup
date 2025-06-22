# Node.js REST API with Express.js and MongoDB

A scalable, production-ready REST API built with Node.js, Express.js, and MongoDB. This project follows clean architecture principles and includes authentication, validation, error handling, and comprehensive security features.

## 🚀 Features

- **Clean Architecture**: Modular structure with separated concerns
- **JWT Authentication**: Secure token-based authentication
- **Data Validation**: Input validation using Joi
- **Error Handling**: Comprehensive error handling middleware
- **Security**: Helmet, CORS, rate limiting, and input sanitization
- **Database**: MongoDB with Mongoose ODM
- **Logging**: Request logging with Morgan
- **Environment Configuration**: Environment-based configuration
- **Scalable Structure**: Designed for both small and large applications

## 📁 Project Structure

\`\`\`
src/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   └── userController.js     # Request/response handling
├── middlewares/
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Error handling middleware
│   └── validation.js        # Input validation middleware
├── models/
│   └── User.js              # Mongoose schemas/models
├── routes/
│   └── userRoutes.js        # API route definitions
├── services/
│   └── userService.js       # Business logic layer
├── utils/
│   ├── jwt.js               # JWT utility functions
│   └── password.js          # Password utility functions
└── server.js                # Main application entry point
\`\`\`

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd nodejs-rest-api
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update the `.env` file with your configuration:
   \`\`\`env
   NODE_ENV=development
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/nodejs-rest-api
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   BCRYPT_SALT_ROUNDS=12
   \`\`\`

4. **Start the server**
   \`\`\`bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user

### User Management
- `GET /api/v1/users/profile` - Get current user profile (Protected)
- `PUT /api/v1/users/profile` - Update user profile (Protected)
- `GET /api/v1/users` - Get all users (Admin only)
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### System
- `GET /health` - Health check endpoint
- `GET /api/v1` - API information

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## 📝 Request/Response Examples

### Register User
\`\`\`bash
POST /api/v1/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
\`\`\`

### Login User
\`\`\`bash
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
\`\`\`

### Get Profile (Protected)
\`\`\`bash
GET /api/v1/users/profile
Authorization: Bearer <jwt-token>
\`\`\`

## 🏗️ Architecture Explanation

### **Controllers**
Handle HTTP requests and responses. They receive requests, call appropriate services, and return responses.

### **Services**
Contain business logic and data processing. They interact with models and perform complex operations.

### **Models**
Define data structure and database schemas using Mongoose. Include validation rules and methods.

### **Middlewares**
Handle cross-cutting concerns like authentication, validation, and error handling.

### **Routes**
Define API endpoints and connect them to appropriate controllers and middlewares.

### **Utils**
Contain reusable helper functions like JWT operations and password hashing.

### **Config**
Handle application configuration including database connections and environment variables.

## 🔒 Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable Cross-Origin Resource Sharing
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Input Validation**: Validates and sanitizes user input
- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT**: Secure token-based authentication

## 🚀 Scaling Considerations

This architecture supports scaling through:

- **Modular Structure**: Easy to add new features and modules
- **Service Layer**: Business logic separated from HTTP concerns
- **Database Indexing**: Optimized database queries
- **Error Handling**: Comprehensive error management
- **Environment Configuration**: Easy deployment across environments
- **Middleware Pattern**: Reusable and composable functionality

## 🧪 Development

### Adding New Features

1. **Create Model**: Define schema in `models/`
2. **Create Service**: Add business logic in `services/`
3. **Create Controller**: Handle HTTP in `controllers/`
4. **Define Routes**: Add endpoints in `routes/`
5. **Add Validation**: Create validation schemas in `middlewares/validation.js`

### Best Practices

- Always use the service layer for business logic
- Validate input data using Joi schemas
- Handle errors using the asyncHandler wrapper
- Use meaningful HTTP status codes
- Follow RESTful API conventions
- Write descriptive commit messages

## 📦 Dependencies

### Production Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT implementation
- **bcryptjs**: Password hashing
- **joi**: Data validation
- **cors**: CORS middleware
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **express-rate-limit**: Rate limiting

### Development Dependencies
- **nodemon**: Auto-restart during development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
