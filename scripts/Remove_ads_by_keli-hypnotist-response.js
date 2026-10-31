$done({body:($response.body || "").replace(new RegExp("<GetADResult>\\.\\*\\?</GetADResult>",""),"<GetADResult>{\"ret\":0,\"msg\":\"正常\",\"err_code\":0,\"data\":{\"ad\":[]}}</GetADResult>")});
