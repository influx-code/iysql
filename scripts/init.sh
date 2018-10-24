#!/bin/bash
set -eu

echo 'check env'
soar=${soar:-default}

if ! [[ -z "$soar" ]]; then
  echo "请配置soar的环境变量"
  exit 0
fi
app='.'
echo -e '\033[33mstart git push check\033[0m'
pip3 install -r requirments.txt

