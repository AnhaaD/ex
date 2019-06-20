cp openware.js ./src/openware.js
cd src;
find . -maxdepth 1 -type f -exec sed -i "s/\@openware\/components/\.\/openware/g" {} \;
find . -maxdepth 2 -type f -exec sed -i "s/\@openware\/components/\.\.\/openware/g" {} \;
find . -maxdepth 3 -type f -exec sed -i "s/\@openware\/components/\.\.\/\.\.\/openware/g" {} \;
find . -maxdepth 4 -type f -exec sed -i "s/\@openware\/components/\.\.\/\.\.\/\.\.\/openware/g" {} \;
find . -maxdepth 5 -type f -exec sed -i "s/\@openware\/components/\.\.\/\.\.\/\.\.\/\.\.\/openware/g" {} \;
find . -maxdepth 6 -type f -exec sed -i "s/\@openware\/components/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/openware/g" {} \;
find . -maxdepth 7 -type f -exec sed -i "s/\@openware\/components/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/openware/g" {} \;
find . -maxdepth 8 -type f -exec sed -i "s/\@openware\/components/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/openware/g" {} \;
find . -maxdepth 9 -type f -exec sed -i "s/\@openware\/components/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/openware/g" {} \;
find . -maxdepth 10 -type f -exec sed -i "s/\@openware\/components/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/openware/g" {} \;

find . -type f -exec sed -i "s/bitcoincashjs/bitcore-lib-cash/g" {} \;