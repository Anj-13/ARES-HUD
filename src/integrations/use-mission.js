import {useEffect,useSyncExternalStore} from 'react';
export function useMission(store){
  const state=useSyncExternalStore(store.subscribe,store.getSnapshot);
  useEffect(()=>{
    if(!state.playing)return;
    const timer=setInterval(store.actions.tick,100);
    return()=>clearInterval(timer);
  },[store,state.playing]);
  return state;
}
