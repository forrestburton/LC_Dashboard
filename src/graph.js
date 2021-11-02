import { pointColorScheme, lineColorScheme } from './utils.js'

export function processGraphData (data) {  // Store JSON data into arrays
    let currentUsersOnline = [];
      let currentRamUsage = [];
      let currentCpuUsage = [];
      let currentTimePeriod = [];
      let allUserRamUsage = [];
      let allUserCpuUsage = [];
      let numberOfUsers = 0;
      var pointColor;
      var lineColor;

      for (let i = 0; i < data.length; i++) {   
        var user = data[i].User;  // get current user
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

          currentRamUsage = [];  // clear datasets for next user
          currentCpuUsage = [];
        }
        currentUsersOnline[numberOfUsers] = user;
        currentTimePeriod.push(data[i].Time);
        currentRamUsage.push(data[i].RAM);
        currentCpuUsage.push(data[i].CPU);
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