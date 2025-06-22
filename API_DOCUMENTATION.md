# 🧪 API Testing Guide

This guide explains how to use our interactive API testing interface to test your Node.js REST API endpoints.

## 🚀 Getting Started

### Step 1: Start Your Server
\`\`\`bash
npm run dev
# Server should be running on http://localhost:5001
\`\`\`

### Step 2: Open API Tester
Open `public/api-tester.html` in your browser or serve it through your Express server.

### Step 3: Configure Server URL
1. In the sidebar, set your server URL (default: `http://localhost:5001`)
2. Click "💾 Save Token" to save the configuration

## 🔐 Authentication Flow

### 1. Register a New User
- Navigate to "👤 User Authentication" → "Register User"
- Use the default payload or modify it:
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
\`\`\`
- Click "🚀 Send Request"

### 2. Login to Get JWT Token
- Go to "Login User" tab
- Use the same credentials:
\`\`\`json
{
  "email": "john@example.com",
  "password": "Password123"
}
\`\`\`
- Click "🚀 Send Request"
- **The JWT token will be automatically saved!** ✨

### 3. Test Protected Endpoints
- Now you can test protected endpoints like "Get Profile"
- The token will be automatically included in requests

## 📦 Testing Product APIs

### Create a Product
\`\`\`json
{
  "name": "iPhone 15",
  "description": "Latest iPhone with amazing features",
  "price": 999,
  "category": "electronics",
  "inStock": true
}
\`\`\`

### Get Products with Filters
- Modify the URL to include query parameters:
\`\`\`
/api/v1/products?page=1&limit=5&category=electronics&search=phone
\`\`\`

## 🎯 Features

### ✅ What This Tester Provides:

1. **🔐 Token Management**: Automatically save and use JWT tokens
2. **📊 Real-time Responses**: See API responses immediately
3. **🎨 Syntax Highlighting**: JSON responses are formatted
4. **🔄 Auto-token Extraction**: Login responses automatically save tokens
5. **📱 Responsive Design**: Works on desktop and mobile
6. **🛡️ Auth Indicators**: Shows which endpoints require authentication
7. **📝 Pre-filled Examples**: Ready-to-use JSON payloads
8. **🌐 Server Status**: Check if your server is running

### 🎛️ Interface Sections:

- **👤 User Authentication**: Register, login, profile management
- **📦 Product Management**: CRUD operations for products
- **👥 Admin Operations**: Admin-only endpoints
- **🔧 System**: Health checks and API info

## 🔧 Customization

### Adding New Endpoints

Edit the `apiConfig` array in the HTML file:

\`\`\`javascript
{
    title: "🛒 Orders",
    endpoints: [
        {
            name: "Create Order",
            method: "POST",
            url: "/api/v1/orders",
            requiresAuth: true,
            description: "Create a new order",
            payload: {
                "productId": "product-id-here",
                "quantity": 2
            }
        }
    ]
}
\`\`\`

### Modifying Payloads

Update the `payload` object for any endpoint to change the default JSON data.

## 🐛 Troubleshooting

### Common Issues:

1. **❌ Server not reachable**
   - Make sure your Node.js server is running
   - Check the server URL is correct
   - Verify CORS is enabled

2. **❌ 401 Unauthorized**
   - Make sure you're logged in
   - Check if JWT token is saved
   - Verify token hasn't expired

3. **❌ Invalid JSON**
   - Check JSON syntax in request body
   - Use JSON validator if needed

4. **❌ 404 Not Found**
   - Verify endpoint URL is correct
   - Check if route is properly defined in your server

### Debug Tips:

1. **Check Console**: Open browser dev tools for detailed errors
2. **Server Logs**: Check your Node.js server console for errors
3. **Network Tab**: Use browser dev tools to inspect actual HTTP requests
4. **Token Validity**: JWT tokens expire - login again if needed

## 📚 API Endpoints Reference

### Public Endpoints (No Auth Required):
- `GET /health` - Health check
- `GET /api/v1` - API information
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get single product

### Protected Endpoints (Auth Required):
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `POST /api/v1/users/logout` - Logout user
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Admin Only Endpoints:
- `GET /api/v1/users` - Get all users
- `DELETE /api/v1/users/:id` - Delete user

## 🎉 Pro Tips

1. **🔄 Auto-Login**: After registration, immediately test login to get your token
2. **📋 Copy Responses**: Use response data (like user IDs) in subsequent requests
3. **🔍 URL Parameters**: Replace `{id}` placeholders with actual IDs from previous responses
4. **💾 Save Tokens**: Tokens are saved in localStorage and persist between sessions
5. **🧪 Test Edge Cases**: Try invalid data to test your validation
6. **📊 Monitor Performance**: Check response times in the network tab

This testing interface makes it easy to develop and debug your REST API without needing external tools like Postman! 🚀
