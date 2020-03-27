#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git fetch
  git checkout dev
  npm run format
  git add .
  git commit --message "Travis beautify build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://${KEANU_TOKEN}@github.com/keanuplayz/TravBot.git > /dev/null 2>&1
  git push origin dev
}

setup_git
commit_website_files
upload_files