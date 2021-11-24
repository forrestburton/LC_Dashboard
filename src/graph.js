import { pointColorScheme, lineColorScheme } from './utils.js'
const NUM_DATA_POINTS = 10;

export function processGraphData (data) {  // Store JSON data into arrays
  let currentUsersOnline = [];
  let currentRamUsage = [];
  let currentCpuUsage = [];
  let currentTimePeriod = [];
  let allUserRamUsage = [];
  let allUserCpuUsage = [];
  let numberOfUsers = 0;
  let currentUserDataPushed = 0;
  var pointColor;
  var lineColor;
  var user;

  for (let i = 0; i < data.length; i++) {  
    user = data[i].User;  // get current user
    pointColor = pointColorScheme[numberOfUsers];
    lineColor = lineColorScheme[numberOfUsers];

    if (i !== 0 && user !== currentUsersOnline[numberOfUsers]) {  // determine if this is a new user, and therefore a new dataset
      allUserRamUsage.push(  // push RAM data for this user
        {
          label: currentUsersOnline[numberOfUsers],  // name of user
          data: currentRamUsage,  //y-axis
          backgroundColor: pointColor,
          borderColor: lineColor,
          borderWidth: 1
        }
      )
      allUserCpuUsage.push(  // push CPU data for this user
        {
          label: currentUsersOnline[numberOfUsers],  // name of user
          data: currentCpuUsage,  //y-axis
          backgroundColor: pointColor,
          borderColor: lineColor,
          borderWidth: 1
        }
      )
      
      numberOfUsers += 1;
      currentUserDataPushed = 0;

      currentRamUsage = [];  // clear datasets for next user
      currentCpuUsage = [];
    }
    currentUsersOnline[numberOfUsers] = user;
    if (currentUserDataPushed >= 10) {
      i += NUM_DATA_POINTS - 1;
    }
    else {
      if (numberOfUsers === 0) {  // We need time peroid from 1 user. Otherwise we will have duplicate time datapoints
        currentTimePeriod.push(data[i].Time);
      }

      currentRamUsage.push(data[i].RAM);
      currentCpuUsage.push(data[i].CPU);
      currentUserDataPushed += 1;
    }
  }

  allUserRamUsage.push(  // Push data one more time for last iteration 
    {
      label: currentUsersOnline[numberOfUsers],  
      data: currentRamUsage,  
      backgroundColor: pointColor,
      borderColor: lineColor,
      borderWidth: 1
    }
  )
  allUserCpuUsage.push(  
    {
      label: currentUsersOnline[numberOfUsers],  
      data: currentCpuUsage,  
      backgroundColor: pointColor,
      borderColor: lineColor,
      borderWidth: 1
    }
  )

  return [allUserRamUsage, allUserCpuUsage, currentTimePeriod];
}