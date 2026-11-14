import {useEffect,useRef} from 'react';
import {X} from 'lucide-react';
export default function Modal({title,onClose,children}) {
 const ref=useRef(null), previous=useRef(null);
 useEffect(()=>{
  previous.current=document.activeElement;
  const node=ref.current; node?.focus();
  const handler=e=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){
   const els=[...node.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')];
   if(!els.length){e.preventDefault();return;}
   const first=els[0],last=els.at(-1);
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }};
  document.addEventListener('keydown',handler);document.body.style.overflow='hidden';
  return ()=>{document.removeEventListener('keydown',handler);document.body.style.overflow='';previous.current?.focus?.()};
 },[onClose]);
 return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="modal" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}><div className="modal-header"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={18}/></button></div>{children}</section></div>;
}
