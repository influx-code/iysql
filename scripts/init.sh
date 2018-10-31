#!/bin/bash
set -eu

echo 'Check install environment'

NEEDED_COMMANDS="soar git"

for cmd in ${NEEDED_COMMANDS} ; do
	if ! command -v "${cmd}" &> /dev/null ; then
		echo -e "\033[91m${cmd} is not set.Eg:\nalias ${cmd}=/root/${cmd}\nexport ${cmd}=/root/${cmd}\033[0m"
		exit 1
	else
		echo "${cmd} is install."
	fi
done

app='.'
echo -e '\033[33mStart install python dependency\033[0m'
pip3 install -r requirments.txt
exit 0
