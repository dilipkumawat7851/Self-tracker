$ErrorActionPreference = "Continue"
$log = "c:\Users\Dilip kumawat\OneDrive\Desktop\self tracking\git_log.txt"

Set-Location "c:\Users\Dilip kumawat\OneDrive\Desktop\self tracking"

# Check if .git exists
$gitExists = Test-Path ".git"
"Git initialized: $gitExists" | Out-File $log -Encoding ascii

# Check remotes
$remotes = git remote -v 2>&1
"Remotes: $remotes" | Out-File $log -Append -Encoding ascii

# Remove existing origin if any, then add
git remote remove origin 2>&1 | Out-Null
$addResult = git remote add origin "https://github.com/dilipkumawat7851/Self-tracker.git" 2>&1
"Add remote: $addResult" | Out-File $log -Append -Encoding ascii

# Stage all files
$addFiles = git add . 2>&1
"Git add: $addFiles" | Out-File $log -Append -Encoding ascii

# Check status
$status = git status --short 2>&1
"Status: $status" | Out-File $log -Append -Encoding ascii

# Commit
$commit = git commit -m "feat: Complete GrowthMind habit tracker app - Landing page with animated hero, feature grid, and CTA - Dashboard with habit tracking, AI insights, and weekly chart - Habits CRUD with icon and color picker - Analytics with heatmap and progress charts - AI Coach chat interface with smart responses - Achievements badge system with gamification - Settings page with profile and notifications - Premium dark glassmorphism design system - Framer Motion animations throughout" 2>&1
"Commit: $commit" | Out-File $log -Append -Encoding ascii

# Push
$push = git push -u origin main --force 2>&1
"Push main: $push" | Out-File $log -Append -Encoding ascii

# If main didn't work, try master
if ($LASTEXITCODE -ne 0) {
    $pushMaster = git push -u origin master --force 2>&1
    "Push master: $pushMaster" | Out-File $log -Append -Encoding ascii
    
    # Rename to main and push
    git branch -M main 2>&1 | Out-Null
    $pushRenamed = git push -u origin main --force 2>&1
    "Push renamed main: $pushRenamed" | Out-File $log -Append -Encoding ascii
}

"DONE" | Out-File $log -Append -Encoding ascii
