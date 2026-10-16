(()=>{
const root=document.getElementById('configura-peluche');if(!root)return;
const byId=id=>document.getElementById(id);
const chosen=name=>root.querySelector('input[name="'+name+'"]:checked').value;
const size=()=>chosen('config_size')==='custom'?Number(byId('configSizeInput').value):Number(chosen('config_size'));
const qty=()=>chosen('config_quantity')==='custom'?Number(byId('configQtyInput').value):Number(chosen('config_quantity'));
function valid(){return Number.isInteger(size())&&size()>=(chosen('config_size')==='custom'?41:10)&&Number.isInteger(qty())&&qty()>=(chosen('config_quantity')==='custom'?2001:500);}
function summary(){const accessories=[...root.querySelectorAll('input[name="config_accessory"]:checked')].map(el=>el.value);return 'Dimensione: '+size()+' cm\nAccessori: '+(accessories.join(', ')||'Nessuno selezionato')+(byId('configOther').value.trim()?'\nAltri dettagli: '+byId('configOther').value.trim():'')+'\nQuantità: '+qty().toLocaleString('it-IT')+' pezzi';}
function update(){byId('configSizeCustom').hidden=chosen('config_size')!=='custom';byId('configQtyCustom').hidden=chosen('config_quantity')!=='custom';byId('configBear').style.width=(Math.min(Math.max(size()||10,10),60)/60*100)+'%';byId('configSizeBadge').textContent=(size()||'—')+' cm';byId('configSummary').textContent=valid()?summary():'Inserisci dimensione e quantità valide per completare il riepilogo.';byId('configError').hidden=true;const field=byId('configQuoteDetails');if(field)field.value=valid()?summary():'';}
root.addEventListener('input',update);root.addEventListener('change',update);
byId('configApply').addEventListener('click',()=>{if(!valid()){byId('configError').hidden=false;byId('configError').textContent='Per le misure maggiori inserisci almeno 41 cm; per le quantità personalizzate almeno 2.001 pezzi, usando numeri interi.';return;}
const form=byId('quoteForm');let field=byId('configQuoteDetails');if(!field){field=document.createElement('textarea');field.id='configQuoteDetails';field.name='configurazione_peluche';field.readOnly=true;field.rows=5;const wrapper=document.createElement('div');wrapper.className='field full';const label=document.createElement('label');label.htmlFor=field.id;label.textContent='La tua configurazione';wrapper.append(label,field);form.querySelector('.formgrid').prepend(wrapper);}field.value=summary();byId('preventivo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});byId('quoteName').focus({preventScroll:true});});update();
})();
