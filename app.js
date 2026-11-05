const MAJORS=['علوم الحاسب','هندسة البرمجيات','الأمن السيبراني','الذكاء الاصطناعي','نظم المعلومات','هندسة','طب','تمريض','إدارة أعمال','محاسبة','قانون','إعلام','تصميم','تسويق'];
const TYPES=['هاكاثون','تطوع','تدريب','دورة','ورشة','منحة','مسابقة'];
const LEVELS=['سنة أولى','سنة ثانية','سنة ثالثة','سنة رابعة','خريج'];
const CITIES=['مكة','جدة','الرياض','عن بُعد'];
const ALL='الكل';
const ORGS=[{n:'Tech Hub',k:'شركة',d:'فرص تقنية وتدريبية للطلاب.'},{n:'مركز الابتكار',k:'جامعة',d:'ورش ومسابقات ومبادرات طلابية.'},{n:'أثر مجتمعي',k:'مبادرة',d:'فرص تطوع ومشاركة مجتمعية.'}];
const OPPS=[
{id:1,t:'تدريب صيفي في تطوير الويب',o:'Tech Hub',type:'تدريب',major:['علوم الحاسب','هندسة البرمجيات','نظم المعلومات'],level:['سنة ثالثة','سنة رابعة','خريج'],city:'الرياض',end:'2026-11-15'},
{id:2,t:'هاكاثون الأمن السيبراني',o:'مركز الابتكار',type:'هاكاثون',major:['الأمن السيبراني','علوم الحاسب'],level:[],city:'جدة',end:'2026-10-20'},
{id:3,t:'دورة أساسيات الذكاء الاصطناعي',o:'Tech Hub',type:'دورة',major:['الذكاء الاصطناعي','علوم الحاسب','هندسة'],level:[],city:'عن بُعد',end:'2026-12-01'},
{id:4,t:'حملة التبرع بالدم',o:'أثر مجتمعي',type:'تطوع',major:['طب','تمريض'],level:[],city:'مكة',end:'2026-10-25'},
{id:5,t:'منحة التميز الدراسي',o:'مركز الابتكار',type:'منحة',major:[],level:['سنة أولى','سنة ثانية'],city:'عن بُعد',end:'2026-12-31'},
{id:6,t:'تدريب تعاوني في المحاسبة',o:'Tech Hub',type:'تدريب',major:['محاسبة','إدارة أعمال'],level:['سنة ثالثة','سنة رابعة','خريج'],city:'جدة',end:'2026-11-10'},
{id:7,t:'ورشة تصميم تجربة المستخدم',o:'مركز الابتكار',type:'ورشة',major:['تصميم','إعلام','هندسة البرمجيات'],level:[],city:'مكة',end:'2026-11-05'},
{id:8,t:'هاكاثون الصحة الرقمية',o:'Tech Hub',type:'هاكاثون',major:['طب','تمريض','علوم الحاسب','الذكاء الاصطناعي'],level:[],city:'الرياض',end:'2026-11-22'},
{id:9,t:'تطوع في تنظيم المؤتمرات',o:'أثر مجتمعي',type:'تطوع',major:[],level:[],city:'جدة',end:'2026-12-15'},
{id:10,t:'تدريب في التسويق الرقمي',o:'Tech Hub',type:'تدريب',major:['تسويق','إعلام','إدارة أعمال'],level:['سنة ثانية','سنة ثالثة','سنة رابعة'],city:'عن بُعد',end:'2026-11-30'},
{id:11,t:'مسابقة الابتكار الطلابي',o:'مركز الابتكار',type:'مسابقة',major:[],level:[],city:'الرياض',end:'2026-11-28'},
{id:12,t:'ورشة الثقافة القانونية',o:'أثر مجتمعي',type:'ورشة',major:['قانون'],level:[],city:'جدة',end:'2026-12-10'},
{id:13,t:'منحة الدراسات العليا في الهندسة',o:'مركز الابتكار',type:'منحة',major:['هندسة'],level:['سنة رابعة','خريج'],city:'الرياض',end:'2027-01-20'},
{id:14,t:'برنامج الخريجين الجدد في التقنية',o:'Tech Hub',type:'تدريب',major:['علوم الحاسب','هندسة البرمجيات','الأمن السيبراني'],level:['خريج'],city:'جدة',end:'2026-12-05'}];
const EV=['هاكاثون','ورشة','مسابقة'];

