#!/bin/bash

# Lost and Found Management System - Quick Start Script

echo "=================================================="
echo "🚀 Lost and Found System - Quick Start"
echo "=================================================="
echo ""

# Check if in correct directory
if [ ! -f "backend/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ first."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found in PATH"
    echo "   Please ensure MongoDB is installed and running"
    echo "   Continue anyway? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "📦 Installing backend dependencies..."
cd backend

if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🗄️  Setting up database..."

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create it first."
    exit 1
fi

echo "   Do you want to seed the database with test data? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    npm run seed
    if [ $? -eq 0 ]; then
        echo "✅ Database seeded successfully"
        echo ""
        echo "   Test Credentials:"
        echo "   Admin: admin@college.edu / admin123"
        echo "   User:  john@college.edu / password123"
    else
        echo "⚠️  Database seeding failed (might be MongoDB issue)"
    fi
fi

echo ""
echo "🚀 Starting backend server..."
echo ""
echo "   Server will run on: http://localhost:5000"
echo "   Health check: http://localhost:5000/health"
echo "   API docs: See docs/API_DOCUMENTATION.md"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""
echo "=================================================="
echo ""

npm start
