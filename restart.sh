filepath=$(cd "$(dirname "$0")"; pwd)

cd $filepath

#lavas build

# pm2 stop draw
# pm2 delete draw

pm2 restart $filepath/pm2.json
pm2 show draw