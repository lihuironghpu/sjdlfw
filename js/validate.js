/************************************************************************
 * AUTHOR: 李惠荣
 * FILENAME: validate.js
 * DESCRIPTION: 校验规则编写
 * NOTE: IP校验、端口校验、非空校验、长度校验
 * HISTORY: create 2016/12/20 by lhr;
 ***********************************************************************/




var validateObj = {
    isIP : function(str){
        var isIpNumReg =  /(^[0-9]$|^([1-9][0-9])$|^[1][0-9][0-9]$|^[2][0-4][0-9]$|^[2][5][0-5]$)/;
        var flag = true;
        if(str.split('.') && str.split('.').length === 4){
            var arr = str.split('.');
            for(var i = 0 ; i < arr.length ; i ++){
                if(!isIpNumReg.test(arr[i])){
                    flag = false;
                    break;
                }
            }
        }
        return flag;
    },
    isPort : function(str){

    }
};