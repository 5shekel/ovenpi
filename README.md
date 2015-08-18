# ovenpi

##install
```
#install and start uv4l driver
curl http://www.linux-projects.org/listing/uv4l_repo/lrkey.asc | sudo apt-key add -
echo "deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/ wheezy main" | sudo tee -a /etc/apt/sources.list 
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install uv4l uv4l-raspicam uv4l-raspicam-extras uv4l-server
sudo service uv4l_raspicam restart
 
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
sudo ln -s uv4l-raspicam.conf /etc/uv4l/uv4l-raspicam.conf
sudo service uv4l_raspicam restart

#run node process, make sure the arduino is connected (default to /dev/ttyUSB0)
sudo chmod +x play.sh
echo sudo ./play.sh | sudo tee -a ~/.bashrc 
sudo reboot now
```

follow 
- [install or upgrade UV4L on Raspbian](http://www.linux-projects.org/modules/sections/index.php?op=viewarticle&artid=14)
- install [node-serialport](https://github.com/voodootikigod/node-serialport) github

