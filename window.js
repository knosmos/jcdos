let zIndex = 100;

class win{ // "window" is reserved or something
    constructor(title,content,width=500,height=400){
        this.title = title;
        this.content = content;

        // make the "window" part
        this.elem = document.createElement("div");
        this.elem.className = "ui-widget-content window";
        this.elem.onmousedown = this.show.bind(this);
        this.elem.style.width = width+"px";
        this.elem.style.height = height+"px";
        
        this.header = document.createElement("div");
        this.header.className = "window-header";
        this.header.innerHTML = title;

        this.closeButton = document.createElement("button");
        this.closeButton.innerHTML = "✕";
        this.closeButton.className = "winButton";
        this.closeButton.onclick = this.close.bind(this);
        this.header.appendChild(this.closeButton);

        this.fullButton = document.createElement("button");
        this.fullButton.innerHTML = "☐";
        this.fullButton.className = "winButton";
        this.fullButton.onclick = this.fullscreen.bind(this);
        this.header.appendChild(this.fullButton);

        this.minButton = document.createElement("button");
        this.minButton.innerHTML = "🗕";
        this.minButton.className = "winButton";
        this.minButton.onclick = this.minimize.bind(this);
        this.header.appendChild(this.minButton);
        
        this.contentDiv = document.createElement("div");
        this.contentDiv.className = "content";
        this.contentDiv.innerHTML = content;

        this.elem.appendChild(this.header);
        this.elem.appendChild(this.contentDiv);
        document.getElementById("window-div").appendChild(this.elem);

        $(this.elem).draggable();
        $(this.elem).resizable();
        this.full = false;
        this.elem.style.zIndex = zIndex++;
        this.elem.style.left = Math.random()*100+"px";
        this.elem.style.top = Math.random()*200+50+"px";

        // make the taskbar tab
        this.tab = document.createElement("div");
        this.tab.className = "tab";
        this.tab.innerHTML = title;
        this.tab.onclick = this.show.bind(this);
        document.getElementById("tabs").appendChild(this.tab);
    }
    minimize(){
        this.elem.style.display = "none";
    }
    show(){
        // shows the element (if hidden) and brings it to the front.
        this.elem.style.display = "block";
        this.elem.style.zIndex = zIndex++;
    }
    fullscreen(){
        if (!this.full){
            $(this.elem).draggable("disable");
            $(this.elem).resizable("disable");            
            this.top = this.elem.style.top;
            this.left = this.elem.style.left;
            this.width = this.elem.style.width;
            this.height = this.elem.style.height;
            this.elem.style.top = 0;
            this.elem.style.left = 0;
            this.elem.style.width = "100%";
            this.elem.style.height = "100%";
            this.full = true;
        }
        else{
            this.elem.style.top = this.top;
            this.elem.style.left = this.left;
            this.elem.style.width = this.width;
            this.elem.style.height = this.height;
            this.full = false;
            $(this.elem).draggable("enable");
            $(this.elem).resizable("enable");
        }
    }
    close(){
        document.getElementById("window-div").removeChild(this.elem);
        document.getElementById("tabs").removeChild(this.tab);
    }
}

powerDiv = document.getElementById("power-div");
function shutdown(){
    powerDiv.style.display = "block";
    setTimeout(function(){
        powerDiv.style.opacity = 1;
    })
}

function poweron(){
    powerDiv.style.opacity = 0;
    setTimeout(function(){
        powerDiv.style.display = "none";
    },1000);
}

function add(text,content,w,h){
    new win(text,content,w,h);
}

// change background (if background has been changed)
let b = localStorage.getItem("background");
if (b === null){
    b = "bliss.jpg";
}
document.body.style.backgroundImage = `url("assets/backgrounds/${b}")`;
if ( window.addEventListener ) {
    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
    window.addEventListener("keydown", function(e){
        kkeys.push( e.keyCode );
        if ( kkeys.toString().indexOf( konami ) >= 0 ){
            document.body.style.backgroundImage = `url("assets/hackerman.jpg")`;
            kkeys = [];            
        }
    }, true);
}