# Real Time Chatapp
 
## Setup Guide

* Clone the repository
* There are two main folders, (rtchatappfrontend) which is front end React app and (rtchatappserver) which is nodejs server.
* Open two terminals, navigate into two folders mentioned above and Paste the command on both terminals.

```
npm i --save
```

### Front end

* In rtchatappfrontend folder, paste the command below it will start the react app.

```
npm start
```

### Back end
 
* In rtchatappserver folder, paste the below two commands separately in two termials, it start the nodejs server.

```
npm run start
tsc -watch
```

* If tsc error occurs then paste this below command

```
npm install -g typescript
```

### Working

* React app started running in local host in your browser, start same localhost react app in another tab or another browser.
* Make it side by side window, you are now running two users.
* Set Username in both window then it started connecting to server (You receive an alert message if you are connected)
* Start messaging from both apps it will transfer message to both clients
