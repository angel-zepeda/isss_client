#! /bin/bash

npm run build
cp build/index.html build/200.html
echo control-gestion.surge.sh > build/CNAME
cd build && surge
