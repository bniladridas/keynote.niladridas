# 1. First, make sure we're in the right directory
pwd  # should show your project directory

# 2. Remove any existing git setup
rm -rf .git

# 3. Start fresh with git
git init

# 4. Configure Git identity
git config --global user.name "Niladri Das"
git config --global user.email "bniladridas@gmail.com"

# 5. Add all files
git add .

# 6. Create the first commit
git commit -m "Initial commit: Inky Keynotes"

# 7. Add the new remote
git remote add origin https://github.com/bniladridas/keynote.niladridas.git

# 8. Force push to main branch (since it's a fresh start)
git push -f origin main

# --- Subsequent commands for making changes ---

# 9. Add specific files
git add vercel.json
git add package.json

# 10. Create new commits
git commit -m "Fix: Update vercel.json header patterns"
git commit -m "Fix: Simplify vercel.json headers configuration"
git commit -m "Fix: Remove husky prepare script for deployment"

# 11. Amend commits if needed
git commit --amend --reset-author --no-edit

# 12. Push changes
git push -f origin main

# 13. Update OG Preview URLs
git add src/components/OGPreview.tsx
git commit -m "Update: Set OG preview URLs to new Vercel deployment"
git push origin main

# 14. Add example prompts to image generation
git add src/components/sections/ImageGenerationInterface.tsx
git commit -m "Add: Example prompts to image generation interface"
git push origin main

# 15. Add research examples
git add src/components/sections/ResearchInterface.tsx
git commit -m "Add: Research topic examples to deep research interface"
git push origin main

# 16. Update terminal commands
# 1. First, fetch the latest changes
git fetch origin main

# 2. Pull the latest changes from remote
git pull origin main

# If there are merge conflicts, resolve them and then:
git add terminal_commands.sh
git commit -m "Update: Add recent Git commands to terminal_commands.sh"

# 3. Now push your changes
git push origin main

# If you're absolutely sure you want to overwrite remote changes (use with caution):
# git push -f origin main

# --- Useful Git commands for reference ---
# Check status: git status
# View commit history: git log
# View remote URLs: git remote -v
# Pull latest changes: git pull origin main
# Create new branch: git checkout -b feature/new-feature
# Switch branches: git checkout branch-name
# Merge branches: git merge branch-name
# Delete branch: git branch -d branch-name
