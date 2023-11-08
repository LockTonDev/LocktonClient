import{d as K,r as n,u as Y,s as q,M as X,o as G,c as C,O as r,f as a,w as s,V as J,B as Q,Y as Z,at as w,q as T,m as e,S as k,k as E,l as ee,p,i as B,F as te,g as F,j as L,aw as S,z as M,ax as ue,h as le,C as O,t as c,A as $,aC as ae,n as se,aD as ne}from"./index.c4ff19f5.js";import{B as y}from"./BoardDTO.a7960dc7.js";import{P as oe}from"./ParamsDTO.c9510422.js";import{C as P}from"./CommonCode.27762e35.js";import{_ as ie}from"./AdminBaseBreadcrumb.vue_vue_type_script_setup_true_lang.aef2b274.js";import{_ as U}from"./VCheckBoxWithValidation.ba4d8780.js";import{a as h}from"./A_ADMIN.a8c7cd5d.js";import"./vee-validate.esm.c12747be.js";const de={class:"v-search-box v-box"},Ce=e("span",null,"\uC804\uBB38\uC778 \uC720\uD615",-1),re=e("span",null,"\uAC8C\uC2DC\uD310 \uC720\uD615",-1),ce=e("span",null,"\uC81C\uBAA9",-1),_e={class:"ml-auto mr-6"},ve={class:"d-flex align-center mb-3"},me=e("h2",{class:"font-weight-bold"},[e("svg",{class:"mr-2",width:"4",height:"14",fill:"#00AEEF"},[e("rect",{width:"100%",height:"100%"})]),B("\uC870\uD68C \uBAA9\uB85D")],-1),Be=e("caption",{class:"d-none"},"\uC870\uD68C \uACB0\uACFC",-1),fe=e("colgroup",null,[e("col",{style:{width:"100px"}}),e("col",{style:{width:"auto"}}),e("col",{style:{width:"50px"}}),e("col",{style:{width:"50px"}}),e("col",{style:{width:"120px"}})],-1),pe=e("thead",null,[e("tr",null,[e("th",null,"\uBC88\uD638"),e("th",null,"\uC81C\uBAA9"),e("th",null,"\uACF5\uC9C0"),e("th",null,"\uD31D\uC5C5"),e("th",null,"\uAC8C\uC2DC\uC77C")])],-1),De={key:0,class:""},be={class:"text-left text-subtitle-1"},he=["onClick"],ge={key:0},Ae={key:1,class:"color-primary font-weight"},ye={key:1},Ve=e("tr",null,[e("td",{colspan:"3",class:"text-center align-middle"},"\uC870\uD68C\uD560 \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.")],-1),xe=[Ve],we=e("h3",{class:"text-h6 font-weight-bold"},"\uC870\uD68C \uC0C1\uC138",-1),Te={class:"admin-normal-table register"},ke=e("colgroup",null,[e("col",{style:{width:"220px"}}),e("col",{style:{width:"auto"}})],-1),Ee=e("th",null,"\uAC8C\uC2DC\uD310",-1),Fe={key:0},Le=e("td",{else:""},null,-1),Se={key:0},Me=e("th",null,"\uC635\uC158",-1),Oe={class:"d-flex"},$e=e("th",null,"\uC81C\uBAA9",-1),Pe=e("th",null,"HTML",-1),Ue=e("th",null,"\uBBF8\uB9AC\uBCF4\uAE30",-1),Ie=["innerHTML"],Ge=K({__name:"AB1",emits:["onPageViewParent"],setup(Ne,{emit:We}){const m=n(!1);n(0),n(["Editor","HTML","\uBBF8\uB9AC\uBCF4\uAE30"]),n({toolbar:["heading","|","fontBackgroundColor","fontColor","fontSize","bold","italic","|","alignment","bulletedList","numberedList","indent","outdent","|","insertTable","link","|","undo","redo"],table:{contentToolbar:["tableColumn","tableRow","mergeTableCells","tableProperties","tableCellProperties"]},image:{resize:!0,toolbar:["imageStyle:alignLeft","imageStyle:alignRight","imageStyle:inline","imageStyle:side"]},language:"kr",height:"300px"});const I=Y();q(I);const d=n(new X),g=n([""]),A=n([""]),o=n(new oe),u=n(new y),N=n(!1);let D=n([]);const W=n({title:"\uC54C\uB9BC\uB9C8\uB2F9"}),R=n([{text:"\uC54C\uB9BC\uB9C8\uB2F9 \uAD00\uB9AC",disabled:!1,href:"/"},{text:"\uC54C\uB9BC\uB9C8\uB2F9",disabled:!0,href:"/"}]),j=_=>{Object.assign(u.value,_),m.value=!0};function H(){console.log(o.value),u.value.business_cd=o.value.data.business_cd,u.value.board_id=o.value.data.board_id,u.value.board_no="\uC2E0\uADDC\uB4F1\uB85D",u.value.title="",u.value.content="",u.value.mode="C",m.value=!0}async function V(_){let t,l=!1;if(!u.value.business_cd)return d.value.setWarning("\uC785\uB825\uD655\uC778","\uC804\uBB38\uC778 \uC720\uD615\uC740 \uD544\uC218\uC785\uB825\uAC12 \uC785\uB2C8\uB2E4."),!1;if(!u.value.board_id)return d.value.setWarning("\uC785\uB825\uD655\uC778","\uAC8C\uC2DC\uD310 \uC720\uD615\uC740 \uD544\uC218\uC785\uB825\uAC12 \uC785\uB2C8\uB2E4."),!1;if(!u.value.title)return d.value.setWarning("\uC785\uB825\uD655\uC778","\uC81C\uBAA9\uC740 \uD544\uC218\uC785\uB825\uAC12 \uC785\uB2C8\uB2E4."),!1;if(!u.value.content)return d.value.setWarning("\uC785\uB825\uD655\uC778","\uB0B4\uC6A9\uC740 \uD544\uC218\uC785\uB825\uAC12 \uC785\uB2C8\uB2E4."),!1;_==="D"?(u.value.mode=_,await d.value.setConfirm("\uC0AD\uC81C","\uC0AD\uC81C \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",null,(v,f)=>{l=v})):await d.value.setConfirm("\uC800\uC7A5","\uC800\uC7A5 \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",null,(v,f)=>{l=v}),l&&(u.value.mode=="C"?t=await h.setInsertBoard(u.value):u.value.mode=="D"?t=await h.setDeleteBoard(u.value):t=await h.setUpdateBoard(u.value),console.log(t),t.success?(d.value.setInfo("\uD655\uC778","\uC800\uC7A5 \uB418\uC5C8\uC2B5\uB2C8\uB2E4."),u.value=new y,b()):d.value.setWarning("\uC2E4\uD328","\uC800\uC7A5\uC5D0 \uC2E4\uD328\uD558\uC600\uC2B5\uB2C8\uB2E4.")),m.value=!1}async function b(){const _=await h.getBoardList(o.value.data);D.value=_.data,D.value.length==0&&(N.value=!0),u.value=new y}async function z(){g.value=await P.getCodeList("COM001"),A.value=await P.getCodeList("COM003"),o.value.data.business_cd="TAX",o.value.data.board_id="notice",b()}return G(async()=>{z()}),(_,t)=>(C(),r(w,null,[a(ie,{title:W.value.title,breadcrumbs:R.value},null,8,["title","breadcrumbs"]),a(J,null,{default:s(()=>[a(T,{cols:"12"},{default:s(()=>[e("ul",de,[e("li",null,[Ce,a(k,{modelValue:o.value.data.business_cd,"onUpdate:modelValue":t[0]||(t[0]=l=>o.value.data.business_cd=l),items:g.value,variant:"outlined","hide-details":"",density:"compact"},null,8,["modelValue","items"])]),e("li",null,[re,a(k,{modelValue:o.value.data.board_id,"onUpdate:modelValue":t[1]||(t[1]=l=>o.value.data.board_id=l),items:A.value,variant:"outlined","hide-details":"",density:"compact"},null,8,["modelValue","items"])]),e("li",null,[ce,a(E,{modelValue:o.value.data.title,"onUpdate:modelValue":t[2]||(t[2]=l=>o.value.data.title=l),type:"text",variant:"outlined","hide-details":"auto",density:"compact","single-line":"",label:"\uC81C\uBAA9",onKeyup:t[3]||(t[3]=ee(l=>b(),["enter"]))},null,8,["modelValue"])]),e("li",_e,[a(p,{variant:"flat",onClick:t[4]||(t[4]=l=>b())},{default:s(()=>[B("\uC870\uD68C")]),_:1})])])]),_:1}),a(T,{cols:"12"},{default:s(()=>[e("div",ve,[me,a(te),a(p,{variant:"outlined",class:"",onClick:t[5]||(t[5]=l=>H())},{default:s(()=>[B("\uC2E0\uADDC\uC785\uB825")]),_:1})]),a(F,{class:"v-box"},{default:s(()=>[a(L,null,{default:s(()=>[a(S,{density:"comfortable",class:"text-center","fixed-header":"",height:"500px"},{default:s(()=>[Be,fe,pe,M(D).length?(C(),r("tbody",De,[(C(!0),r(w,null,ue(M(D),(l,v)=>(C(),r("tr",null,[e("td",null,c(l.board_no),1),e("td",be,[e("div",{class:"cursor-pointer",onClick:ne(f=>j(l),["prevent"])},[l.notice_yn==="Y"?(C(),r("strong",ge,c(l.title),1)):(C(),r("span",Ae,c(l.title),1))],8,he)]),e("td",null,c(l.notice_yn),1),e("td",null,c(l.popup_yn),1),e("td",null,c(l.reg_dt),1)]))),256))])):(C(),r("tbody",ye,xe))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),a(Q,{persistent:"",modelValue:m.value,"onUpdate:modelValue":t[13]||(t[13]=l=>m.value=l),width:"1000",scrollable:""},{default:s(()=>[a(F,{class:"position-relative"},{default:s(()=>[a(le,{class:"d-flex justify-space-between pr-6"},{default:s(()=>[we,a(p,{variant:"outlined",color:"dark",onClick:t[6]||(t[6]=l=>m.value=!1)},{default:s(()=>[B("\uB2EB\uAE30")]),_:1})]),_:1}),a(O,{class:"ma-0"}),a(L,{class:"pa-6"},{default:s(()=>[e("div",Te,[a(S,null,{default:s(()=>{var l,v,f,x;return[ke,e("tbody",null,[e("tr",null,[Ee,u.value.business_cd?(C(),r("td",Fe," ["+c((v=(l=g.value)==null?void 0:l.find(i=>i.value===u.value.business_cd))==null?void 0:v.title)+"]-"+c((x=(f=A.value)==null?void 0:f.find(i=>i.value===u.value.board_id))==null?void 0:x.title)+"-"+c(u.value.board_no),1)):$("",!0),Le]),u.value.board_id=="notice"?(C(),r("tr",Se,[Me,e("td",null,[e("div",Oe,[a(U,{modelValue:u.value.notice_yn,"onUpdate:modelValue":t[7]||(t[7]=i=>u.value.notice_yn=i),name:"notice_yn",label:"\uACF5\uC9C0"},null,8,["modelValue"]),a(U,{modelValue:u.value.popup_yn,"onUpdate:modelValue":t[8]||(t[8]=i=>u.value.popup_yn=i),name:"popup_yn",label:"\uD31D\uC5C5"},null,8,["modelValue"])])])])):$("",!0),e("tr",null,[$e,e("td",null,[a(E,{modelValue:u.value.title,"onUpdate:modelValue":t[9]||(t[9]=i=>u.value.title=i),type:"text",variant:"outlined","hide-details":"auto",density:"compact","single-line":"",label:""},null,8,["modelValue"])])]),e("tr",null,[Pe,e("td",null,[a(ae,{modelValue:u.value.content,"onUpdate:modelValue":t[10]||(t[10]=i=>u.value.content=i),class:"full-width"},null,8,["modelValue"])])]),e("tr",null,[Ue,e("td",null,[e("div",{innerHTML:u.value.content,style:{"text-align":"left"}},null,8,Ie)])])])]}),_:1})])]),_:1}),a(O,{class:"ma-0"}),a(se,{class:"d-flex justify-center pt-4 pb-6"},{default:s(()=>[a(p,{variant:"flat",color:"blue",onClick:t[11]||(t[11]=l=>{V("C")}),class:"mx-2"},{default:s(()=>[B("\uC800\uC7A5")]),_:1}),a(p,{variant:"flat",color:"dark",onClick:t[12]||(t[12]=l=>{V("D")}),class:"mx-2"},{default:s(()=>[B("\uC0AD\uC81C")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(Z,{messageBoxDTO:d.value},null,8,["messageBoxDTO"])],64))}});export{Ge as default};
