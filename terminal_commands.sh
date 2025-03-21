# 1. First, make sure we're in the right directory
pwd  # should show your project directory

# 2. Remove any existing git setup
rm -rf .git

# 3. Start fresh with git
git init

# 4. Add all files
git add .

# 5. Create the first commit
git commit -m "Initial commit: Inky Keynotes"

# 6. Add the new remote
git remote add origin https://github.com/bniladridas/keynote.niladridas.git

# 7. Force push to main branch (since it's a fresh start)
git push -f origin main
