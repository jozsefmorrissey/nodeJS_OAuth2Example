#!/bin/bash

source ./commandParser.sh
source ./properties.sh

user=${flags[user]}
password=${flags[password]}
unset flags[password]
unset flags[user]

rootPassword=$(pst value system mysql)

if [ -z $user ]
then
  testPropFile=../../config/dev.properties
  password=$(getValue mysql.test.password $testPropFile)
  database=$(getValue mysql.test.database $testPropFile)
  host=$(getValue mysql.test.host $testPropFile)
  user=$(getValue mysql.test.user $testPropFile)
else
  propFile=../../config/prod.properties
  host=$(getValue host $propFile)
  database=$(getValue database $propFile)
fi

echo -e "user $user\npassword $password\ndatabase $database"
./run.sh -type mySql -host $host -database $database -user $user \
          -password $password -rootPassword $rootPassword  $(boolStr) $(flagStr)
