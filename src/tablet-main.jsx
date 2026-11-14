import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import TabletView from './components/TabletView.jsx';
import './styles/main.css';
function TabletApp(){
 const [encoded,setEncoded]=useState(()=>location.hash.slice(1));
 useEffect(()=>{const load=()=>setEncoded(location.hash.slice(1));window.addEventListener('hashchange',load);return()=>window.removeEventListener('hashchange',load);},[]);
 return <main className="standalone-tablet"><TabletView encoded={encoded} standalone/></main>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><TabletApp/></React.StrictMode>);
