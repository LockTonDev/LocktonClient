const C=(e,t,n)=>{if(e==null||t==null)return n;const r=new Date(e),l=new Date(t),a=Math.abs(l.getTime()-r.getTime());return Math.ceil(a/(1e3*60*60*24))},d=(e,t,n)=>{if(e==null||e==null)return"";(t==0||t==null||t==null)&&(t=1),(n==0||n==null||n==null)&&(n=0);const r=parseInt(e),l=e.match(/[ㄱ-ㅎㅏ-ㅣ가-힣]+/g).join(""),a={\uB9CC\uC6D0:1e4,\uBC31\uB9CC\uC6D0:1e6,\uCC9C\uB9CC\uC6D0:1e7,\uC5B5\uC6D0:1e8},s=r*t*a[l],f=Object.entries(a).reverse();let o="",i=s;n>0&&i>n&&(i=n);for(const[g,u]of f)if(i>=u){const c=Math.floor(i/u);i-=c*u,o+=c+g+""}return o.trim().replace(/원/g,"")+"\uC6D0"},D=e=>{const t=/^(null|invalid date)$/i;return e==null||e===null||t.test(e)?"":e},p=e=>{const t=new Date().getFullYear(),n=[];for(let r=2022;r<=t;r++)n.push({title:String(r),value:String(r)});return n},v=e=>{let t=new Date;return new Date(e+" 23:59:59").getTime()-t>=0};export{p as a,C as b,d as c,v as d,D as g};