const store={get(k,d){try{const v=localStorage.getItem('khotwa:'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('khotwa:'+k,JSON.stringify(v))}catch(e){}}};
let S={users:store.get('users',{}),session:store.get('session',null)};
const persist=()=>{store.set('users',S.users);store.set('session',S.session)};
const me=()=>S.session?S.users[S.session]:null;
const $=s=>document.querySelector(s),dlg=$('#dlg');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2200)}
const today=()=>{const d=new Date();return new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10)};
const ended=o=>o.end<today();
const opts=(a,v,all)=>(all?[all,...a]:a).map(x=>`<option ${x===v?'selected':''}>${x}</option>`).join('');

let F={q:'',type:ALL,major:'كل التخصصات',level:'كل المستويات',city:'كل المدن'};
function card(o){
 const u=me(),sv=u&&u.saved.includes(o.id),ap=u&&u.applied.includes(o.id),ex=ended(o);
 return `<article class="card opp"><span class="tag">${o.type}</span>${ex?'<span class="tag end">انتهى التسجيل</span>':''}<h3>${o.t}</h3>
 <div class="m">${o.o} · ${o.city}</div>
 <div class="m">${o.major.length?o.major.slice(0,2).join('، ')+(o.major.length>2?'…':''):'كل التخصصات'} — آخر موعد <bdi dir="ltr">${o.end}</bdi></div>
 <div class="row"><button class="btn sm" onclick="act(${o.id},'applied')" ${ap||ex?'disabled':''}>${ap?'تم التسجيل':ex?'انتهى الموعد':'سجّل الآن'}</button>
 <button class="btn ghost sm" onclick="act(${o.id},'saved')" ${ex?'disabled':''}>${sv?'إزالة الحفظ':'حفظ'}</button></div></article>`}
const listOf=(a,msg)=>a.length?a.map(card).join(''):`<div class="empty">${msg}</div>`;
function match(o){return (F.type===ALL||o.type===F.type)&&(F.major==='كل التخصصات'||!o.major.length||o.major.includes(F.major))&&(F.level==='كل المستويات'||!o.level.length||o.level.includes(F.level))&&(F.city==='كل المدن'||o.city===F.city)&&(!F.q||(o.t+' '+o.o+' '+o.type).toLowerCase().includes(F.q.trim().toLowerCase()))}
function draw(){
 $('#typePills').innerHTML=[ALL,...TYPES].map(t=>`<button class="${t===F.type?'on':''}" onclick="F.type='${t}';draw()">${t}</button>`).join('');
 $('#list').innerHTML=listOf(OPPS.filter(match),'لا توجد فرص بهذه الاختيارات. خفف الفلاتر وجرّب مرة ثانية.');
 $('#evList').innerHTML=listOf(OPPS.filter(o=>EV.includes(o.type)),'لا توجد فعاليات حاليًا.');
 $('#orgList').innerHTML=ORGS.map(g=>`<article class="card org"><span class="tag k">${g.k}</span><h3>${g.n}</h3><p>${g.d}</p><div class="m">${OPPS.filter(o=>o.o===g.n).length} فرص متاحة</div></article>`).join('');
 drawDash();
}
function drawDash(){
 const u=me();$('#dash').hidden=!u;$('#authBtn').innerHTML=u?'':'<button class="btn sm" onclick="openAuth(\'login\')">تسجيل الدخول</button> <button class="btn ghost sm" onclick="startNow()">ابدأ الآن</button>';
 if(!u)return;
 const by=ids=>ids.map(i=>OPPS.find(o=>o.id===i)).filter(Boolean);
 const rec=OPPS.filter(o=>!ended(o)).map(o=>[o,score(o,u)]).filter(x=>x[1]>=0).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
 $('#dTitle').textContent='لوحة الطالب · أهلًا '+u.name.split(' ')[0];
 $('#sSaved').textContent=u.saved.length;$('#sApplied').textContent=u.applied.length;$('#sRec').textContent=rec.length;
 $('#recList').innerHTML=listOf(rec,'حدّث ملفك لتظهر لك فرص مقترحة.');
 $('#savedList').innerHTML=listOf(by(u.saved),'لم تحفظ أي فرصة بعد.');
 $('#appList').innerHTML=listOf(by(u.applied),'لم تسجل في أي فرصة بعد.');
}
function score(o,u){let s=0;if(o.major.includes(u.major))s+=3;else if(!o.major.length)s+=1;else return -1;
 if(!o.level.length||o.level.includes(u.level))s+=2;else return -1;if(u.interests.includes(o.type))s+=2;return s}
