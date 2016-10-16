#!/etc/bin/env bash



cd ./src && gitbook build

cd ../ && rm -rf ./gitbook ./*.html ./*.md ./*.json

cd ./src && cp -r ./_book/* ./../