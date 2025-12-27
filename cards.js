const pages=[
 "cards/page1.jpg","cards/page2.jpg","cards/page3.jpg",
 "cards/page4.jpg","cards/page5.jpg","cards/page6.jpg","cards/page7.jpg"
];
let i=0;
const img=document.getElementById("card");
const p=document.getElementById("pageIndicator");

function upd(){
  p.style.opacity=0;
  setTimeout(()=>{p.textContent=`${i+1} / ${pages.length}`;p.style.opacity=1},200);
}
function next(){ if(i<pages.length-1){i++;img.src=pages[i];upd();} }
function prev(){ if(i>0){i--;img.src=pages[i];upd();} }

let x,y;
img.ontouchstart=e=>{x=e.touches[0].clientX;y=e.touches[0].clientY}
img.ontouchend=e=>{
  const dx=e.changedTouches[0].clientX-x;
  const dy=e.changedTouches[0].clientY-y;
  if(Math.max(Math.abs(dx),Math.abs(dy))<30) return;
  Math.abs(dx)>Math.abs(dy)? dx<0?next():prev() : dy<0?next():prev();
};
upd();
