<<<<<<< HEAD:dist/assets/V_TTAX0030P01.8acf3ec6.js
<<<<<<<< HEAD:dist/assets/V_TTAX0030P01.28785ab1.js
import{a as p}from"./A_CONTRACT.d204d0ea.js";import{d as h,u as m,s as v,r as u,o as B,c,e as d,w as t,O as b,g as C,N as x,f as a,h as D,F as y,C as T,j as V,m as o}from"./index.c4ff19f5.js";const g=["src"],F=h({__name:"V_TTAX0030P10",props:{baseYear:{type:String,required:!1}},setup(n){const l=n,f=m(),{_AUTH_USER:e}=v(f);let r=u([]);u([]);const s=u("");return B(async()=>{const _={user_cd:e.value.userCd,business_cd:e.value.businessCd,base_year:l.baseYear},i=await p.getDBSelInsuranceRate(_);r.value=i.data[0],e.value.userCd=="IND"?s.value="/assets/doc/insr_table/\uC138\uBB34\uC0AC_\uAC1C\uC778_\uBCF4\uD5D8\uB8CC\uD45C_"+r.value.base_year+".pdf":e.value.userCd=="COR"&&(s.value="/assets/doc/insr_table/\uC138\uBB34\uC0AC_\uBC95\uC778_\uBCF4\uD5D8\uB8CC\uD45C_"+r.value.base_year+".pdf")}),(_,i)=>(c(),d(C,null,{default:t(()=>[(c(),b("iframe",{key:s.value,src:s.value,width:"100%",height:"800px"},null,8,g))]),_:1}))}}),w={},A=o("p",{class:"text-h6 font-weight-bold"},"\uBCF4\uD5D8 \uC57D\uAD00",-1),N=o("div",null,[o("iframe",{src:"/assets/doc/TAX/\uC138\uBB34\uC0AC_\uBCF4\uD5D8\uC57D\uAD00.pdf",width:"100%",height:"800px"})],-1);function S(n,l){return c(),d(C,null,{default:t(()=>[a(D,{class:"d-flex justify-space-between align-center px-6 py-4 position-relative"},{default:t(()=>[A,a(y)]),_:1}),a(T,{class:"mb-0"}),a(V,{class:"pa-0"},{default:t(()=>[N]),_:1})]),_:1})}const I=x(w,[["render",S]]);export{I as T,F as _};
========
import{a as p}from"./A_CONTRACT.f7702a7f.js";import{d as h,u as m,s as v,r as u,o as B,c,e as d,w as t,O as b,g as C,N as x,f as a,h as D,F as y,C as T,j as V,m as o}from"./index.469b2f08.js";const g=["src"],F=h({__name:"V_TTAX0030P10",props:{baseYear:{type:String,required:!1}},setup(n){const l=n,f=m(),{_AUTH_USER:e}=v(f);let r=u([]);u([]);const s=u("");return B(async()=>{const _={user_cd:e.value.userCd,business_cd:e.value.businessCd,base_year:l.baseYear},i=await p.getDBSelInsuranceRate(_);r.value=i.data[0],e.value.userCd=="IND"?s.value="/assets/doc/insr_table/\uC138\uBB34\uC0AC_\uAC1C\uC778_\uBCF4\uD5D8\uB8CC\uD45C_"+r.value.base_year+".pdf":e.value.userCd=="COR"&&(s.value="/assets/doc/insr_table/\uC138\uBB34\uC0AC_\uBC95\uC778_\uBCF4\uD5D8\uB8CC\uD45C_"+r.value.base_year+".pdf")}),(_,i)=>(c(),d(C,null,{default:t(()=>[(c(),b("iframe",{key:s.value,src:s.value,width:"100%",height:"800px"},null,8,g))]),_:1}))}}),w={},A=o("p",{class:"text-h6 font-weight-bold"},"\uBCF4\uD5D8 \uC57D\uAD00",-1),N=o("div",null,[o("iframe",{src:"/assets/doc/TAX/\uC138\uBB34\uC0AC_\uBCF4\uD5D8\uC57D\uAD00.pdf",width:"100%",height:"800px"})],-1);function S(n,l){return c(),d(C,null,{default:t(()=>[a(D,{class:"d-flex justify-space-between align-center px-6 py-4 position-relative"},{default:t(()=>[A,a(y)]),_:1}),a(T,{class:"mb-0"}),a(V,{class:"pa-0"},{default:t(()=>[N]),_:1})]),_:1})}const I=x(w,[["render",S]]);export{I as T,F as _};
>>>>>>>> a7281fb90bccf8d9794607b7a58e6be9f2e8ed3a:dist/assets/V_TTAX0030P01.8acf3ec6.js
=======
import{a as p}from"./A_CONTRACT.c2b074bb.js";import{d as h,u as m,s as v,r as u,o as B,c,e as d,w as t,O as b,g as C,N as x,f as a,h as D,F as y,C as T,j as V,m as o}from"./index.e103830c.js";const g=["src"],F=h({__name:"V_TTAX0030P10",props:{baseYear:{type:String,required:!1}},setup(n){const l=n,f=m(),{_AUTH_USER:e}=v(f);let r=u([]);u([]);const s=u("");return B(async()=>{const _={user_cd:e.value.userCd,business_cd:e.value.businessCd,base_year:l.baseYear},i=await p.getDBSelInsuranceRate(_);r.value=i.data[0],e.value.userCd=="IND"?s.value="/assets/doc/insr_table/\uC138\uBB34\uC0AC_\uAC1C\uC778_\uBCF4\uD5D8\uB8CC\uD45C_"+r.value.base_year+".pdf":e.value.userCd=="COR"&&(s.value="/assets/doc/insr_table/\uC138\uBB34\uC0AC_\uBC95\uC778_\uBCF4\uD5D8\uB8CC\uD45C_"+r.value.base_year+".pdf")}),(_,i)=>(c(),d(C,null,{default:t(()=>[(c(),b("iframe",{key:s.value,src:s.value,width:"100%",height:"800px"},null,8,g))]),_:1}))}}),w={},A=o("p",{class:"text-h6 font-weight-bold"},"\uBCF4\uD5D8 \uC57D\uAD00",-1),N=o("div",null,[o("iframe",{src:"/assets/doc/TAX/\uC138\uBB34\uC0AC_\uBCF4\uD5D8\uC57D\uAD00.pdf",width:"100%",height:"800px"})],-1);function S(n,l){return c(),d(C,null,{default:t(()=>[a(D,{class:"d-flex justify-space-between align-center px-6 py-4 position-relative"},{default:t(()=>[A,a(y)]),_:1}),a(T,{class:"mb-0"}),a(V,{class:"pa-0"},{default:t(()=>[N]),_:1})]),_:1})}const I=x(w,[["render",S]]);export{I as T,F as _};
>>>>>>> 5a0c35a2fb9e1aebe281915764e6a4c7bbbcd15b:dist/assets/V_TTAX0030P01.758fc074.js