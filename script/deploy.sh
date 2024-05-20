#!/bin/bash

LOCAL_DIR='build/'
ADDRESS="103.200.20.74"
USER="root"
TARGET_DIR='www/thegreenpower.vn'

GREEN="\033[0;32m"
RED="\033[0;31m"
RESET="\033[0m"


echo -e "${RED}Removing old build...${RESET}"
rm -rf /build

echo -e "${GREEN}Start building...${RESET}"
if ! yarn build ; then
    echo -e "${RED}Build failed. Exiting deployment script.${RESET}"
    exit 1
fi


rsync -zaP -a  ${LOCAL_DIR} ${USER}@${ADDRESS}:${TARGET_DIR}
rsync -zaP  package.json ${USER}@${ADDRESS}:${TARGET_DIR}

ssh ${USER}@${ADDRESS} 'bash -s' <<'ENDSSH'
  cd www/thegreenpower.vn
  echo -e '\033[0;32mInstalling dependencies... \033[0m'
  npm install

  echo -e '\033[0;32mRestarting server...'
  export NODE_ENV=production && pm2 restart --update-env  app/rest/index.js

ENDSSH


