//*****************************************MODEL SEARCH/UPDATE******************************************//
//*******************************************FILE DESCRIPTION*********************************************//
//DONE BY:PUNI
//VER 1.05- SD:11/03/2015 ED:11/03/2015,updated autocommit false for new connection string
//VER 1.04- SD:07/10/2014 ED:07/10/2014,TRACKER NO:678,changed preloader pos when clicking srch btn
//DONE BY:KUMAR
//VER 1.03- SD:19/09/2014 ED:19/09/2014,TRACKER NO:678,Implemented preloader and msgbox position script
//ver 1.02- SD:27/08/2014 ED:27/08/2014,TRACKER NO:678 Cleared obsolute flag update issue
//ver 1.01- SD:22/08/2014 ED:22/08/2014,TRACKER NO:678 updateD new jquery and css links.
//ver 1.00- SD:28/06/2014 ED:28/06/2014,TRACKER NO:678 cleared conn issue.
//VER 0.09- SD:19/06/2014 ED:19/06/2014,TRACKER NO:678 Added conn failure message.
//VER 0.08- SD:09/06/2014 ED:09/06/2014,TRACKER NO:678,Added commit() command after Updating record.
//VER 0.07- SD:06/06/2014 ED:06/06/2014,TRACKER NO:678,changed preloader and jquery,css links.
//VER 0.06- SD:08/03/2014 ED:08/03/2014,TRACKER NO:678 changed uld id and repeated queries put in eilib.
//VER 0.05- SD:03/01/2014 ED:03/01/2014,TRACKER NO:680 gave error msg for nodata available table.
//VER 0.04- SD:16/12/2013 ED:16/12/2013,TRACKER NO:680 set maxlength and auto grow for model textbox in ver 0.04
//VER 0.03- SD:03/12/2013 ED:03/12/2013,TRACKER NO:171Added Return function script in ver0.03
//VER 0.02- SD:30/11/2013 ED:30/11/2013,TRACKER NO:171-changed html file name and gs file name in ver0.02
//VER 0.01-INITIAL VERSION-SD:14/09/2013 ED:17/09/2013,TRACKER NO:171
//*********************************************************************************************************//
try
{
  function MODEL_SRC_commonvalues()
  {
    var MODEL_SRC_conn =eilib.db_GetConnection();
    var MODEL_SRC_model_array =eilib.getBankTransferModels(MODEL_SRC_conn)
    /////////////////////ERROR MESSAGE///////////////////
    var MODEL_SRC_errorstmt = MODEL_SRC_conn.createStatement();
    var MODEL_SRC_error_array =eilib.GetErrorMessageList(MODEL_SRC_conn,'4,5');
    var MODEL_RESULTS={error:MODEL_SRC_error_array.errormsg,model:MODEL_SRC_model_array};
    return MODEL_RESULTS;
    MODEL_SRC_conn.close();
  }
  function MODEL_SRC_processFormSubmit(modelname)
  {
    var model_name=modelname.MODEL_SRC_lb_modelname;
    var MODEL_SRC_conn =eilib.db_GetConnection();
    var MODEL_SRC_model_stmt = MODEL_SRC_conn.createStatement();
    var MODEL_SRC_modelselect_query ="SELECT BTM.BTM_ID,BTM.BTM_DATA,BTM.BTM_OBSOLETE,ULD.ULD_LOGINID,DATE_FORMAT(CONVERT_TZ(BTM.BTM_TIMESTAMP,"+timeZoneFormat+"),'%d-%m-%Y %T') AS BTM_TIME_STAMP FROM BANK_TRANSFER_MODELS BTM,USER_LOGIN_DETAILS ULD WHERE BTM_DATA='"+model_name+"' AND ULD.ULD_ID=BTM.ULD_ID "; 
    var MODEL_SRC_model_resultset = MODEL_SRC_model_stmt.executeQuery(MODEL_SRC_modelselect_query)
    if(MODEL_SRC_model_resultset.next())
    {
      var modelid=MODEL_SRC_model_resultset.getString("BTM_ID");
      var model=MODEL_SRC_model_resultset.getString("BTM_DATA");
      var obsolute=MODEL_SRC_model_resultset.getString("BTM_OBSOLETE");
      if(obsolute==null){obsolute=""}
      var userstamp=MODEL_SRC_model_resultset.getString("ULD_LOGINID");
      var timestamp=MODEL_SRC_model_resultset.getString("BTM_TIME_STAMP");
      var MODEL_SRC_model_array={id:modelid,modelname:model,obsolute:obsolute,user:userstamp,time:timestamp};
    }
    MODEL_SRC_model_resultset.close();
    MODEL_SRC_model_stmt.close();
    return MODEL_SRC_model_array;
    MODEL_SRC_conn.close();
  }
  function MODEL_SRC_existingmodels(modelname)
  {
    var MODEL_SRC_conn =eilib.db_GetConnection(); 
    var MODEL_SRC_result=eilib.getBankTransferModels(MODEL_SRC_conn);
    for(var i=0;i<MODEL_SRC_result.length;i++)
    {
      if(MODEL_SRC_result[i].modelname==modelname)
      { var model_flag=1;break;}
      else
      { model_flag=0;}
    }
    return model_flag;
    MODEL_SRC_conn.close();
  }
 function MODEL_SRC_modelupdation(modelname,modelid,obsolute)
  {
    var MODEL_SRC_conn =eilib.db_GetConnection();
    MODEL_SRC_conn.setAutoCommit(false);
    var flag='X'
    if(obsolute==false || obsolute==undefined){obsolute=null}else{obsolute="'"+flag+"'"}
    var MODEL_SRC_updatestmt=MODEL_SRC_conn.createStatement();
    var MODEL_SRC_updatequery="UPDATE BANK_TRANSFER_MODELS SET BTM_OBSOLETE="+obsolute+",BTM_DATA='"+modelname+"',ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"') WHERE BTM_ID='"+modelid+"'";
    MODEL_SRC_updatestmt.execute(MODEL_SRC_updatequery);
    MODEL_SRC_updatestmt.close();
    MODEL_SRC_conn.commit();
    var model=eilib.getBankTransferModels(MODEL_SRC_conn);
    return model;
    MODEL_SRC_conn.close();
  }
  function MODEL_SRC_modeldeletion(modelid,obsolete)
  {
    var MODEL_SRC_conn =eilib.db_GetConnection();
    var MODEL_idcheckstmt=MODEL_SRC_conn.createStatement();
    var MODEL_idcheckquery="SELECT BTM_ID FROM BANK_TRANSFER WHERE BTM_ID="+modelid+"";
    var MODEL_idcheckresult=MODEL_idcheckstmt.executeQuery(MODEL_idcheckquery);
    if(MODEL_idcheckresult.next())
    {
      var flag=0
      var MODEL_SRC_updatestmt=MODEL_SRC_conn.createStatement();
      var MODEL_SRC_updatequery="UPDATE BANK_TRANSFER_MODELS SET BTM_OBSOLETE='X',ULD_ID=(SELECT ULD_ID FROM USER_LOGIN_DETAILS WHERE ULD_LOGINID='"+UserStamp+"') WHERE BTM_ID="+modelid+"";
      MODEL_SRC_updatestmt.execute(MODEL_SRC_updatequery);
      MODEL_SRC_updatestmt.close();
      MODEL_SRC_conn.commit();
    }
    else
    {
    flag=eilib.DeleteRecord(MODEL_SRC_conn, 73, modelid);
   }
    var model=eilib.getBankTransferModels(MODEL_SRC_conn);
    var returnvalue=[model,flag]
    return returnvalue;
    MODEL_SRC_conn.close();
  }
}
catch(err)
{
}
