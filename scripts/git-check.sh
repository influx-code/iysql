#!/bin/bash
set -eu

app='.'
echo -e '\033[33mstart git push check\033[0m'

echo '清理.DS_Store文件'
find $app -name ".DS_Store" -print0 | xargs -0 rm -rf  
git add $app
echo 'git commit'
eval "git commit -m '${1}'"
git pull