(()=>{
const root=document.getElementById('configura-peluche');if(!root)return;
const byId=id=>document.getElementById(id);
const chosen=name=>root.querySelector('input[name="'+name+'"]:checked').value;
const size=()=>chosen('config_size')==='custom'?Number(byId('configSizeInput').value):Number(chosen('config_size'));
const wardrobe={
'Scarpe':[0,0,7,66,86,34,7],
'Maglietta':[1,0,17,42,66,40,3],
'Cappello':[2,0,23,-3,54,26,8],
'Sciarpa':[3,0,28,40,44,29,7],
'Felpa':[0,1,15,41,70,43,4],
'Pantaloni':[1,1,24,66,52,30,2],
'Vestito':[2,1,19,42,62,45,5],
'Gilet':[3,1,23,42,54,40,6],
'Papillon':[0,2,39,43,22,13,9],
'Bandana':[1,2,30,42,40,26,8],
'Zainetto':[2,2,65,48,31,35,4],
'Mantello':[3,2,1,39,98,57,0],
'Logo ricamato':[0,3,44,59,13,13,10],
'Etichetta personalizzata':[1,3,65,73,15,9,10]};
function renderAccessories(){const container=byId('configWearables');container.replaceChildren();const selected=[...root.querySelectorAll('input[name="config_accessory"]:checked')].map(el=>el.value);selected.forEach(name=>{const [col,row,x,y,w,h,z]=wardrobe[name];const layer=document.createElement('span');layer.className='config-wearable';layer.dataset.accessory=name;Object.assign(layer.style,{backgroundPosition:(col*100/3)+'% '+(row*100/3)+'%',left:x+'%',top:y+'%',width:w+'%',height:h+'%',zIndex:String(z)});container.append(layer);});byId('configBear').setAttribute('aria-label','Orsetto '+(selected.length?'con '+selected.join(', '):'senza accessori'));}
const qty=()=>chosen('config_quantity')==='custom'?Number(byId('configQtyInput').value):Number(chosen('config_quantity'));
function valid(){return Number.isInteger(size())&&size()>=(chosen('config_size')==='custom'?41:10)&&Number.isInteger(qty())&&qty()>=(chosen('config_quantity')==='custom'?2001:500);}
function summary(){const accessories=[...root.querySelectorAll('input[name="config_accessory"]:checked')].map(el=>el.value);return 'Dimensione: '+size()+' cm\nAccessori: '+(accessories.join(', ')||'Nessuno selezionato')+(byId('configOther').value.trim()?'\nAltri dettagli: '+byId('configOther').value.trim():'')+'\nQuantità: '+qty().toLocaleString('it-IT')+' pezzi';}
function update(){renderAccessories();byId('configSizeCustom').hidden=chosen('config_size')!=='custom';byId('configQtyCustom').hidden=chosen('config_quantity')!=='custom';byId('configBear').style.width=(Math.min(Math.max(size()||10,10),60)/60*100)+'%';byId('configSizeBadge').textContent=(size()||'—')+' cm';byId('configSummary').textContent=valid()?summary():'Inserisci dimensione e quantità valide per completare il riepilogo.';byId('configError').hidden=true;const field=byId('configQuoteDetails');if(field)field.value=valid()?summary():'';}
root.addEventListener('input',update);root.addEventListener('change',update);
byId('configApply').addEventListener('click',()=>{if(!valid()){byId('configError').hidden=false;byId('configError').textContent='Per le misure maggiori inserisci almeno 41 cm; per le quantità personalizzate almeno 2.001 pezzi, usando numeri interi.';return;}
const form=byId('quoteForm');let field=byId('configQuoteDetails');if(!field){field=document.createElement('textarea');field.id='configQuoteDetails';field.name='configurazione_peluche';field.readOnly=true;field.rows=5;const wrapper=document.createElement('div');wrapper.className='field full';const label=document.createElement('label');label.htmlFor=field.id;label.textContent='La tua configurazione';wrapper.append(label,field);form.querySelector('.formgrid').prepend(wrapper);}field.value=summary();byId('preventivo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});byId('quoteName').focus({preventScroll:true});});update();
})();
