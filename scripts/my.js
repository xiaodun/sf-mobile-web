var os = require('os');
var IPv4, hostName; 
hostName = os.hostname(); 
let {WLAN} = os.networkInterfaces();
console.log(WLAN)
for (var i = 0; i < WLAN.length; i++) 
{ 
    if (WLAN[i].family == 'IPv4') 
    { 
        IPv4 = WLAN[i].address; 
    } 
} 
console.log('----------local IP: ' + IPv4); 
