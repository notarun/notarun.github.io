#!/usr/bin/env bash

bold="$(tput bold)"
green="$(tput setaf 2)"
reset="$(tput sgr0)"

# output

echo "
${bold}${green}    ___ ${reset}
${bold}${green}   /   |${reset}   Hi. I'm ${green}${bold}Arun Negi${reset}. I am a student and free software enthusiast.
${bold}${green}  / /| |${reset}   I love computers and tinkering with them.
${bold}${green} / ___ |${reset}   Contact: ${green}${bold}arunsnegi@pm.me${reset}
${bold}${green}/_/  |_|${reset}   Github: ${green}${bold}@notarun${reset}

"
