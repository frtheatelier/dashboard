///// WINDOW OVERVIEW STRUCTURE THING
/*
    ID: WINDOW#
        ID: WINDOW#HEAD
*/

// HOVER OPTIONS ANIMATION ??? 

// function getPercentagePos(el, side = "left") {
//     console.log('get%: '+el.style.left)
//     const style = getComputedStyle(el);
//     const val = style.getPropertyValue(side);
//     console.log('get%: '+val)
//     return parseFloat(val); // returns number (e.g., 20)
// }

function hoverExpand(elmnt, side='left') {
    elmnt.addEventListener('mouseenter', () => {
        elmnt.style.transition = "width 0.3s ease, left 0.3s ease, right 0.3s ease";

        const width = parseFloat(elmnt.dataset.width);
        elmnt.style.width = `${width+1}%`;

        const offset = parseFloat(elmnt.dataset.side);
        if (side == 'left') {
            elmnt.style.left = `${offset-1}%`;
        } else {
            elmnt.style.right = `${offset-1}%`;
        }
    });
    elmnt.addEventListener('mouseleave', () => {
        const width = parseFloat(elmnt.dataset.width);
        elmnt.style.width = `${width-1}%`;

        const offset = parseFloat(elmnt.dataset.side);
        if (side == 'left') {
            elmnt.style.left = `${offset+1}%`;
        } else {
            elmnt.style.right = `${offset+1}%`;
        }
    })
}

// DISPLAY CREDITS

function displayCredits() {
    var credits = document.getElementById('credits');
    credits.classList.toggle('show');
}

// MUTE AUDIO 

function toggleMute() {
    var cross = document.getElementById('crossline')
    cross.classList.toggle('show');

    var l = document.getElementById('lilmati-select'), // lilmati, krokulat, harrisonlace
        k = document.getElementById('krokulat-select'),
        h = document.getElementById('harrisonlace-select');
    
    l.muted = !l.muted;
    k.muted = !k.muted;
    h.muted = !h.muted;
}

// DISPLAY WINDOW + IMG (onclick)

// function showingDisplay() {
//     for (let i = 1; i < 5; i++) {
//         let x = document.getElementById("window" + i);
//         if (x.style.display != "none") return true

//         console.log('window'+i+' is showing')
//     }

//     return false
// }

function showingDisplay(txt, total=5) {
    for (let i = 1; i < total+1; i++) {
        let x = document.getElementById(txt + i);
        if (x.style.display != "none") return true
    }

    return false
}

function closeImage(total) {
    console.log(":P")
    var black = document.getElementById('black-screen');
    black.style.display = 'none';

    for (let i = 1; i < total+1; i++) {
        var x = document.getElementById("full-" + i);
        x.style.display = "none";
    }

    var f = document.getElementById("full-images");
    f.style.display = "none";
}

function displayWindow(num) {
    var select = document.getElementById('lilmati-select'), // lilmati, krokulat, harrisonlace
        close = document.getElementById('krokulat-select');

    // 1. get window id + number (1-4)
    var x = document.getElementById("window" + num);
    console.log(":)")

    if (x.style.display === "none" && !showingDisplay("window", 4)) {
        x.style.display = "block";
        // x.classList.add("show");

        select.play(); // PLAY SFX
    } else {
        x.style.display = "none";
        // x.classList.remove("show");

        close.play(); // PLAY SFX
    }
}

function displayImage(num) {
    var x = document.getElementById("full-" + num);
    var b = document.getElementById("black-screen");
    var f = document.getElementById("full-images");
    console.log(":D")
    console.log(x,b,f)

    if (x.style.display === "none" && !showingDisplay("full-")) {
        x.style.display = "block";
        b.style.display = "block";
        f.style.display = "block";
        console.log("post: ",x,b,f)
    } else {
        x.style.display = "none";
        b.style.display = "none";
        f.style.display = "none";
        console.log("post: ",x,b,f)
    }
}

// DRAGGABLE WINDOW

function dragElement(elmnt) { 
    if (document.getElementById(elmnt.id + "head")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "head").onmousedown = dragMethod;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMethod;
    }

    let mouseX = 0, mouseY = 0, posLeft = 0, posTop = 0

    function dragMethod(e) {
        // e = e || window.event;
        e.preventDefault();

        // get the mouse cursor position at startup:
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.onmouseup = liftElement;

        // call a function whenever the cursor moves:
        document.onmousemove = dragElement;
    }

    function dragElement(e) {
        // e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        posLeft = mouseX - e.clientX;
        posTop = mouseY - e.clientY;
        
        mouseX = e.clientX;
        mouseY = e.clientY;

        let newLeft = elmnt.offsetLeft - posLeft;
        let newTop = elmnt.offsetTop - posTop;

        const maxLeft = window.innerWidth - elmnt.offsetWidth;
        const maxTop = window.innerHeight - elmnt.offsetHeight;

        // set the element's new position:
        newLeft = Math.min(Math.max(newLeft, 0), maxLeft)
        newTop = Math.max(0, Math.min(newTop, maxTop));
        
        elmnt.style.left = newLeft + "px";
        elmnt.style.top = newTop + "px";
    }

    function liftElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}