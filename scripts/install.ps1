Write-Host "Running Windows install script..."
if (Test-Path package-lock.json) {
  Write-Host "Found package-lock.json — running npm ci"
  npm ci
} else {
  Write-Host "No lockfile — running npm install"
  npm install
}
Write-Host "Install complete."
