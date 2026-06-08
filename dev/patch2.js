const fs=require('fs');const path='index.html';let f=fs.readFileSync(path,'utf8');
const G=(n,dept,wf,q,a,u)=>({a,u:u||"",n,src:"wf",dept,wf,q});
const F=(n,a,u)=>({a,u:u||"",n,src:"farm",dept:"Freezer · Tiffin Farm"});
const P=(n,a,u)=>({a,u:u||"",n,src:"pantry",dept:"Pantry"});
const m=f.match(/const R=\[[\s\S]*?\n\];/);let R;eval(m[0].replace('const ',''));
let n=0;
R.forEach(r=>r.ing.forEach(i=>{
  if(!i.u && (/[,+]/.test(i.n) || /to serve|to taste|optional/i.test(i.n))){ i.a=null; n++; }
}));
const out='const R=[\n '+R.map(o=>JSON.stringify(o)).join(',\n ')+'\n];';
f=f.replace(m[0],out);fs.writeFileSync(path,f);
console.log('cleared amount on',n,'descriptor ingredients');
