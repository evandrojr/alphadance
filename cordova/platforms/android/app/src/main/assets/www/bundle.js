var app=function(){"use strict";function a(){}function t(a){return a()}function e(){return Object.create(null)}function n(a){a.forEach(t)}function o(a){return"function"==typeof a}function r(a,t){return a!=a?t==t:a!==t||a&&"object"==typeof a||"function"==typeof a}function s(a,t){a.appendChild(t)}function i(a,t,e){a.insertBefore(t,e||null)}function l(a){a.parentNode.removeChild(a)}function u(a,t){for(let e=0;e<a.length;e+=1)a[e]&&a[e].d(t)}function c(a){return document.createElement(a)}function d(a){return document.createTextNode(a)}function f(){return d(" ")}function h(){return d("")}function m(a,t,e){null==e?a.removeAttribute(t):a.setAttribute(t,e)}class p{constructor(a,t=null){this.e=c("div"),this.a=t,this.u(a)}m(a,t=null){for(let e=0;e<this.n.length;e+=1)i(a,this.n[e],t);this.t=a}u(a){this.e.innerHTML=a,this.n=Array.from(this.e.childNodes)}p(a){this.d(),this.u(a),this.m(this.t,this.a)}d(){this.n.forEach(l)}}let g;function v(a){g=a}const b=[],$=[],A=[],z=[],j=Promise.resolve();let y=!1;function P(a){A.push(a)}function S(){const a=new Set;do{for(;b.length;){const a=b.shift();v(a),C(a.$$)}for(;$.length;)$.pop()();for(let t=0;t<A.length;t+=1){const e=A[t];a.has(e)||(e(),a.add(e))}A.length=0}while(b.length);for(;z.length;)z.pop()();y=!1}function C(a){a.fragment&&(a.update(a.dirty),n(a.before_update),a.fragment.p(a.dirty,a.ctx),a.dirty=null,a.after_update.forEach(P))}const B=new Set;const O="undefined"!=typeof window?window:global;function x(a,t){a.$$.dirty||(b.push(a),y||(y=!0,j.then(S)),a.$$.dirty=e()),a.$$.dirty[t]=!0}function _(r,s,i,l,u,c){const d=g;v(r);const f=s.props||{},h=r.$$={fragment:null,ctx:null,props:c,update:a,not_equal:u,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:e(),dirty:null};let m=!1;var p,b,$;h.ctx=i?i(r,f,(a,t,e=t)=>(h.ctx&&u(h.ctx[a],h.ctx[a]=e)&&(h.bound[a]&&h.bound[a](e),m&&x(r,a)),t)):f,h.update(),m=!0,n(h.before_update),h.fragment=l(h.ctx),s.target&&(s.hydrate?h.fragment.l(($=s.target,Array.from($.childNodes))):h.fragment.c(),s.intro&&((p=r.$$.fragment)&&p.i&&(B.delete(p),p.i(b))),function(a,e,r){const{fragment:s,on_mount:i,on_destroy:l,after_update:u}=a.$$;s.m(e,r),P(()=>{const e=i.map(t).filter(o);l?l.push(...e):n(e),a.$$.on_mount=[]}),u.forEach(P)}(r,s.target,s.anchor),S()),v(d)}class w{$destroy(){var t,e;e=1,(t=this).$$.fragment&&(n(t.$$.on_destroy),t.$$.fragment.d(e),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={}),this.$destroy=a}$on(a,t){const e=this.$$.callbacks[a]||(this.$$.callbacks[a]=[]);return e.push(t),()=>{const a=e.indexOf(t);-1!==a&&e.splice(a,1)}}$set(){}}const{Object:E}=O;function H(a,t,e){const n=E.create(a);return n.aula=t[e],n}function V(a,t,e){const n=E.create(a);return n.hora=t[e],n}function I(a,t,e){const n=E.create(a);return n.dia=t[e],n}function k(t){var e,n,o,r,u=t.aula.local+"",f=t.aula.atividade+"";return{c(){e=c("div"),n=d(u),o=d(": "),r=new p(f,null),m(e,"local-e-atividade",""),m(e,"class","svelte-11gf6hd")},m(a,t){i(a,e,t),s(e,n),s(e,o),r.m(e)},p:a,d(a){a&&l(e)}}}function J(t){var e,n,o,r,u,f,h,g=t.aula.local+"",v=t.aula.atividade+"",b=t.aula.professor+"";return{c(){e=c("div"),n=d(g),o=d(": "),u=d(", instrutor: "),f=c("span"),h=d(b),r=new p(v,u),m(f,"professor",""),m(f,"class","svelte-11gf6hd"),m(e,"local-e-atividade",""),m(e,"class","svelte-11gf6hd")},m(a,t){i(a,e,t),s(e,n),s(e,o),r.m(e),s(e,u),s(e,f),s(f,h)},p:a,d(a){a&&l(e)}}}function N(a){var t;var e=function(a,t){return t.aula.professor?J:k}(0,a)(a);return{c(){e.c(),t=h()},m(a,n){e.m(a,n),i(a,t,n)},p(a,t){e.p(a,t)},d(a){e.d(a),a&&l(t)}}}function T(a){var t,e,n,o,r,h,p,g=a.hora+"";let v=a.Object.values(a.dia.horarios[a.hora]),b=[];for(let t=0;t<v.length;t+=1)b[t]=N(H(a,v,t));return{c(){t=c("div"),e=c("div"),n=d(g),o=d(":10"),r=f(),h=c("div");for(let a=0;a<b.length;a+=1)b[a].c();p=f(),m(e,"horario",""),m(e,"fundo-amarelo",""),m(e,"class","svelte-11gf6hd"),m(t,"atividades-por-horario",""),m(t,"class","svelte-11gf6hd")},m(a,l){i(a,t,l),s(t,e),s(e,n),s(e,o),s(t,r),s(t,h);for(let a=0;a<b.length;a+=1)b[a].m(h,null);s(t,p)},p(a,t){if(a.Object||a.tranformarParaAtividadesPorHora){let e;for(v=t.Object.values(t.dia.horarios[t.hora]),e=0;e<v.length;e+=1){const n=H(t,v,e);b[e]?b[e].p(a,n):(b[e]=N(n),b[e].c(),b[e].m(h,null))}for(;e<b.length;e+=1)b[e].d(1);b.length=v.length}},d(a){a&&l(t),u(b,a)}}}function D(a){var t,e,n,o,r=a.dia.diaSemana+"";let m=a.Object.keys(a.dia.horarios),p=[];for(let t=0;t<m.length;t+=1)p[t]=T(V(a,m,t));return{c(){t=c("h2"),e=d(r),n=f();for(let a=0;a<p.length;a+=1)p[a].c();o=h()},m(a,r){i(a,t,r),s(t,e),i(a,n,r);for(let t=0;t<p.length;t+=1)p[t].m(a,r);i(a,o,r)},p(a,t){if(a.Object||a.tranformarParaAtividadesPorHora){let e;for(m=t.Object.keys(t.dia.horarios),e=0;e<m.length;e+=1){const n=V(t,m,e);p[e]?p[e].p(a,n):(p[e]=T(n),p[e].c(),p[e].m(o.parentNode,o))}for(;e<p.length;e+=1)p[e].d(1);p.length=m.length}},d(a){a&&(l(t),l(n)),u(p,a),a&&l(o)}}}function M(t){var e,n,o,r,d,h,p,g,v,b,$,A,z,j,y,P,S,C,B,O;let x=t.tranformarParaAtividadesPorHora(),_=[];for(let a=0;a<x.length;a+=1)_[a]=D(I(t,x,a));return{c(){(e=c("div")).innerHTML='<div espacador class="svelte-11gf6hd"></div> <div><div><img src="images/alphadance.png" alt="alphadance"></div>\n\t\t\t\t\tHorários não oficiais das aulas de dança nas unidades da Rede Alpha em: Aracaju, Caminho das Árvores, Costa\n\t\t\t\t\tAzul, Itaigara e Shopping Bella Vista.\n\t\t\t\t</div> <div espacador class="svelte-11gf6hd"></div>',n=f(),o=c("br"),r=f(),d=c("br"),h=f(),p=c("div"),g=c("div"),v=f(),b=c("div");for(let a=0;a<_.length;a+=1)_[a].c();$=f(),A=c("div"),z=f(),j=c("br"),y=c("br"),P=c("br"),S=f(),(C=c("div")).innerHTML='\n\n\t\t\t\t\t\tPara correções e sugestões fale com Evandro <a href="https://api.whatsapp.com/send?phone=5571982864766&text=Ol%C3%A1%20tenho%20uma%20sugest%C3%A3o%20sobre%20o%20alphadance." class="svelte-11gf6hd">WhatsApp:\n\t\t\t\t\t\t\t(71)98286-4766</a> <br><br>\n\t\t\t\t\t\t\tOu corrija diretamente <a href="https://github.com/evandrojr/alphadance/blob/master/src/main.js" class="svelte-11gf6hd">aqui.</a>',B=f(),O=c("br"),m(e,"topo",""),m(e,"class","svelte-11gf6hd"),m(g,"espacador",""),m(g,"class","svelte-11gf6hd"),m(A,"espacador",""),m(A,"class","svelte-11gf6hd"),m(p,"programacao",""),m(p,"class","svelte-11gf6hd"),m(C,"rodape",""),m(C,"class","svelte-11gf6hd")},m(a,t){i(a,e,t),i(a,n,t),i(a,o,t),i(a,r,t),i(a,d,t),i(a,h,t),i(a,p,t),s(p,g),s(p,v),s(p,b);for(let a=0;a<_.length;a+=1)_[a].m(b,null);s(p,$),s(p,A),i(a,z,t),i(a,j,t),i(a,y,t),i(a,P,t),i(a,S,t),i(a,C,t),i(a,B,t),i(a,O,t)},p(a,t){if(a.Object||a.tranformarParaAtividadesPorHora){let e;for(x=t.tranformarParaAtividadesPorHora(),e=0;e<x.length;e+=1){const n=I(t,x,e);_[e]?_[e].p(a,n):(_[e]=D(n),_[e].c(),_[e].m(b,null))}for(;e<_.length;e+=1)_[e].d(1);_.length=x.length}},i:a,o:a,d(a){a&&(l(e),l(n),l(o),l(r),l(d),l(h),l(p)),u(_,a),a&&(l(z),l(j),l(y),l(P),l(S),l(C),l(B),l(O))}}}function L(a,t,e){let{atividades:n}=t;return a.$set=(a=>{"atividades"in a&&e("atividades",n=a.atividades)}),{atividades:n,tranformarParaAtividadesPorHora:function(){let a,t,e=[];const o={f:'<font color="#BA0B69">FitDance</font>',v:"Dança do ventre",z:'<font color="#CDD854">Zumba</font>'};return n.forEach(n=>{(a={}).diaSemana=n.diaSemana,a.horarios=[];for(let t=6;t<=20;++t)n.locais.forEach(e=>{Object.entries(e.aulas).forEach(n=>{n[1].forEach(r=>{r==t?a.horarios.push({hora:r,atividade:o[n[0]],local:e.nome,professor:""}):r.h==t&&a.horarios.push({hora:r.h,atividade:o[n[0]],local:e.nome,professor:r.p})})})});t=a.horarios.reduce(function(a,t){return a[t.hora]=a[t.hora]||[],a[t.hora].push(t),a},Object.create(null)),a.horarios=t,e.push(a)}),console.log("trans",e),e},Object:Object}}return new class extends w{constructor(a){super(),_(this,a,L,M,r,["atividades"])}}({target:document.body,props:{atividades:[{diaSemana:"Segunda",locais:[{nome:"Aracaju",aulas:{f:[9],z:[19]}},{nome:"Caminho das Árvores",aulas:{f:[6]}},{nome:"Costa Azul",aulas:{f:[19]}},{nome:"Itaigara",aulas:{z:[19]}},{nome:"Pituba",aulas:{f:[{p:"Jader",h:12},{p:"Beijinho",h:19}],z:[9]}},{nome:"Shopping Bella Vista",aulas:{f:[{p:"Jader",h:8}]}}]},{diaSemana:"Terça",locais:[{nome:"Aracaju",aulas:{f:[19],z:[8]}},{nome:"Caminho das Árvores",aulas:{f:[19],z:[9]}},{nome:"Costa Azul",aulas:{f:[12],z:[7]}},{nome:"Itaigara",aulas:{f:[{p:"Breno",h:9},{p:"Piano",h:19}]}},{nome:"Pituba",aulas:{z:[18]}},{nome:"Shopping Bella Vista",aulas:{f:[19]}}]},{diaSemana:"Quarta",locais:[{nome:"Aracaju",aulas:{z:[19]}},{nome:"Costa Azul",aulas:{f:[7,19]}},{nome:"Pituba",aulas:{f:[7,{p:"Jader",h:18},{p:"Beijinho",h:19}],z:[9]}},{nome:"Itaigara",aulas:{z:[8,19]}},{nome:"Shopping Bella Vista",aulas:{f:[12],z:[8]}}]},{diaSemana:"Quinta",locais:[{nome:"Aracaju",aulas:{f:[19],z:[8]}},{nome:"Caminho das Árvores",aulas:{f:[19],z:[9]}},{nome:"Costa Azul",aulas:{f:[12],z:[19]}},{nome:"Pituba",aulas:{z:[17],v:[18]}},{nome:"Itaigara",aulas:{f:[{p:"Breno",h:9},{p:"Piano",h:19}]}},{nome:"Shopping Bella Vista",aulas:{f:[19],z:[8]}}]},{diaSemana:"Sexta",locais:[{nome:"Aracaju",aulas:{f:[8]}},{nome:"Caminho das Árvores",aulas:{z:[10]}},{nome:"Costa Azul",aulas:{f:[{p:"Jader",h:19}],z:[7]}},{nome:"Pituba",aulas:{f:[{p:"Jader",h:12}],z:[18]}},{nome:"Shopping Bella Vista",aulas:{f:[8],z:[19]}}]},{diaSemana:"Sábado",locais:[{nome:"Aracaju",aulas:{f:[{p:"Wagner",h:11}]}},{nome:"Costa Azul",aulas:{f:[11]}},{nome:"Pituba",aulas:{f:[{p:"Beijinho",h:11}]}},{nome:"Itaigara",aulas:{f:[{p:"Breno",h:10}]}},{nome:"Shopping Bella Vista",aulas:{f:[9]}}]}]}})}();
//# sourceMappingURL=bundle.js.map
