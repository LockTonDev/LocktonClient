import{a as S}from"./A_CONTRACT.f7702a7f.js";import{d as p,u as Y,s as $,r as E,o as m,c,e as y,w as n,O as k,g,f as e,h as v,C as f,j as h,m as u,ar as i,p as b,i as B,B as w,J as x,K as V,N}from"./index.469b2f08.js";const T=["src"],_u=p({__name:"V_TACC0030P10",props:{baseYear:{type:String,required:!1}},setup(t){const d=t,a=Y(),{_AUTH_USER:C}=$(a);let s=E([]);E([]);const F=E("");return m(async()=>{const o={user_cd:C.value.userCd,business_cd:C.value.businessCd,base_year:d.baseYear},_=await S.getDBSelInsuranceRate(o);s.value=_.data[0],F.value="/assets/doc/insr_table/\uD68C\uACC4\uC0AC_\uAC1C\uC778_\uBCF4\uD5D8\uB8CC\uD45C_"+s.value.base_year+".pdf"}),(o,_)=>(c(),y(g,null,{default:n(()=>[(c(),k("iframe",{key:F.value,src:F.value,width:"100%",height:"800px"},null,8,T))]),_:1}))}}),r=t=>(x("data-v-1f285125"),t=t(),V(),t),I=r(()=>u("div",{class:"text-h6 font-weight-medium"},[B(" \uD68C\uACC4\uC0AC\uC804\uBB38\uC778\uBC30\uC0C1\uCC45\uC784\uBCF4\uD5D8 \uC0C1\uD488\uC124\uBA85 \uD655\uC778\uC11C "),u("span",{class:"text-18"},"(\uD53C\uBCF4\uD5D8\uC790 \uD68C\uACC4\uC0AC \uD655\uC778)")],-1)),R=r(()=>u("ul",{class:"list-style-type-none font-weight-medium"},[u("li",null,"\uBCF4\uD5D8\uACC4\uC57D\uC790 : \uD55C\uAD6D\uACF5\uC778\uD68C\uACC4\uC0AC \uAC10\uC0AC\uBC18\uC5F0\uD569\uD68C ")],-1)),U={class:"v-board-table mt-4 d-flex justify-space-between"},j=r(()=>u("p",{class:"pa-4 pr-0"},[B("\uD68C\uACC4\uC0AC\uC804\uBB38\uC778\uBC30\uC0C1\uCC45\uC784\uBCF4\uD5D8\uC758 \uC8FC\uC694\uC0AC\uD56D\uC5D0 \uB300\uD574 \uB85D\uD1A4\uCEF4\uD37C\uB2C8\uC988\uCF54\uB9AC\uC544\uB85C\uBD80\uD130 \uCDA9\uBD84\uD788 \uC124\uBA85 \uBC1B\uACE0 \uC591\uC9C0\uD558\uC600\uC74C\uC744 \uD655\uC778\uD569\uB2C8\uB2E4."),u("br"),B(" \uC124\uBA85 \uBC1B\uC558\uB2E4\uB294 \uC0AC\uC2E4\uC744 \u201C\uD655\uC778\u201D \uB780\uC5D0 \uCCB4\uD06C \uD574\uC8FC\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4.")],-1)),O={class:"pa-4 text-center"},P=r(()=>u("div",{class:"v-board-table"},[u("table",{class:"w-100"},[u("col",{style:{width:"80px"}}),u("col",{style:{width:"auto"}}),u("thead",null,[u("tr",null,[u("th",null,"\uBC88\uD638"),u("th",null,"\uC8FC\uC694\uC124\uBA85\uB0B4\uC6A9")])]),u("tbody",null,[u("tr",null,[u("td",{class:"text-center"},"1"),u("td",null,[u("span",{class:"font-weight-medium"},"* \uC57D\uAD00 \uC801\uC6A9:"),B(" \uC601\uBB38\uC57D\uAD00\uC774 \uBCF4\uC0C1\uC758 \uAE30\uC900\uC774\uBA70, \uBC88\uC5ED\uBB38\uC740 \uACC4\uC57D\uC790\uC758 \uC774\uD574\uB97C \uB3D5\uAE30 \uC704\uD55C \uCC38\uACE0\uC6A9 \uC785\uB2C8\uB2E4. \uBC88\uC5ED\uBB38\uC758 \uB0B4\uC6A9\uC774 \uC601\uBB38 \uC57D\uAD00\uACFC \uBC30\uCE58\uB420 \uACBD\uC6B0 \uC601\uC5B4\uC758 \uC6D0 \uB73B\uC5D0 \uB530\uB77C \uD574\uC11D\uB429\uB2C8\uB2E4. ")])]),u("tr",null,[u("td",{class:"text-center"},"2"),u("td",null,[u("span",{class:"font-weight-medium"},"* \uBCF4\uC7A5 \uAE30\uC900\uC77C:"),B(" \uBCF4\uD5D8\uACC4\uC57D \uC774\uD6C4 \uC218\uD589\uD55C \uC5C5\uBB34\uBD80\uD130 \uBCF4\uC0C1\uB418\uBA70, \uC18C\uAE09\uB2F4\uBCF4\uC77C(\uD1B5\uC0C1 \uCD5C\uCD08\uAC00\uC785\uC77C) \uC774\uD6C4 \uC218\uD589\uD55C \uC5C5\uBB34\uC5D0 \uAE30\uC778\uD55C \uC0AC\uACE0\uAC00 \uBCF4\uC0C1\uB429\uB2C8\uB2E4. ")])]),u("tr",null,[u("td",{class:"text-center"},"3"),u("td",null,[u("span",{class:"font-weight-medium"},"* \uACC4\uC57D \uC804 \uACE0\uC9C0\uC758\uBB34:"),B(" \uBCF4\uD5D8\uAC00\uC785 \uC774\uC804\uC758 \uC5C5\uBB34\uB85C \uBC1C\uC0DD\uD55C \uC0AC\uACE0, \uAC00\uC785 \uB2F9\uC2DC \uC774\uBBF8 \uBC1C\uC0DD\uD55C \uC0AC\uACE0, \uC190\uD574\uBC30\uC0C1 \uC6D0\uC778\uC774 \uB420 \uC218 \uC788\uC74C\uC744 \uC54C\uACE0 \uC788\uC5C8\uAC70\uB098, \uD569\uB9AC\uC801\uC73C\uB85C \uC608\uACAC\uD560 \uC218 \uC788\uC5C8\uB358 \uC6D0\uC778\uC5D0 \uAE30\uC778\uD55C \uC0AC\uACE0\uB294 \uBCF4\uC0C1\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uB610\uD55C \uC774\uB7EC\uD55C \uC0AC\uC2E4\uC774 \uC788\uB294 \uACBD\uC6B0 \uACC4\uC57D \uCCB4\uACB0 \uB2F9\uC2DC \uBC18\uB4DC\uC2DC \uBCF4\uD5D8\uD68C\uC0AC\uC5D0 \uACE0\uC9C0\uD558\uC5EC\uC57C \uD558\uBA70, \uACE0\uC9C0\uC758\uBB34\uB97C \uC704\uBC18\uD55C \uACBD\uC6B0 \uBCF4\uC0C1\uB418\uC9C0 \uC54A\uAC70\uB098 \uBCF4\uD5D8\uACC4\uC57D\uC774 \uD574\uC9C0\uB420 \uC218 \uC788\uC73C\uB2C8 \uBC18\uB4DC\uC2DC \uC720\uB150\uD558\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4. ")])]),u("tr",null,[u("td",{class:"text-center"},"4"),u("td",null,[u("span",{class:"font-weight-medium"},"* \uACC4\uC57D \uD6C4 \uD1B5\uC9C0\uC758\uBB34:"),B(" \uBCF4\uD5D8\uACC4\uC57D \uC774\uD6C4 \uC190\uD574\uBC30\uC0C1\uCCAD\uAD6C\uAC00 \uC608\uC0C1\uB418\uAC70\uB098 \uC778\uC9C0\uD55C \uACBD\uC6B0, \uCCAD\uAD6C\uAC00 \uC788\uB294 \uACBD\uC6B0\uC5D0\uB294 \uC989\uC2DC \uC11C\uBA74\uC73C\uB85C \uBCF4\uD5D8\uC0AC\uC5D0 \uD1B5\uC9C0\uAC00 \uB418\uC5B4\uC57C \uD569\uB2C8\uB2E4. \uBC18\uB4DC\uC2DC \uD53C\uD574\uC790\uC758 \uC18C\uC1A1\uC774 \uC788\uC5B4\uC57C \uB418\uB294 \uAC83\uC740 \uC544\uB2C8\uBBC0\uB85C \uC0AC\uACE0 \uC0AC\uC2E4\uC744 \uC778\uC9C0\uD558\uAC70\uB098 \uCCAD\uAD6C \uBC1B\uC740 \uACBD\uC6B0 \uC989\uC2DC \uD1B5\uC9C0\uD558\uC2DC\uBA74 \uB429\uB2C8\uB2E4. \uD1B5\uC9C0\uC758\uBB34\uB97C \uC704\uBC18\uD55C \uACBD\uC6B0 \uBA74\uCC45\uB418\uAC70\uB098 \uBD88\uC774\uC775\uC744 \uBC1B\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. ")])]),u("tr",null,[u("td",{class:"text-center"},"5"),u("td",null,[u("span",{class:"font-weight-medium"},"* \uBC30\uC0C1\uCCAD\uAD6C\uAE30\uC900 \uC99D\uAD8C:"),B(" \uC774 \uBCF4\uD5D8\uC740 \uBCF4\uD5D8\uAC00\uC785\uC77C \uC774\uD6C4 \uC218\uD589\uD55C \uC5C5\uBB34\uAC00 \uC720\uD6A8\uD55C \uBCF4\uD5D8\uAE30\uAC04 \uB0B4\uC5D0 \uBC30\uC0C1\uCCAD\uAD6C \uB418\uB294 \uACBD\uC6B0 \uBCF4\uC0C1\uD558\uB294 \uBCF4\uD5D8\uC785\uB2C8\uB2E4. \uB530\uB77C\uC11C \uBCF4\uD5D8 \uB9CC\uAE30\uC2DC \uAC31\uC2E0\uC774 \uACC4\uC18D \uC774\uB904\uC838\uC57C \uACC4\uC18D\uC801\uC778 \uBCF4\uD5D8\uC801\uC6A9\uC744 \uBC1B\uC744 \uC218 \uC788\uACE0, \uB9CC\uAE30\uC2DC \uAC31\uC2E0\uD558\uC9C0 \uC54A\uAC70\uB098 \uB610\uB294 \uBCF4\uD5D8\uAE30\uAC04 \uC911 \uD574\uC9C0\uD558\uB294 \uACBD\uC6B0 \uADF8 \uB54C\uBD80\uD130 \uBCF4\uD5D8\uC758 \uD6A8\uB825\uC774 \uC18C\uBA78\uB429\uB2C8\uB2E4. (\uB2E8, \uC790\uB3D9\uBCF4\uACE0\uC5F0\uC7A5\uAE30\uAC04 60\uC77C \uB0B4\uC5D0 \uBCF4\uD5D8\uC0AC\uC5D0 \uC11C\uBA74 \uD1B5\uBCF4\uB418\uB294 \uACBD\uC6B0 \uBCF4\uC0C1 \uAC00\uB2A5\uD569\uB2C8\uB2E4.) ")])]),u("tr",null,[u("td",{class:"text-center"},"6"),u("td",null,[u("span",{class:"font-weight-medium"},"* \uACF5\uB3D9\uBD80\uB2F4\uBE44\uC728:"),B(" 1\uD68C\uC758 \uBC30\uC0C1\uCCAD\uAD6C\uC5D0 \uB300\uD558\uC5EC \uC190\uD574\uC0AC\uC815 \uD6C4 \uACB0\uC815\uB41C \uC190\uD574\uBC30\uC0C1\uAE08\uC5D0\uC11C \uC790\uAE30\uBD80\uB2F4\uAE08\uC744 \uCC28\uAC10\uD55C \uAE08\uC561(=\uC608\uC0C1 \uC9C0\uAE09\uBCF4\uD5D8\uAE08)\uC758 \uC77C\uC815\uBE44\uC728(%)\uC5D0 \uD574\uB2F9\uD558\uB294 \uAE08\uC561\uC744 \uD53C\uBCF4\uD5D8\uC790\uAC00 \uBD80\uB2F4\uD558\uB294 \uC81C\uB3C4\uC785\uB2C8\uB2E4. (\uC608\uC0C1\uC9C0\uAE09\uBCF4\uD5D8\uAE08\uC5D0\uB294 \uBC29\uC5B4\uBE44\uC6A9 \uBC0F \uC870\uC0AC\uBE44\uAC00 \uD3EC\uD568) ")])]),u("tr",null,[u("td",{class:"text-center"},"7"),u("td",null,[u("span",{class:"font-weight-medium"},"* \u201C\uC57D\uAD00\u201D \uBC0F \u201C\uC608\uC0C1\uC9C8\uBB38\uC5D0 \uB300\uD55C \uB2F5\uBCC0\uC11C\u201D \uD655\uC778:"),B(" \uAE30\uD0C0 \uC57D\uAD00\uC5D0\uC11C \uC815\uD55C "),u("span",{class:"font-weight-medium"},"\uD53C\uBCF4\uD5D8\uC790\uC758 \uBC94\uC704, \uBCF4\uC0C1\uD558\uB294 \uC190\uD574, \uBA74\uCC45 \uADDC\uC815"),B(" \uB4F1\uC740 \uBCF4\uC7A5\uBC94\uC704\uB97C \uACB0\uC815\uD558\uB294 \uC911\uC694\uD55C \uC0AC\uD56D\uC774\uBBC0\uB85C \uBC18\uB4DC\uC2DC \uC815\uB3C5, \uC591\uC9C0\uD558\uC2DC\uAE30 \uBC14\uB77C\uBA70 \uBB38\uC758 \uC0AC\uD56D\uC740 \uC9C8\uC758\uD558\uC2DC\uC5B4 \uAF2D \uD655\uC778\uD558\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4"),u("br"),B("(\uB2F9\uC0AC \uD648\uD398\uC774\uC9C0 \uB85C\uADF8\uC778 \uD6C4 \uC54C\uB9BC\uB9C8\uB2F9 -> \uC790\uB8CC\uC2E4\uC5D0\uC11C \uB2E4\uC6B4\uB85C\uB4DC \uAC00\uB2A5\uD569\uB2C8\uB2E4.) ")])])])])],-1)),q=r(()=>u("p",{class:"font-weight-medium mt-4 word-break-keep-all"},"\uBCF4\uD5D8\uC57D\uAD00\uC740 \uB2F9\uC0AC \uD648\uD398\uC774\uC9C0 \uBCF4\uC7A5\uC0AC\uD56D \uBC0F \uC54C\uB9BC\uB9C8\uB2F9\uC5D0 \uAC8C\uC7AC\uB418\uC5C8\uC73C\uB2C8 \uBC18\uB4DC\uC2DC \uD655\uC778 \uBC0F \uC591\uC9C0\uD558\uC2DC\uAE30 \uBC14\uB78D\uB2C8\uB2E4.",-1)),H={class:"d-flex justify-end mt-4"},J=p({__name:"V_TACC0030P02",props:{agr41_yn:String,isReadonly:Boolean},emits:["close"],setup(t,{emit:d}){const a=t,C=E({agr40_yn:"N",agr41_yn:"N"}),s=E(!1),F=E(!0),o=()=>{C.value.agr41_yn=="Y"&&(C.value.agr40_yn="Y"),d("close",C)};return E(!1),m(async()=>{C.value.agr40_yn=a.agr40_yn||"N",C.value.agr41_yn=a.agr41_yn||"N",s.value=a.isReadonly}),(_,D)=>(c(),y(w,{persistent:"",modelValue:F.value,"onUpdate:modelValue":D[2]||(D[2]=l=>F.value=l),width:"1000px","hide-overlay":"",scrollable:""},{default:n(()=>[e(g,null,{default:n(()=>[e(v,{class:"d-flex align-center justify-space-between"},{default:n(()=>[I]),_:1}),e(f,{class:"mb-0"}),e(h,{class:"px-10 pt-8 pb-14"},{default:n(()=>[R,u("div",U,[j,u("p",O,[e(i,{modelValue:C.value.agr41_yn,"onUpdate:modelValue":D[0]||(D[0]=l=>C.value.agr41_yn=l),"true-value":"Y","false-value":"N","hide-details":"",label:"\uD655\uC778",disabled:s.value},null,8,["modelValue","disabled"])])]),P,q,u("div",H,[e(b,{variant:"flat",color:"primary",onClick:D[1]||(D[1]=l=>o())},{default:n(()=>[B("\uB2EB\uAE30")]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}});const cu=N(J,[["__scopeId","data-v-1f285125"]]),A=t=>(x("data-v-4964f4a5"),t=t(),V(),t),K=A(()=>u("div",{class:"text-h6 font-weight-medium"}," \uACC4\uC57D\uC758 \uCCB4\uACB0\u2219\uC774\uD589 \uB4F1\uC744 \uC704\uD55C \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uCC98\uB9AC \uB3D9\uC758\uC11C (\uACF5\uC778\uD68C\uACC4\uC0AC) ",-1)),M={class:"d-flex justify-space-between align-end"},z=A(()=>u("div",{class:"d-flex justify-space-between align-center"},[u("h3",{class:"text-display-2 font-weight-bold"},"DB\uC190\uD574\uBCF4\uD5D8\uC8FC\uC2DD\uD68C\uC0AC \uADC0\uC911"),u("p",{class:"text-14 color-gray-shadow"},"\uAC01 \uB3D9\uC758\uB780\uC5D0 \uCCB4\uD06C \uD558\uC2ED\uC2DC\uC624")],-1)),G={class:"v-board-table mt-4"},L=A(()=>u("col",{style:{width:"200px"}},null,-1)),Q=A(()=>u("col",{style:{width:"auto"}},null,-1)),W=A(()=>u("col",{style:{width:"100px"}},null,-1)),X=A(()=>u("tr",null,[u("th",null," \uC18C\uBE44\uC790 \uAD8C\uC775\uBCF4\uD638\uC5D0 \uAD00\uD55C \uC0AC\uD56D "),u("td",{colspan:"2"},[u("p",{class:"font-weight-medium"},"\u25AA \uCD5C\uC18C\uD55C\uC758 \uC815\uBCF4 \uCC98\uB9AC \uBC0F \uB3D9\uC758 \uAC70\uBD80\uC5D0 \uAD00\uD55C \uC548\uB0B4"),u("p",null,"\uC815\uBCF4\uB3D9\uC758\uC2DC \uB2F9\uC0AC \uBC0F \uB2F9\uC0AC \uC5C5\uBB34\uC218\uD0C1\uC790\uB294 \uACC4\uC57D\uC758 \uCCB4\uACB0 \uBC0F \uC774\uD589 \uBAA9\uC801\uB2EC\uC131\uC5D0 \uBD80\uD569\uD558\uB294 \uCD5C\uC18C\uD55C\uC758 \uC815\uBCF4\uB9CC \uC218\uC9D1\u2219\uC774\uC6A9 \uBC0F \uC81C\uACF5\uD558\uBA70, \uADC0\uD558\uB294 \uB3D9\uC758\uB97C \uAC70\uBD80\uD560 \uAD8C\uB9AC\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2E8, \uBCF8 \uB3D9\uC758\uB97C \uAC70\uBD80\uD558\uC2DC\uB294 \uACBD\uC6B0\uC5D0\uB294 \uBCF4\uD5D8\uACC4\uC57D\uC758 \uCCB4\uACB0\uC774 \uBD80\uB4DD\uC774\uD558\uAC8C \uAC70\uC808\uB418\uAC70\uB098 \uC815\uC0C1\uC801\uC778 \uC11C\uBE44\uC2A4 \uC81C\uACF5\uC774 \uBD88\uAC00\uB2A5\uD560 \uC218 \uC788\uC74C\uC744 \uC54C\uB824 \uB4DC\uB9BD\uB2C8\uB2E4."),u("p",{class:"font-weight-medium"},"\u25AA \uC2E0\uC6A9\uB4F1\uAE09\uC5D0 \uBBF8\uCE58\uB294 \uC601\uD5A5"),u("p",null,"\uBCF8 \uB3D9\uC758\uC11C\uC5D0 \uC758\uD55C \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uC870\uD68C\uB294 \uADC0\uD558\uC758 \uC2E0\uC6A9\uB4F1\uAE09\uC5D0 \uC601\uD5A5\uC744 \uC8FC\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.")])],-1)),Z=A(()=>u("th",null," 1. \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC218\uC9D1\u2219\uC774\uC6A9\uC5D0 \uAD00\uD55C \uC0AC\uD56D ",-1)),uu=A(()=>u("td",null," \uB2F9\uC0AC \uBC0F \uB2F9\uC0AC \uC5C5\uBB34\uC218\uD0C1\uC790\uB294\u300C\uAC1C\uC778\uC815\uBCF4\uBCF4\uD638\uBC95\u300D\uBC0F \u300C\uC2E0\uC6A9\uC815\uBCF4\uC758 \uC774\uC6A9 \uBC0F \uBCF4\uD638\uC5D0 \uAD00\uD55C \uBC95\uB960\u300D\uC5D0 \uB530\uB77C \uBCF8 \uACC4\uC57D\uACFC \uAD00\uB828\uD558\uC5EC \uADC0\uD558\uC758 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uB97C \uB2E4\uC74C\uACFC \uAC19\uC774 \uC218\uC9D1\u2219\uC774\uC6A9\uD558\uACE0\uC790 \uD569\uB2C8\uB2E4. \uC774\uC5D0 \uB300\uD558\uC5EC \uB3D9\uC758\uD558\uC2ED\uB2C8\uAE4C? ",-1)),Cu={class:"px-0"},Bu=A(()=>u("th",null," 2. \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC870\uD68C\uC5D0 \uAD00\uD55C \uC0AC\uD56D ",-1)),Du=A(()=>u("td",null," \uB2F9\uC0AC \uBC0F \uB2F9\uC0AC \uC5C5\uBB34\uC218\uD0C1\uC790\uB294\u300C\uC2E0\uC6A9\uC815\uBCF4\uC758 \uC774\uC6A9 \uBC0F \uBCF4\uD638\uC5D0 \uAD00\uD55C \uBC95\uB960\u300D\uC5D0 \uB530\uB77C \uBCF8 \uACC4\uC57D\uACFC \uAD00\uB828\uD558\uC5EC \uADC0\uD558\uC758 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uB97C \uB2E4\uC74C\uACFC \uAC19\uC774 \uC2E0\uC6A9\uC815\uBCF4\uC9D1\uC911\uAE30\uAD00 \uBC0F \uBCF4\uD5D8\uC694\uC728\uC0B0\uCD9C\uAE30\uAD00 \uC73C\uB85C\uBD80\uD130 \uC870\uD68C\uD558\uACE0\uC790 \uD569\uB2C8\uB2E4. \uC774\uC5D0 \uB300\uD558\uC5EC \uB3D9\uC758\uD558\uC2ED\uB2C8\uAE4C? ",-1)),Au={class:"px-0"},lu=A(()=>u("th",null," 3. \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC81C\uACF5\uC5D0 \uAD00\uD55C \uC0AC\uD56D ",-1)),eu=A(()=>u("td",null," \uB2F9\uC0AC \uBC0F \uB2F9\uC0AC \uC5C5\uBB34\uC218\uD0C1\uC790\uB294\u300C\uAC1C\uC778\uC815\uBCF4\uBCF4\uD638\uBC95\u300D\uBC0F\u300C\uC2E0\uC6A9\uC815\uBCF4\uC758 \uC774\uC6A9 \uBC0F \uBCF4\uD638\uC5D0 \uAD00\uD55C \uBC95\uB960\u300D\uC5D0 \uB530\uB77C \uBCF8 \uACC4\uC57D \uAD00\uB828\uD55C \uADC0\uD558\uC758 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uB97C \uB2E4\uC74C\uACFC \uAC19\uC774 \uC81C3\uC790\uC5D0\uAC8C \uC81C\uACF5\uD558\uACE0\uC790 \uD569\uB2C8\uB2E4. \uC774\uC5D0 \uB300\uD574 \uB3D9\uC758\uD558\uC2ED\uB2C8\uAE4C? ",-1)),tu={class:"px-0"},au=A(()=>u("th",null," 4. \uACE0\uC720\uC2DD\uBCC4\uC815\uBCF4\uC758 \uCC98\uB9AC\uC5D0 \uAD00\uD55C \uC0AC\uD56D ",-1)),su=A(()=>u("td",null," \uB2F9\uC0AC \uBC0F \uB2F9\uC0AC \uC5C5\uBB34\uC218\uD0C1\uC790\uB294\u300C\uAC1C\uC778\uC815\uBCF4\uBCF4\uD638\uBC95\u300D\uC81C24\uC870\uC5D0 \uB530\uB77C \uBCF8 \uACC4\uC57D\uACFC \uAD00\uB828\uD558\uC5EC \uC0C1\uAE30\uC758 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC5D0 \uB300\uD55C \uAC1C\uBCC4 \uB3D9\uC758 \uC0AC\uD56D\uC5D0 \uB300\uD558\uC5EC \uADC0\uD558\uC758 \uACE0\uC720\uC2DD\uBCC4\uC815\uBCF4(\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638\u2219\uC678\uAD6D\uC778\uB4F1\uB85D\uBC88\uD638)\uB97C \uCC98\uB9AC(\uC218\uC9D1\u2219\uC774\uC6A9, \uC81C\uACF5 \uB4F1)\uD558\uACE0\uC790 \uD569\uB2C8\uB2E4. \uC774\uC5D0 \uB300\uD558\uC5EC \uB3D9\uC758 \uD558\uC2ED\uB2C8\uAE4C? ",-1)),nu={class:"px-0"},Fu=A(()=>u("h3",{class:"text-display-2 font-weight-bold mt-8"},"\uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC218\uC9D1\u2219\uC774\uC6A9, \uC870\uD68C, \uC81C\uACF5\uC5D0 \uAD00\uD55C \uB3D9\uC758 \uC0AC\uD56D",-1)),Eu=A(()=>u("div",{class:"border-top-black-1 border-bottom-lightgray-1 py-4 terms-wrap-v1 mt-4"},[u("ul",null,[u("li",null,[B("1.\uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC218\uC9D1\u2219\uC774\uC6A9\uC5D0 \uAD00\uD55C \uB3D9\uC758 \uC0AC\uD56D "),u("ul",null,[u("li",null,[B("\u25AA \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC218\uC9D1\u2219\uC774\uC6A9 \uBAA9\uC801 "),u("ul",null,[u("li",null,"\u2219\uBCF4\uD5D8\uACC4\uC57D\uC758 \uC778\uC218\uC2EC\uC0AC\u2219\uCCB4\uACB0\u2219\uC720\uC9C0\u2219\uAD00\uB9AC(\uBD80\uD65C \uBC0F \uAC31\uC2E0 \uD3EC\uD568), \uBCF4\uD5D8\uAE08 \uB4F1 \uC9C0\uAE09\u2219\uC2EC\uC0AC, \uC21C\uBCF4\uD5D8\uC694\uC728\uC758 \uC0B0\uCD9C\u2219\uAC80\uC99D, \uBBFC\uC6D0\uCC98\uB9AC \uBC0F \uBD84\uC7C1 \uB300\uC751, \uC801\uBD80 \uBC0F \uBCF4\uD5D8\uC0AC\uACE0\uC870\uC0AC(\uBCF4\uD5D8\uC0AC\uAE30 \uC870\uC0AC \uD3EC\uD568), \uBCF4\uD5D8\uBAA8\uC9D1\uC9C8\uC11C \uC720\uC9C0,\uC870\uC0AC\uC5F0\uAD6C,\uC11C\uBE44\uC2A4\uC81C\uACF5")])]),u("li",null,[B("\u25AA \uC218\uC9D1\u2219\uC774\uC6A9\uD55C \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uB0B4\uC6A9 "),u("ul",null,[u("li",null,"\u2219\uAC1C\uC778\uC2DD\uBCC4\uC815\uBCF4(\uC131\uBA85, \uC0DD\uB144\uC6D4\uC77C, \uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638, \uC678\uAD6D\uC778\uB4F1\uB85D\uBC88\uD638, \uC8FC\uC18C, \uC131\uBCC4, \uC9C1\uC5C5, \uC804\uD654\uBC88\uD638, \uD734\uB300\uC804\uD654\uBC88\uD638, \uC804\uC790\uC6B0\uD3B8\uC8FC\uC18C)"),u("li",null,"\u2219\uBCF4\uD5D8\uACC4\uC57D\uC815\uBCF4, \uBCF4\uD5D8\uAE08\uC9C0\uAE09 \uAD00\uB828 \uC815\uBCF4(\uC0AC\uACE0\uC815\uBCF4 \uBC0F \uAD00\uB828 \uC601\uC0C1\uC815\uBCF4\u2219\uC74C\uC131\uC815\uBCF4, \uBCF8\uC778\uC758 \uC704\uC784\uC744 \uBC1B\uC544 \uCDE8\uB4DD\uD55C \uAC01\uC885 \uC870\uC0AC\uC11C, \uD310\uACB0\uBB38, \uC99D\uBA85\uC11C, \uD655\uC778\uC11C \uB4F1)")])]),u("li",null,[B("\u25AA \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uBCF4\uC720\u2219\uC774\uC6A9 \uAE30\uAC04 "),u("ul",null,[u("li",null,"\u2219\uC218\uC9D1\u2219\uC774\uC6A9 \uB3D9\uC758\uC77C\uB85C\uBD80\uD130 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC218\uC9D1\u2219\uC774\uC6A9 \uBAA9\uC801\uC744 \uB2EC\uC131\uD560 \uB54C\uAE4C\uC9C0(\uCD5C\uB300 \uAC70\uB798\uC885\uB8CC \uD6C4 5\uB144\uAE4C\uC9C0)"),u("li",null,"(\uB2E8, \uBCF4\uD5D8\uAE08 \uC9C0\uAE09, \uAE08\uC735\uC0AC\uACE0 \uC870\uC0AC, \uBC95\uB839\uC0C1 \uC758\uBB34\uC774\uD589\uC744 \uC704\uD55C \uACBD\uC6B0 \uBCC4\uB3C4 \uBCF4\uAD00)")])])])]),u("li",null,[B("2.\uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC870\uD68C\uC5D0 \uAD00\uD55C \uB3D9\uC758 \uC0AC\uD56D "),u("ul",null,[u("li",null,[B("\u25AA \uC870\uD68C\uD55C \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 "),u("ul",null,[u("li",null,"\u2219\uBCF4\uD5D8\uACC4\uC57D\uC815\uBCF4, \uBCF4\uD5D8\uAE08\uC9C0\uAE09 \uAD00\uB828 \uC815\uBCF4(\uC0AC\uACE0\uC815\uBCF4 \uD3EC\uD568)")])]),u("li",null,[B("\u25AA \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uC870\uD68C\uBAA9\uC801 "),u("ul",null,[u("li",null,"\u2219\uBCF4\uD5D8\uACC4\uC57D\uC758 \uC778\uC218\uC2EC\uC0AC\u2219\uCCB4\uACB0\u2219\uC720\uC9C0\u2219\uAD00\uB9AC(\uBD80\uD65C \uBC0F \uAC31\uC2E0 \uD3EC\uD568), \uBCF4\uD5D8\uAE08 \uB4F1 \uC9C0\uAE09\u2219\uC2EC\uC0AC, \uBCF4\uD5D8\uC0AC\uACE0\uC870\uC0AC(\uBCF4\uD5D8\uC0AC\uAE30\uC870\uC0AC \uD3EC\uD568)")])]),u("li",null,[B("\u25AA \uC870\uD68C\uB3D9\uC758 \uC720\uD6A8\uAE30\uAC04 "),u("ul",null,[u("li",null,"\u2219\uB3D9\uC758\uC11C \uC81C\uCD9C\uC77C\uB85C\uBD80\uD130 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC870\uD68C \uBAA9\uC801\uC744 \uB2EC\uC131\uD560 \uB54C\uAE4C\uC9C0(\uCD5C\uB300 \uAC70\uB798\uC885\uB8CC \uD6C4 5\uB144\uAE4C\uC9C0)")])]),u("li",null,[B("\u25AA \uC870\uD68C\uC790(\uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uB97C \uC81C\uACF5\uBC1B\uC740 \uC790)\uC758 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uBCF4\uC720\u2219\uC774\uC6A9\uAE30\uAC04 "),u("ul",null,[u("li",null,"\u2219\uC815\uBCF4\uB97C \uC81C\uACF5\uBC1B\uC740 \uB0A0\uB85C\uBD80\uD130 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC870\uD68C \uBAA9\uC801\uC744 \uB2EC\uC131\uD560 \uB54C\uAE4C\uC9C0(\uCD5C\uB300 \uAC70\uB798\uC885\uB8CC \uD6C4 5\uB144\uAE4C\uC9C0)"),u("li",null,"(\uB2E8, \uBCF4\uD5D8\uAE08 \uC9C0\uAE09, \uAE08\uC735\uC0AC\uACE0 \uC870\uC0AC, \uBC95\uB839\uC0C1 \uC758\uBB34\uC774\uD589\uC744 \uC704\uD55C \uACBD\uC6B0 \uBCC4\uB3C4 \uBCF4\uAD00) ")])])])]),u("li",null,[B("3.\uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC81C\uACF5\uC5D0 \uAD00\uD55C \uB3D9\uC758 \uC0AC\uD56D "),u("ul",null,[u("li",null,[B("\u25AA \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uB97C \uC81C\uACF5\uBC1B\uB294 \uC790 "),u("ul",null,[u("li",null,"\u2219\uC2E0\uC6A9\uC815\uBCF4\uC9D1\uC911\uAE30\uAD00: \uD55C\uAD6D\uC2E0\uC6A9\uC815\uBCF4\uC6D0 \uB4F1 \uC2E0\uC6A9\uC815\uBCF4\uC9D1\uC911\uAE30\uAD00"),u("li",null,"\u2219\uACF5\uACF5\uAE30\uAD00 \uB4F1 : \uAE08\uC735\uC704\uC6D0\uD68C, \uAE08\uC735\uAC10\uB3C5\uC6D0, \uBCF4\uD5D8\uC694\uC728\uC0B0\uCD9C\uAE30\uAD00 \uB4F1 \uACF5\uAE30\uAD00, \uBC95\uC6D0, \uAC80\uCC30, \uACBD\uCC30, \uAD6D\uD1A0\uD574\uC591\uBD80, \uAD6D\uC138\uCCAD \uB4F1 \uBC95\uB839\uC0C1 \uC5C5\uBB34\uC218\uD589\uAE30\uAD00(\uC704\uD0C1\uC0AC\uC5C5\uC790 \uD3EC\uD568), \uC190\uD574\uBCF4\uD5D8\uD611\uD68C"),u("li",null,"\u2219\uBCF4\uD5D8\uD68C\uC0AC \uB4F1 : \uC190\uD574\uBCF4\uD5D8\uD68C\uC0AC, \uAD6D\uB0B4\u2219\uAD6D\uC678 \uC7AC\uBCF4\uD5D8\uC0AC, \uACF5\uC81C\uC0AC\uC5C5\uC790, \uCCB4\uC2E0\uAD00\uC11C(\uC6B0\uCCB4\uAD6D\uBCF4\uD5D8), \uAE08\uC735\uAC70\uB798 \uAD00\uB828 \uACC4\uC88C\uAC1C\uC124 \uAE08\uC735\uAE30\uAD00, \uAE08\uC735\uACB0\uC81C\uC6D0"),u("li",null,"\u2219\uC5C5\uBB34\uC218\uD0C1\uC790 \uB4F1 : \uBCF4\uD5D8\uC911\uAC1C\uC0AC, \uACC4\uC57D \uCCB4\uACB0 \uBC0F \uC774\uD589 \uB4F1\uC5D0 \uD544\uC694\uD55C \uC5C5\uBB34\uB97C \uC704\uD0C1\uBC1B\uC740 \uC790(\uBCF4\uD5D8\uC0AC\uACE0\uC870\uC0AC\uC5C5\uCCB4, \uC190\uD574\uC0AC\uC815\uC5C5\uCCB4, \uBCC0\uD638\uC0AC \uB4F1)"),u("li",null,"\u2219\uD55C\uAD6D\uACF5\uC778\uD68C\uACC4\uC0AC \uAC10\uC0AC\uBC18\uC5F0\uD569\uD68C, \uD55C\uAD6D\uACF5\uC778\uD68C\uACC4\uC0AC\uD68C")])]),u("li",null,[B("\u25AA \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uB97C \uC81C\uACF5\uBC1B\uB294 \uC790\uC758 \uC774\uC6A9\uBAA9\uC801 "),u("ul",null,[u("li",null,"\u2219\uC2E0\uC6A9\uC815\uBCF4\uC9D1\uC911\uAE30\uAD00 : \uBCF4\uD5D8\uACC4\uC57D \uBC0F \uBCF4\uD5D8\uAE08\uC9C0\uAE09 \uAD00\uB828 \uC815\uBCF4\uC758 \uC9D1\uC911\uAD00\uB9AC \uBC0F \uD65C\uC6A9 \uB4F1 \uC2E0\uC6A9\uC815\uBCF4\uC9D1\uC911\uAE30\uAD00\uC758 \uC5C5\uBB34"),u("li",null,"\u2219\uACF5\uACF5\uAE30\uAD00 \uB4F1 : \uBCF4\uD5D8\uC5C5\uBC95 \uB4F1 \uBC95\uB839\uC5D0 \uB530\uB978 \uC5C5\uBB34\uC218\uD589(\uC704\uD0C1\uC5C5\uBB34\uD3EC\uD568)"),u("li",null,"\u2219\uBCF4\uD5D8\uD68C\uC0AC \uB4F1 : \uC911\uBCF5\uBCF4\uD5D8 \uD655\uC778 \uBC0F \uBE44\uB840\uBCF4\uC0C1, \uC7AC\uBCF4\uD5D8 \uAC00\uC785 \uBC0F \uC7AC\uBCF4\uD5D8\uAE08 \uCCAD\uAD6C, \uBCF4\uD5D8\uACC4\uC57D \uACF5\uB3D9\uC778\uC218"),u("li",null,"\u2219\uC5C5\uBB34\uC218\uD0C1\uC790 \uB4F1 : \uBCF8 \uACC4\uC57D\uC758 \uCCB4\uACB0\u2219\uC774\uD589 \uAD00\uB828 \uC704\uD0C1\uC5C5\uBB34 \uC218\uD589, \uC790\uBB38\uC5C5\uBB34"),u("li",null,"\u2219\uD55C\uAD6D\uACF5\uC778\uD68C\uACC4\uC0AC \uAC10\uC0AC\uBC18\uC5F0\uD569\uD68C, \uD55C\uAD6D\uACF5\uC778\uD68C\uACC4\uC0AC\uD68C : \uB2E8\uCCB4\uBCF4\uD5D8 \uAC00\uC785\u2219\uC6B4\uC601, \uBCF4\uD5D8\uAC31\uC2E0, \uC0AC\uACE0\uC870\uD68C, \uC790\uBB38\uC5C5\uBB34")])]),u("li",null,[B("\u25AA \uC81C\uACF5\uD560 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uB0B4\uC6A9 "),u("ul",null,[u("li",null,"\u2219\u300C1.\uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uC758 \uC218\uC9D1\u2219\uC774\uC6A9\uC5D0 \uAD00\uD55C \uC0AC\uD56D\u300D\uC758 \uC815\uBCF4 \uB0B4\uC6A9")])]),u("li",null,[B("\u25AA \uC81C\uACF5\uBC1B\uB294 \uC790\uC758 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4 \uBCF4\uC720\u2219\uC774\uC6A9\uAE30\uAC04 "),u("ul",null,[u("li",null,"\u2219\uC81C\uACF5 \uB3D9\uC758\uC77C\uB85C\uBD80\uD130 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uB97C \uC81C\uACF5\uBC1B\uB294 \uC790\uC758 \uC774\uC6A9\uBAA9\uC801\uC744 \uB2EC\uC131\uD560 \uB54C\uAE4C\uC9C0(\uCD5C\uB300 \uAC70\uB798\uC885\uB8CC \uD6C4 5\uB144\uAE4C\uC9C0)")])])])])]),u("p",null,"\u203B\uAC70\uB798\uC885\uB8CC\uC77C:1)\uBCF4\uD5D8\uACC4\uC57D \uB9CC\uAE30, \uD574\uC9C0, \uCDE8\uC18C, \uCCA0\uD68C\uC77C \uB610\uB294 \uC18C\uBA78\uC77C \uBC0F 2)\uBCF4\uD5D8\uAE08\uCCAD\uAD6C\uAD8C \uC18C\uBA78\uC2DC\uD6A8 \uC644\uC131\uC77C, \uCC44\uAD8C\uCC44\uBB34\uAD00\uACC4 \uC18C\uBA78\uC77C \uC911 \uAC00\uC7A5 \uB098\uC911\uC5D0 \uB3C4\uB798\uD55C \uC0AC\uC720\uB97C \uAE30\uC900\uC73C\uB85C \uD310\uB2E8"),u("p",null,"\u203B\uAC01 \uC81C\uACF5\uB300\uC0C1\uAE30\uAD00 \uBC0F \uC774\uC6A9\uBAA9\uC801\uC758 \uAD6C\uCCB4\uC801\uC778 \uC815\uBCF4\uB294 \uB2F9\uC0AC \uD648\uD398\uC774\uC9C0[http://www.idbins.com]\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.")],-1)),ou=A(()=>u("p",{class:"font-weight-medium mt-4 word-break-keep-all"},"\u203B \uBCF8\uC778\uC740 \u300C\uAC1C\uC778\uC815\uBCF4\uBCF4\uD638\uBC95\u300D\uBC0F \u300C\uC2E0\uC6A9\uC815\uBCF4\uC758 \uC774\uC6A9 \uBC0F \uBCF4\uD638\uC5D0 \uAD00\uD55C \uBC95\uB960\u300D\uC5D0 \uB530\uB77C \uADC0\uC0AC\uAC00 \uBCF8\uC778\uC758 \uAC1C\uC778(\uC2E0\uC6A9)\uC815\uBCF4\uB97C \uC0C1\uAE30 \uB0B4\uC6A9\uACFC \uAC19\uC774 \uCC98\uB9AC\uD558\uB294 \uAC83\uC5D0 \uB3D9\uC758 \uD569\uB2C8\uB2E4.",-1)),du=p({__name:"V_TACC0030P03",props:{agr31_yn:String,agr32_yn:String,agr33_yn:String,agr34_yn:String,isReadonly:Boolean},emits:["close"],setup(t,{emit:d}){const a=t,C=E({agr30_yn:"N",agr31_yn:"N",agr32_yn:"N",agr33_yn:"N",agr34_yn:"N"}),s=E(!1),F=E(!0),o=()=>{F.value=!1,C.value.agr31_yn=="Y"&&C.value.agr32_yn=="Y"&&C.value.agr33_yn=="Y"&&C.value.agr34_yn=="Y"&&(C.value.agr30_yn="Y"),d("close",C)};return m(async()=>{C.value.agr31_yn=a.agr31_yn||"N",C.value.agr32_yn=a.agr32_yn||"N",C.value.agr33_yn=a.agr33_yn||"N",C.value.agr34_yn=a.agr34_yn||"N",s.value=a.isReadonly}),(_,D)=>(c(),y(w,{persistent:"",modelValue:F.value,"onUpdate:modelValue":D[5]||(D[5]=l=>F.value=l),width:"1000px","hide-overlay":"",scrollable:""},{default:n(()=>[e(g,null,{default:n(()=>[e(v,{class:"d-flex align-center justify-space-between"},{default:n(()=>[K,u("div",M,[e(b,{variant:"outlined",color:"dark",onClick:D[0]||(D[0]=l=>o())},{default:n(()=>[B("\uB2EB\uAE30")]),_:1})])]),_:1}),e(f,{class:"mb-0"}),e(h,{class:"px-10 pt-8 pb-14"},{default:n(()=>[z,u("div",G,[u("table",null,[L,Q,W,u("tbody",null,[X,u("tr",null,[Z,uu,u("td",Cu,[e(i,{modelValue:C.value.agr31_yn,"onUpdate:modelValue":D[1]||(D[1]=l=>C.value.agr31_yn=l),"true-value":"Y","false-value":"N","hide-details":"",label:"\uB3D9\uC758\uD568",disabled:s.value},null,8,["modelValue","disabled"])])]),u("tr",null,[Bu,Du,u("td",Au,[e(i,{modelValue:C.value.agr32_yn,"onUpdate:modelValue":D[2]||(D[2]=l=>C.value.agr32_yn=l),"true-value":"Y","false-value":"N","hide-details":"",label:"\uB3D9\uC758\uD568",disabled:s.value},null,8,["modelValue","disabled"])])]),u("tr",null,[lu,eu,u("td",tu,[e(i,{modelValue:C.value.agr33_yn,"onUpdate:modelValue":D[3]||(D[3]=l=>C.value.agr33_yn=l),"true-value":"Y","false-value":"N","hide-details":"",label:"\uB3D9\uC758\uD568",disabled:s.value},null,8,["modelValue","disabled"])])]),u("tr",null,[au,su,u("td",nu,[e(i,{modelValue:C.value.agr34_yn,"onUpdate:modelValue":D[4]||(D[4]=l=>C.value.agr34_yn=l),"true-value":"Y","false-value":"N","hide-details":"",label:"\uB3D9\uC758\uD568",disabled:s.value},null,8,["modelValue","disabled"])])])])])]),Fu,Eu,ou]),_:1})]),_:1})]),_:1},8,["modelValue"]))}});const pu=N(du,[["__scopeId","data-v-4964f4a5"]]);export{pu as T,_u as _,cu as a};
