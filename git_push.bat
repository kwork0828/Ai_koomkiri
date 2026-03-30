@echo off
git config user.email "kwork0828@example.com"
git config user.name "kwork0828"
git add .
git commit -m "Init: project with Firebase and Vercel setup"
git remote add origin https://github.com/kwork0828/AI_koomkiri.git
git branch -M main
git push -u origin main
