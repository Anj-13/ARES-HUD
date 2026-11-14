export const INITIAL_STOPS = [
 {id:'delta',name:'Delta front concept',x:69,y:42,selected:true},
 {id:'channel',name:'Channel mouth concept',x:54,y:32,selected:true},
 {id:'lobe',name:'Distal lobe concept',x:77,y:76,selected:true},
];
export const SOURCES = [
 {name:'NASA Mars Trek',url:'https://trek.nasa.gov/mars/'},
 {name:'NASA Mars Exploration Program',url:'https://science.nasa.gov/mars/'},
 {name:'USGS Astrogeology',url:'https://astrogeology.usgs.gov/'},
];
export const SOLS = Array.from({length:8},(_,i)=>({sol:i+1,label:`Sol ${i+1}`}));
