box = document.getElementById("messages");
function print(item){
    let e = document.createElement("p");
    e.innerHTML = item;
    box.appendChild(e);
}

function prompt(){
    let e = document.createElement("p");
    let begin = document.createElement("span");
    begin.innerHTML = "guest@JCDOS> ";
    begin.className = "prompt";
    let text = document.createElement("span");
    text.contentEditable = true;
    text.style.minWidth = "100px";
    text.addEventListener("keydown",
        function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                text.contentEditable = false;
                //text.disabled = true;
                removeEventListener("keydown",text);
                run(text.innerHTML);
            }
        }
    );

    e.appendChild(begin);
    e.appendChild(text);
    box.appendChild(e);
    text.focus();
    document.body.onfocus = function (){
        setTimeout(function(){
            text.focus();
        })
    }
    text.onblur = function () {
        setTimeout(function () {
            if (document.hasFocus()){
                text.focus();                
            }
        });
    };
}

function run(command){
    let commands = {
        "cd":"where? never heard of that place.",
        "ls":"Grocery List: bacon, eggs, spam, cheese.",
        "dir":"Grocery List: bacon, eggs, spam, cheese.",
        "cat":"Here, kitty, kitty!",
        "help":"Figure it out yourself.",
        "sudo":"That trick doesn't work on me.",
        "echo":"ECHO... Echo... echo... <small>echo...</small>"
    }
    for (let i of Object.keys(commands)){
        if (command.startsWith(i)){
            print(commands[i]);
            prompt();
            return;
        }
    }
    if (command.replaceAll("&nbsp;"," ").trim().length != 0){
        print("I don't think I'm understanding your accent very well.");
        console.log(command);
    }
    prompt();
}

print("Welcome to the JC-DOS command line interface.");
print("Use “cd”, “ls”, “cat”, and “help” to navigate the filesystem.");
prompt();