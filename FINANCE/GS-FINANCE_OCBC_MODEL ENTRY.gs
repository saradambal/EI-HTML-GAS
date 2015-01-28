// ***************************************MODEL ENTRY*************************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:KUMAR
//VER 1.01- SD:19/09/2014 ED:19/09/2014,TRACKER NO:678,Implemented preloader and msgbox position script
//ver 1.00- SD:22/08/2014 ED:22/08/2014,TRACKER NO:678:Updated jquery and css links 
//VER 0.09- SD:19/06/2014 ED:19/06/2014,TRACKER NO:678 Added conn failure message.
//VER 0.08- SD:09/06/2014 ED:09/06/2014,TRACKER NO:678,Added commit() command after inserting record.
//VER 0.07- SD:06/06/2014 ED:06/06/2014,TRACKER NO:678,changed preloader and jquery,css links.
//VER 0.06- SD:08/03/2014 ED:08/03/2014,TRACKER NO:678 changed uld id and repeated queries put in eilib.
//VER 0.05- SD:02/01/2014 ED:02/01/2014,TRACKER NO:678 cleared autogorw issue.
//VER 0.04- SD:16/12/2013 ED:16/12/2013,TRACKER NO:678 set maxlength and auto grow for model textbox in ver 0.04
//VER 0.03- SD:03/12/2013 ED:03/12/2013,TRACKER NO:171Added Return function script in ver0.03
//VER 0.02- SD:30/11/2013 ED:30/11/2013,TRACKER NO:171-changed html file name and gs file name in ver0.02
//VER 0.01-INITIAL VERSION-SD:14/09/2013 ED:17/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  function MODEL_ENTRY_existingmodels(modelname)
  {
    var MODEL_ENTRY_conn =eilib.db_GetConnection(); 
    var MODEL_ENTRY_result=eilib.getBankTransferModels(MODEL_ENTRY_conn);
    for(var i=0;i<MODEL_ENTRY_result.length;i++)
    {
      if(MODEL_ENTRY_result[i].modelname==modelname)
      { var model_flag=1; break; }
      else
      { model_flag=0;}
    }
    if(model_flag==null)
    { model_flag=0; }
    var MODEL_ENTRY_error=eilib.GetErrorMessageList(MODEL_ENTRY_conn,'3');
    var MODEL_ENTRY_RESULTS={flag:model_flag,conform:MODEL_ENTRY_error.errormsg}
    return MODEL_ENTRY_RESULTS;
    MODEL_ENTRY_conn.close();
  }
  function FIN_OCBC_MODEL_ENTRY_processFormSubmit(MODEL_ENTRY_details)
  {
    var modelname=MODEL_ENTRY_details.FIN_OCBC_MODEL_ENTRY_tb_modelname;
    var MODEL_ENTRY_conn =eilib.db_GetConnection(); 
    var MODEL_ENTRY_insertstmt=MODEL_ENTRY_conn.createStatement();
    var modelinsertquery="INSERT INTO BANK_TRANSFER_MODELS(BTM_DATA,ULD_ID) VALUES('"+modelname+"',(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"'))"
    MODEL_ENTRY_insertstmt.execute(modelinsertquery);
    MODEL_ENTRY_insertstmt.close();
    MODEL_ENTRY_conn.commit();
    MODEL_ENTRY_conn.close();
    return 'true';
  }
}
catch(err)
{
}