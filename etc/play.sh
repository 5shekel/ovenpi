SCRIPTNAME=`basename $0`
PIDFILE=/var/run/${SCRIPTNAME}.pid


if [ -f ${PIDFILE} ]; then
   #verify if the process is actually still running under this pid
   OLDPID=`cat ${PIDFILE}`
   RESULT=`ps -ef | grep ${OLDPID} | grep ${SCRIPTNAME}`  

   if [ -n "${RESULT}" ]; then
     echo "Script already running! Exiting"
     exit 255
   fi

fi


#grab pid of this process and update the pid file with it
PID=`ps -ef | grep ${SCRIPTNAME} | head -n1 |  awk ' {print $2;} '`
echo ${PID} > ${PIDFILE}

sudo /opt/node/bin/node /home/pi/ovenpi/nodeRestToSerial/index.js /dev/ttyACM0

if [ -f ${PIDFILE} ]; then
    rm ${PIDFILE}
fi
