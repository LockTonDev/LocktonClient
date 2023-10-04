var L=Object.defineProperty;var R=(E,u,C)=>u in E?L(E,u,{enumerable:!0,configurable:!0,writable:!0,value:C}):E[u]=C;var D=(E,u,C)=>(R(E,typeof u!="symbol"?u+"":u,C),C);const A=class{static updateValidTitles(){Object.keys(A.VALID).forEach(u=>{const C=A.VALID[u];C.REQUIRED=`${C.TITLE} ${A.MESSAGE.REQUIRED}`})}};let B=A;D(B,"MESSAGE",{REQUIRED:"\uC744(\uB97C) \uC785\uB825\uD574\uC8FC\uC138\uC694."}),D(B,"VALID",{user_id:{LABEL:"\uC544\uC774\uB514",REQUIRED:"",MAXLENGTH:40},user_nm:{LABEL:"\uC774\uB984",REQUIRED:"",MAXLENGTH:50},user_birth:{LABEL:"\uC0DD\uB144\uC6D4\uC77C",REQUIRED:"",MAXLENGTH:8},user_regno:{LABEL:"\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638",REQUIRED:"",MAXLENGTH:13},user_hpno:{LABEL:"\uD734\uB300\uC804\uD654\uBC88\uD638",REQUIRED:"",MAXLENGTH:20},user_email:{LABEL:"\uC774\uBA54\uC77C",REQUIRED:"",MAXLENGTH:100},corp_nm:{LABEL:"\uAE30\uC5C5\uBA85",REQUIRED:"",MAXLENGTH:100},corp_ceo_nm:{LABEL:"\uB300\uD45C\uC790\uBA85",REQUIRED:"",MAXLENGTH:50},corp_bnno:{LABEL:"\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638",REQUIRED:"",MAXLENGTH:10},corp_cnno:{LABEL:"\uBC95\uC778\uB4F1\uB85D\uBC88\uD638",REQUIRED:"",MAXLENGTH:13},corp_telno1:{LABEL:"\uC0AC\uBB34\uC18C \uC804\uD654\uBC88\uD638",REQUIRED:"",MAXLENGTH:20},corp_telno2:{LABEL:"\uC0AC\uBB34\uC18C \uC804\uD654\uBC88\uD638",REQUIRED:"",MAXLENGTH:20},corp_telno3:{LABEL:"\uC0AC\uBB34\uC18C \uC804\uD654\uBC88\uD638",REQUIRED:"",MAXLENGTH:20},corp_faxno1:{LABEL:"\uC0AC\uBB34\uC18C \uD329\uC2A4\uBC88\uD6381",REQUIRED:"",MAXLENGTH:20},corp_faxno2:{LABEL:"\uC0AC\uBB34\uC18C \uD329\uC2A4\uBC88\uD6382",REQUIRED:"",MAXLENGTH:20},corp_faxno3:{LABEL:"\uC0AC\uBB34\uC18C \uD329\uC2A4\uBC88\uD6383",REQUIRED:"",MAXLENGTH:20},corp_cust_nm:{LABEL:"\uB2F4\uB2F9\uC790 \uC131\uBA85",REQUIRED:"",MAXLENGTH:50},corp_cust_email:{LABEL:"\uC774\uBA54\uC77C",REQUIRED:"",MAXLENGTH:100},corp_region_no:{LABEL:"\uC18C\uC18D \uC9C0\uBC29\uD68C",REQUIRED:"",MAXLENGTH:50},corp_region_nm:{LABEL:"\uC18C\uC18D \uC9C0\uBC29\uD68C",REQUIRED:"",MAXLENGTH:50},corp_post:{LABEL:"\uC0AC\uBB34\uC18C \uC6B0\uD3B8\uBC88\uD638",REQUIRED:"",MAXLENGTH:10},corp_addr:{LABEL:"\uC0AC\uBB34\uC18C \uC8FC\uC18C",REQUIRED:"",MAXLENGTH:100},insr_st_dt:{LABEL:"\uBCF4\uD5D8\uC2DC\uC791\uC77C\uC790",REQUIRED:"",MAXLENGTH:10},insr_cncls_dt:{LABEL:"\uBCF4\uD5D8\uC885\uB8CC\uC77C\uC790",REQUIRED:"",MAXLENGTH:10},insr_pblc_brdn_rt:{LABEL:"\uACF5\uB3D9\uBCF4\uD5D8",REQUIRED:"",MAXLENGTH:100},insr_clm_lt_amt:{LABEL:"\uBCF4\uC0C1\uD55C\uB3C4",REQUIRED:"",MAXLENGTH:100},insr_psnl_brdn_amt:{LABEL:"\uC790\uAE30\uBD80\uB2F4\uAE08",REQUIRED:"",MAXLENGTH:100},agr10_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uC2E0\uCCAD\uB0B4\uC6A9",REQUIRED:"",MAXLENGTH:1},agr20_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uBCF4\uD5D8 \uC57D\uAD00",REQUIRED:"",MAXLENGTH:1},agr30_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uACC4\uC57D \uCCB4\uACB0\xB7\uC774\uD589 \uB4F1\uC744 \uC704\uD55C \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uCC98\uB9AC",REQUIRED:"",MAXLENGTH:1},agr31_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uACC4\uC57D \uCCB4\uACB0\xB7\uC774\uD589 \uB4F1\uC744 \uC704\uD55C \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uCC98\uB9AC",REQUIRED:"",MAXLENGTH:1},agr32_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uACC4\uC57D \uCCB4\uACB0\xB7\uC774\uD589 \uB4F1\uC744 \uC704\uD55C \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uCC98\uB9AC",REQUIRED:"",MAXLENGTH:1},agr33_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uACC4\uC57D \uCCB4\uACB0\xB7\uC774\uD589 \uB4F1\uC744 \uC704\uD55C \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uCC98\uB9AC",REQUIRED:"",MAXLENGTH:1},agr34_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uACC4\uC57D \uCCB4\uACB0\xB7\uC774\uD589 \uB4F1\uC744 \uC704\uD55C \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uCC98\uB9AC",REQUIRED:"",MAXLENGTH:1},agr40_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uC0C1\uD488\uC124\uBA85\uD655\uC778\uC11C",REQUIRED:"",MAXLENGTH:1},agr41_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uC0C1\uD488\uC124\uBA85\uD655\uC778\uC11C",REQUIRED:"",MAXLENGTH:1},agr50_yn:{LABEL:"[\uC57D\uAD00\uB3D9\uC758] \uAC00\uC785\uC2E0\uCCAD",REQUIRED:"",MAXLENGTH:1},cbr_nm:{LABEL:"\uC138\uBB34\uC0AC \uBA85\uB2E8 \uC131\uBA85",REQUIRED:"",MAXLENGTH:50},cbr_brdt:{LABEL:"\uC138\uBB34\uC0AC \uBA85\uB2E8 \uC0DD\uB144\uC6D4\uC77C",REQUIRED:"",MAXLENGTH:8},cbr_regno:{LABEL:"\uC138\uBB34\uC0AC \uBA85\uB2E8 \uB4F1\uB85D\uBC88\uD638",REQUIRED:"",MAXLENGTH:50},isCheck:{LABEL:"\uC138\uBB34\uC0AC \uBA85\uB2E8 \uC778\uC99D",REQUIRED:"",MAXLENGTH:1}});B.updateValidTitles();
