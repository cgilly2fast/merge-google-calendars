function sync() {
  var numDaysOut = 90; // merges all x days out, and only future events
  var masterId = //id of calendar events will be synced to
  "a05f36v81m65shdn44lbnudo@group.calendar.google.com";
  var ids = [
    "6egh8csi6u0d3c16tcjg1inau9r7n1@import.calendar.google.com",
    "r7u2rm3q67085jbbh8s6p9mrnhqa3s3q@import.calendar.google.com"
  ]; //ids of the listing import calendars


  for (i in ids) {
    var id = ids[i];

    var cal = CalendarApp.getCalendarById(id);
    var today = new Date();
    var enddate = new Date();
    enddate.setDate(today.getDate() + numDaysOut); // only merges event numDaysOut, and only future events
    var events = cal.getEvents(today, enddate); // holds the events to be merged

    var mycal = CalendarApp.getCalendarById(masterId);

    var myevs = mycal.getEvents(today, enddate);

    var evi, myev;

    for (ev in events) {
      var eviStart, eviEnd;
      var exist = true;
      evi = events[ev];

      var eviStart = evi.isAllDayEvent()
        ? evi.getAllDayStartDate()
        : evi.getStartTime();
      var eviEnd = evi.isAllDayEvent()
        ? evi.getAllDayEndDate()
        : evi.getEndTime();

      // if evi exists in myevs it does nothing ("continue")
      // have a second loop that checks each event in events against myev to see if they are the same
      // if myev does not exist in events delete it
      // will have to have myevs rotate through the array of ids to check all calendars
      for (myev in myevs) {
        if (
          myevs[myev].getStartTime().getTime() == eviStart.getTime() &&
          myevs[myev].getEndTime().getTime() == eviEnd.getTime()
        ) {
          exist = false;
          break;
        }
      }

      if (exist === true) {
        if (evi.isAllDayEvent()) {
          mycal.createAllDayEvent(
            evi.getTitle(),
            eviStart,
            eviEnd,
            { location: evi.getLocation(), description: evi.getDescription() }
          );
        } else {
          mycal.createEvent(
            evi.getTitle(),
            eviStart,
            eviEnd,
            { location: evi.getLocation(), description: evi.getDescription() }
          );
        }
      }
    }

    var calendars = new Array();

    for (i in ids) {
      calendars[calendars.length] = CalendarApp.getCalendarById(
        ids[i]
      ).getEvents(today, enddate);
    }

    for (myev in myevs) {
      var count = 0;
      Utilities.sleep(1000);
      var exist = false;

      for (eventList in calendars) {
        for (ev in calendars[eventList]) {
          count++;
          if (calendars[eventList][ev].isAllDayEvent()) {
          }

          var evStart = calendars[eventList][ev].isAllDayEvent()
            ? calendars[eventList][ev].getAllDayStartDate()
            : calendars[eventList][ev].getStartTime();
          var evEnd = calendars[eventList][ev].isAllDayEvent()
            ? calendars[eventList][ev].getAllDayEndDate()
            : calendars[eventList][ev].getEndTime();

          if (
            myevs[myev].getStartTime().getTime() == evStart.getTime() &&
            myevs[myev].getEndTime().getTime() == evEnd.getTime()
          ) {
            exist = true;
            break;
          }
        }
      }

      if (exist === false) {
        myevs[myev].deleteEvent();
      }
    }

    Logger.log("Last ran " + today);
    //Browser.msgBox("added all");
  }
}
