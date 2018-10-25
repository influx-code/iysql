#!/bin/bash
set -eu

echo 'Check install environment'

NEEDED_COMMANDS="soar"

for cmd in ${NEEDED_COMMANDS} ; do
	if ! command -v "${cmd}" &> /dev/null ; then
		echo -e "\033[91m${cmd} is not set\033[0m"
		exit 1
	else
		echo "${cmd} is install"
	fi
done

app='.'
echo -e '\033[33mstart git push check\033[0m'
pip3 install -r requirments.txt
exit 0
