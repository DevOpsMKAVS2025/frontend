#!/bin/sh

echo "Zamenjujem vrednost apiHost u booking u main*.js fajlu..."

for file in /usr/share/nginx/html/main*.js; do
  sed -i "s|apiHost:\"[^\"]*\"|apiHost:\"${BOOKINGHOST}\"|g" "$file"
done

echo "Zamenjujem vrednost authService u environments u main*.js fajlu..."

for file in /usr/share/nginx/html/main*.js; do
  sed -i "s|authService:\"[^\"]*\"|authService:\"${AUTHHOST}\"|g" "$file"
done

echo "Pokrećem NGINX..."
nginx -g "daemon off;"