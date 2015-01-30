//*******************************************AUTO TRIGGER*********************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:KUMAR
//VER 0.01-SD:22/03/2014,ED:22/03/2014 TRACKER NO:764,Completed purge document script.
//all manual trigger merged in one script 
//used common function for both manual and auto trigger.
function ALL_Automatic_TrigerCreation()
{
  /*****PURGE DOCUMENT TRIGGER*********/
//  ScriptApp.newTrigger("AUTO_PURGEDOCUMENT")
//  .timeBased()
//  .atHour(1)
//  .nearMinute(5).everyDays(1)
//  .create();
  /*****CUSTOMER TERMINATION TRIGGER*********/
  ScriptApp.newTrigger("AUTO_CUSTOMERTERMINATION")
  .timeBased()
  .atHour(1)
  .nearMinute(5).everyDays(1)
  .create();
  /*****CUSTOMER EXPIRY WEEK TRIGGER*********/
//  ScriptApp.newTrigger("AUTO_CUSTOMEREXPIRYXWEEK")
//  .timeBased()
//  .atHour(5)
//  .nearMinute(55).everyDays(1)
//  .create();
  /**********ACTIVE CUSTOMER LIST*************/
  ScriptApp.newTrigger("AUTO_ACTIVECUSTOMERLIST")
  .timeBased()
  .atHour(7)
  .nearMinute(55).everyDays(1)
  .create();
  /**********NON PAYMENT REMINDER*************/
//  ScriptApp.newTrigger("AUTO_NONPAYMENTREMINDER")
//  .timeBased()
//  .atHour(6)
//  .nearMinute(55).everyDays(1)
//  .create();
  /**********MONTHLY PAYMENT REMINDER*************/
//  ScriptApp.newTrigger("AUTO_MONTHLYPAYMENTREMINDER")
//  .timeBased()
//  .atHour(1)
//  .nearMinute(5).everyDays(1)
//  .create();
   /********** SITE ACCESS *************/
//  ScriptApp.newTrigger("AUTO_SITEACCESS")
//  .timeBased()
//  .everyMinutes(5)
//  .create();
  /**********ERM LEEDS*************/
//  ScriptApp.newTrigger("AUTO_ERMLEEDS")
//  .timeBased()
//  .atHour(1)
//  .nearMinute(5).everyDays(1)
//  .create();
  /***********TEMP TABLE TRIGGER***********/
   ScriptApp.newTrigger("AUTO_TEMP_TABLE_TRIGGER")
  .timeBased()
  .atHour(2)
  .nearMinute(5).everyDays(1)
  .create();
}
function AUTO_PURGEDOCUMENT()
{
  PURGEDOC();
}
function AUTO_CUSTOMERTERMINATION()
{
  CUSTOMERTERMINATION();
}
function AUTO_CUSTOMEREXPIRYXWEEK()
{
  CUSTOMEREXPIRYXWEEK();
}
function AUTO_ACTIVECUSTOMERLIST()
{
  ACTIVECUSTOMERLIST();
}
function AUTO_NONPAYMENTREMINDER()
{
  NONPAYMENTREMINDER();
}
function AUTO_MONTHLYPAYMENTREMINDER()
{
  MONTHLYPAYMENTREMINDER();
}
function AUTO_SITEACCESS()
{
  SITEACCESS();
}
function AUTO_ERMLEEDS()
{
  ERMLEEDS();
}
function AUTO_TEMP_TABLE_TRIGGER()
{
  TEMP_TABLE_TRIGGER();
}