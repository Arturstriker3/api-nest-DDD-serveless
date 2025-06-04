#!/bin/bash

echo "🐳 Recipe API - Docker Information"
echo "=================================="

echo ""
echo "📦 Image Details:"
docker images recipe-api --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"

echo ""
echo "🔍 Image Layers:"
docker history recipe-api --format "table {{.CreatedBy}}\t{{.Size}}"

echo ""
echo "🏃‍♂️ Quick Start Commands:"
echo "  Development: docker-compose up --build"
echo "  Production:  docker-compose up -d --build"
echo "  Manual run:  docker run -p 3000:3000 recipe-api"

echo ""
echo "🌐 Access URLs:"
echo "  API:     http://localhost:3000/api"
echo "  Swagger: http://localhost:3000/api/docs"

echo ""
echo "📊 Container Stats (if running):"
docker stats recipe-api --no-stream 2>/dev/null || echo "  Container not running" 