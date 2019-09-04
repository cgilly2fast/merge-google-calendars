# Sync Google Calendars
This code and instructions are based of nelseonj3's post seen here:

http://techingthetech.blogspot.com/2015/04/merging-google-calendars.html

## 1. Create a new Google Apps Script
Go to Google Drive and create a new Google Apps Script (it will be under New > More). Copy the code from above into this new script. 

## 2. Set number of days out to sync
On line 2 set number of days out would like the sript to pull events to be synced. The script only pulls future events.

## 3. Master calendar
On the third line you will see a string of what looks like gibberish ending in "@group.calendar.google.com". This is the address of your master calendar that all the secondary calendars will sync there events too. 

To get a calendar address go to Google Calendar and click the arrow next to the calendar you want. Select Calendar Settings.

![alt text](http://2.bp.blogspot.com/-dJ2YVyMQ83Q/VRy8BF5EYfI/AAAAAAAAqYo/e8R8QpwQ7yQ/s1600/Calendars%2BOptions.PNG "GCalendar Demo1")

In the settings there is a section called Calendar Address. The Calendar ID is what you want. Copy this to the clipboard.

If you accidentally clicked on your primary calendar there will not be a calendar ID available.

![alt text](http://2.bp.blogspot.com/-KZZvkq37dlM/VRy8BIXwd2I/AAAAAAAAqYk/GkxiYw6Iyqc/s1600/Calendar%2BAddress.PNG "GCalendar Demo1")

Now paste the ID over the one in the code. You can delete the other calendars if you want or add more, just be sure to have the Calendar ID in quotation marks and a comma after all but the last one.

## 4. Add calendars to be synced
On the fifth line you will see "vars ids = [". This identifies an array of ids for the calendars you want to merge into your master calendar. These are the source calendars, you can have as many as you want, just put them in a separate lines surrounded by quotation marks with a comma at the end of each one except the last.

Follow instructions in step 2 to find the ids of your secondary calendars

## 5. Auto-Execution
In the Google Apps Script page go to Resources > Current Project's Triggers. Click the link to add a new trigger. Select "sync", "Time-driven", then the time period you want it to run. 

Save the triggers then save the file. From now on the calendar set as master will be updated with the secondary calendars you have selected.