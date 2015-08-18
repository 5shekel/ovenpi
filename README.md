# ovenpi

##install
```
#connect to network and screen, run rspi-config

#install and start uv4l driver
curl http://www.linux-projects.org/listing/uv4l_repo/lrkey.asc | sudo apt-key add -
echo "deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/ wheezy main" | sudo tee -a /etc/apt/sources.list 
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install uv4l uv4l-raspicam uv4l-raspicam-extras uv4l-server
 
#install nodejs and node-serialport
wget http://nodejs.org/dist/v0.10.16/node-v0.10.16-linux-arm-pi.tar.gz
tar xvfz node-v0.10.16-linux-arm-pi.tar.gz
sudo mv node-v0.10.16-linux-arm-pi /opt/node/
rm node-v0.10.16-linux-arm-pi.tar.gz
echo 'export PATH="$PATH:/opt/node/bin"' | sudo tee -a ~/.bashrc
source ~/.bashrc


# get this
git clone https://github.com/5shekel/ovenpi.git
cd ovenpi/nodeRestToSerial
npm install
sudo mv /etc/uv4l/uv4l-raspicam.conf /etc/uv4l/uv4l-raspicam.conf.default
sudo ln -s ~/ovenpi/etc/uv4l-raspicam.conf /etc/uv4l/uv4l-raspicam.conf
sudo service uv4l_raspicam restart

#run node process, make sure the arduino is connected (default to /dev/ttyACM0)
sudo chmod +x ../etc/play.sh
echo sudo /home/pi/ovenpi/etc/play.sh | sudo tee -a ~/.bashrc 

#run autologin (need automation)
sudo nano /etc/inittab
#1:2345:respawn:/sbin/getty 115200 tty1
1:2345:respawn:/bin/login -f pi tty1 </dev/tty1 >/dev/tty1 2>&1

#change to correct ip for camera strea,
mybe http://stackoverflow.com/a/8440736/184085
sudo reboot now
```

follow 
- [install or upgrade UV4L on Raspbian](http://www.linux-projects.org/modules/sections/index.php?op=viewarticle&artid=14)
- install [node-serialport](https://github.com/voodootikigod/node-serialport) github
- [autologin on pi](http://www.opentechguides.com/how-to/article/raspberry-pi/5/raspberry-pi-auto-start.html)
