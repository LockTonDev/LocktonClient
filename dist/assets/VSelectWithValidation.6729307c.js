import{u}from"./vee-validate.esm.a3d3486b.js";import{a7 as o,c as m,e as d,z as a,a1 as p,S as f}from"./index.469b2f08.js";const V={__name:"VSelectWithValidation",props:{name:{type:String,required:!0},items:{type:Array,required:!0},label:{type:String,required:!1},itemText:{type:String,default:"text"},itemValue:{type:String,default:"value"}},setup(e){const r=e,{value:t,handleChange:i,errors:n}=u(o(r,"name"),void 0);return(c,l)=>(m(),d(f,{modelValue:a(t),"onUpdate:modelValue":l[0]||(l[0]=s=>p(t)?t.value=s:null),onChange:a(i),label:e.label,items:e.items,"item-text":"title","item-value":"value","error-messages":a(n),variant:"outlined","hide-details":"auto"},null,8,["modelValue","onChange","label","items","error-messages"]))}};export{V as _};
