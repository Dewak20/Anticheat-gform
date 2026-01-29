# Script to share project via Ngrok
# 1. Starts a local Python HTTP server on port 8080
# 2. Instructs user to run ngrok

$port = 8080

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   ANTI CHEATING - LIVE REVIEW SETUP" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Start Local Server (Python)
Write-Host "`n[1/2] Starting local server on port $port..." -ForegroundColor Yellow
try {
    # Start python server in a new minimized window/background process
    $process = Start-Process python -ArgumentList "-m http.server $port" -PassThru -WindowStyle Minimized
    Write-Host "✅ Server started! (PID: $($process.Id))" -ForegroundColor Green
    Write-Host "   Local Access: http://localhost:$port" -ForegroundColor Gray
}
catch {
    Write-Host "❌ Failed to start Python server. Make sure Python is installed." -ForegroundColor Red
    Write-Host "   You can also use 'npx serve' or 'Live Server' extension." -ForegroundColor Gray
    exit
}

# 2. Ngrok Instructions
Write-Host "`n[2/2] Exposing to Internet via Ngrok..." -ForegroundColor Yellow
Write-Host "`n   Please open a NEW terminal and run:" -ForegroundColor White
Write-Host "   > ngrok http $port`n" -ForegroundColor Green

Write-Host "   If you don't have ngrok installed:" -ForegroundColor Gray
Write-Host "   1. Download from https://ngrok.com/download" -ForegroundColor Gray
Write-Host "   2. Unzip and run 'ngrok config add-authtoken <YOUR_TOKEN>'" -ForegroundColor Gray

Write-Host "`nOnce ngrok is running, copy the 'Forwarding' URL (e.g., https://xxxx.ngrok-free.app)" -ForegroundColor Cyan
Write-Host "Send that link to your friend!" -ForegroundColor Cyan
Write-Host "`nPress any key to close this script (Server will keep running)..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
