Write-Host "Recipe API - Docker Information" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Image Details:" -ForegroundColor Yellow
docker images recipe-api --format "table {{.Repository}}`t{{.Tag}}`t{{.Size}}`t{{.CreatedAt}}"

Write-Host ""
Write-Host "Image Layers:" -ForegroundColor Yellow
docker history recipe-api --format "table {{.CreatedBy}}`t{{.Size}}"

Write-Host ""
Write-Host "Quick Start Commands:" -ForegroundColor Green
Write-Host "  Development: docker-compose up --build" -ForegroundColor White
Write-Host "  Production:  docker-compose up -d --build" -ForegroundColor White
Write-Host "  Manual run:  docker run -p 3000:3000 recipe-api" -ForegroundColor White

Write-Host ""
Write-Host "Access URLs:" -ForegroundColor Blue
Write-Host "  API:     http://localhost:3000/api" -ForegroundColor White
Write-Host "  Swagger: http://localhost:3000/api/docs" -ForegroundColor White

Write-Host ""
Write-Host "Container Stats (if running):" -ForegroundColor Magenta
$containerRunning = docker ps --filter "name=recipe-api" --format "{{.Names}}" 2>$null
if ($containerRunning) {
    docker stats recipe-api --no-stream 2>$null
} else {
    Write-Host "  Container not running" -ForegroundColor Red
} 