function act(id,k){
 const u=me();if(!u){openAuth('login');toast('سجّل الدخول أولًا');return}
 if(k==='saved'){const i=u.saved.indexOf(id);i>=0?u.saved.splice(i,1):u.saved.push(id);toast(i>=0?'أُزيلت من المحفوظات':'تم الحفظ')}
 else if(ended(OPPS.find(o=>o.id===id))){toast('انتهى موعد التسجيل في هذه الفرصة');return}
 else if(!u.applied.includes(id)){u.applied.push(id);toast('تم تسجيلك في الفرصة')}
 persist();draw();
}
function goDash(){if(!me()){openAuth('login','dash');return}$('#dash').scrollIntoView()}
$('#navDash').addEventListener('click',e=>{e.preventDefault();goDash()});
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
dlg.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT'&&e.target.type!=='checkbox'){e.preventDefault();dlg.querySelector('.btn').click()}});
function startNow(){me()?goDash():openAuth('register','dash')}

function openAuth(mode,next){
 const reg=mode==='register';
 $('#dlgBody').innerHTML=`<h3 style="margin-top:0">${reg?'أنشئ ملفك':'تسجيل الدخول'}</h3>
 ${reg?'<div class="f"><label for="a_n">الاسم</label><input id="a_n"></div>':''}
 <div class="f"><label for="a_e">البريد الإلكتروني</label><input id="a_e" type="email" dir="ltr"></div>
 <div class="f"><label for="a_p">كلمة المرور (6 أحرف على الأقل)</label><input id="a_p" type="password" dir="ltr"></div>
 ${reg?profileFields({major:MAJORS[0],level:LEVELS[0],skills:'',interests:[]}):''}
 <div class="err" id="a_err"></div>
 <div class="row"><button class="btn" onclick="submitAuth('${mode}','${next||''}')">${reg?'إنشاء الحساب':'دخول'}</button>
 <button class="btn ghost" onclick="openAuth('${reg?'login':'register'}','${next||''}')">${reg?'لدي حساب':'حساب جديد'}</button>
 <button class="btn ghost" onclick="dlg.close()">إغلاق</button></div>`;
 if(!dlg.open)dlg.showModal();
}
function profileFields(u){return `<div class="f"><label for="p_m">التخصص</label><select id="p_m">${opts(MAJORS,u.major)}</select></div>
 <div class="f"><label for="p_l">المستوى</label><select id="p_l">${opts(LEVELS,u.level)}</select></div>
 <div class="f"><label for="p_s">المهارات (اختياري)</label><input id="p_s" value="${esc(u.skills)}" placeholder="مثال: بايثون، تصميم، كتابة"></div>
 <div class="f"><span class="lb">الاهتمامات</span><div class="cb">${TYPES.map(t=>`<label><input type="checkbox" class="p_i" value="${t}" ${u.interests.includes(t)?'checked':''}> ${t}</label>`).join('')}</div></div>`}
const readProfile=()=>({major:$('#p_m').value,level:$('#p_l').value,skills:$('#p_s').value.trim(),interests:[...document.querySelectorAll('.p_i:checked')].map(x=>x.value)});
async function hash(s){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return btoa(unescape(encodeURIComponent(s)))}}
async function submitAuth(mode,next){
 const e=$('#a_e').value.trim().toLowerCase(),p=$('#a_p').value,err=m=>$('#a_err').textContent=m;
 if(!/^\S+@\S+\.\S+$/.test(e))return err('أدخل بريدًا إلكترونيًا صحيحًا.');
 if(p.length<6)return err('كلمة المرور أقصر من 6 أحرف.');
 const h=await hash(p);
 if(mode==='register'){
  const n=$('#a_n').value.trim();if(!n)return err('أدخل اسمك.');
  if(S.users[e])return err('هذا البريد مسجل مسبقًا. سجّل الدخول.');
  S.users[e]={name:n,email:e,h,saved:[],applied:[],...readProfile()};
 }else if(!S.users[e]||S.users[e].h!==h)return err('البريد أو كلمة المرور غير صحيحة.');
 S.session=e;persist();dlg.close();draw();toast('أهلًا بك في خطوة');
 if(next==='dash')setTimeout(()=>$('#dash').scrollIntoView());
}
function editProfile(){const u=me();
 $('#dlgBody').innerHTML=`<h3 style="margin-top:0">تعديل الملف</h3>${profileFields(u)}
 <div class="row"><button class="btn" onclick="saveProfile()">حفظ</button><button class="btn ghost" onclick="dlg.close()">إغلاق</button></div>`;dlg.showModal()}
function saveProfile(){Object.assign(me(),readProfile());persist();dlg.close();draw();toast('تم حفظ الملف')}
function logout(){S.session=null;persist();draw();scrollTo(0,0);toast('تم تسجيل الخروج')}

$('#fm').innerHTML=opts(MAJORS,'', 'كل التخصصات');
$('#fl').innerHTML=opts(LEVELS,'','كل المستويات');
$('#fc').innerHTML=opts(CITIES,'','كل المدن');
draw();
