#!/bin/bash
set -eu

echo 'check install env'

if [[ -z ${soar+x} ]]; then 
	echo "请配置soar的环境变量:export soar=/usr/bin/soar";
else 
	echo "soar is set to '$soar'"; 
	app='.'
	echo -e '\033[33mstart git push check\033[0m'
	pip3 install -r requirments.txt
fi



