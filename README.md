# SheetsSMS
Script for Google Sheets that allows you to pull data from multiple sheets, by ID, and send an SMS to a phone number listed on the sheet

You will need a Twilio account to send the SMS from. www.twilio.com

This setup uses a master sheet with a table of all the individual sheet IDs (employees, assets, etc) to capture data such as work schedule,
and then send an SMS with the data from that sheet to a number listed on the sheet. 
