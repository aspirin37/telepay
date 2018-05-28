#!/bin/bash

if [ $# -eq 0 ]; then
	echo 'No params specified'
	while true; do
	    read -t 5 -p "Open in browser(y/n)? Defaults to y in 5s: " yn
	    if [ "$yn" = "" ]; then
		    yn="y"
		fi

		echo $yn

	    case $yn in
	        [Yy]* ) OPEN="--open"; break;;
	        [Nn]* ) OPEN=''; break;;
	        * ) echo "Please answer y or n.";;
	    esac
	done

	while true; do
	    read -t 5 -p "Local,dev or prod(l/d/p)? Defaults to l in 5s: " ldp
	    if [ "$ldp" = "" ]; then
		    ldp="l"
		fi
		
		echo $ldp   

		case $ldp in
	        [Ll]* ) API='--env.url loc'; break;;
	        [Dd]* ) API='--env.url dev'; break;;
			[Pp]* ) API=''; break;;
	        * ) echo "Please answer l,d or p.";;
	    esac
	done	
else
	if [ $1 = 'l' ]; then
		echo "Run dev-server on loc url"
		OPEN=''
		API='--env.url loc'
	elif [ $1 = 'd' ]; then
		echo "Run dev-server on dev url"
		OPEN=''
		API='--env.url dev'
	elif [ $1 = 'p' ]; then
		echo "Run dev-server on prod url"
		OPEN=''
		API=''
	else
		echo 'Run default setting - just start ds on local backend'
		OPEN=''
		API='--env.url loc'
	fi
fi

yarn start_ds $API $OPEN || { 
	if [ $? != 1 ]; then
		echo >&2 "You don't have yarn, using npm"
		npm run start_ds -- $API $OPEN || {
			if [ $? != 1 ]; then
				echo >&2 "WTF, Install npm!"
				exit $ERROR_CODE
			fi
		}
	fi
}