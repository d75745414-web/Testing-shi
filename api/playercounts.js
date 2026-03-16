const PLAYER_API = "/api/playercounts?universeIds=";

function createPlayerBoxes(){
    document.querySelectorAll(".gamecard .gamecontent").forEach(content=>{
        if(content.querySelector(".playerbox")) return;
        const box=document.createElement("div");
        box.className="playerbox";
        box.innerHTML=`
            <i class="fa-solid fa-users"></i>
            <span class="playercount">0</span>
            <div class="playerdot"></div>
        `;
        content.appendChild(box);
    });
}

async function updatePlayerCounts(){
    const cards=document.querySelectorAll(".gamecard[data-universe]");
    if(cards.length===0) return;

    const universeIds=[...new Set(Array.from(cards).map(c=>c.dataset.universe))].filter(id=>/^\d+$/.test(id));
    if(universeIds.length===0) return;

    try{
        const res=await fetch(PLAYER_API+universeIds.join(","));
        const data=await res.json();
        const map={};
        data.data.forEach(g=>{ map[g.id]=g.playing; });
        cards.forEach(card=>{
            const id=card.dataset.universe;
            const counter=card.querySelector(".playercount");
            if(counter) counter.textContent=(map[id]??0).toLocaleString();
        });
    }catch(e){}
}

createPlayerBoxes();
updatePlayerCounts();
setInterval(updatePlayerCounts,3000);
