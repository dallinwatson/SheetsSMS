function textThePilots() {        // Primary function launched by the toolbar option Text Message > Send Schedule to Pilots
  
var masterSheet = SpreadsheetApp.openById("");   // Sheet ID of the master record of all individual schedule IDs ( A or B)
  
var idTable = masterSheet.getSheetByName('Sheet1'); // important!!  The getRange/Row/Values methods only work on a sheet, so you must specify the name of the tab/sheet in the spreadsheet. It's important to understand the difference between "spreadsheet" and "sheet"

var numRows = idTable.getLastRow();

var dataRange = idTable.getRange(1, 2, numRows, 1);

var data = dataRange.getValues();
  

  for (i in data) {     // ^ Loop through all sheet IDs in Master sheet 
    
    sendAll(data[i]);  // then pass each Spreadsheet ID to sendAll
}
  
}


function sendSms(to, body) {                          // Twilio API call
  var messages_url = "https://api.twilio.com/2010-04-01/Accounts/YOURACCOUNT/Messages.json";

  var payload = {
    "To": to,
    "Body" : body,
    "From" : "13852501409"
  };

  var options = {
    "method" : "post",
    "payload" : payload
  };

  options.headers = { 
    "Authorization" : "Basic " + Utilities.base64Encode("CREDENTIALS:CREDENTIALS")
  };

  UrlFetchApp.fetch(messages_url, options);
}

function sendAll(sheetID) {                    // gather the schedule data from the individual sheet, and send an sms to the phone number on the sheet
  var sheet = SpreadsheetApp.openById(sheetID).getSheetByName("Sheet1"); // all individual sheets/tabs in the pilot schedule spreadsheets need to have this default name 
  var date = Utilities.formatDate(sheet.getRange(1,1).getValue(), Session.getScriptTimeZone(), "EEE, MM-dd-yyyy");
  var preFlight = "Pre-Flight: " + sheet.getRange("B3").getValue();
  var flight1 = sheet.getRange("A4").getValue();
  var flight1Time = sheet.getRange("B4").getValue();  // use .getDisplayValue if wanting only hh:mm time formats
  var flight1Type = sheet.getRange("C4").getValue();
  var flight1AC = sheet.getRange("D4").getValue();
  var flight2 = sheet.getRange("A5").getValue();
  var flight2Time = sheet.getRange("B5").getValue();
  var flight2Type = sheet.getRange("C5").getValue();
  var flight2AC = sheet.getRange("D5").getValue();
  var flight3 = sheet.getRange("A6").getValue();
  var flight3Time = sheet.getRange("B6").getValue();
  var flight3Type = sheet.getRange("C6").getValue();
  var flight3AC = sheet.getRange("D6").getValue();
  var phoneNum = sheet.getRange("B10").getValue();
  
  var schedule = date+"\n"+preFlight+"\n"+flight1+": "+flight1Time+" "+flight1Type+" "+flight1AC+"\n"+flight2+": "+flight2Time+" "+flight2Type+" "+flight2AC+"\n"+flight3+": "+flight3Time+" "+flight3Type+" "+flight3AC;
  

sendSms(phoneNum, schedule);

  
}

function onOpen() {                // Create a menu item on the toolbar to send the schedule on click
  var ui = SpreadsheetApp.getUi();
 
    ui.createMenu('Text Message')
      .addItem('Send Schedule to Pilots', 'menuItem1')
      .addToUi();
}

  function menuItem1() {
   textThePilots();
   SpreadsheetApp.getUi() 
     .alert('This schedule has been sent to all pilots!');
}
