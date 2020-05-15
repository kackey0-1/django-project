function chgColor(arg) { 
    document.getElementById(arg.value).style.color = "red";
}

function prevew(arg) { 
    document.getElementById(arg.value+"1").style.display = "none";
    document.getElementById(arg.value+"2").style.display = "block";
}

function prevew_back(arg) { 
    document.getElementById(arg.value+"1").style.display = "block";
    document.getElementById(arg.value+"2").style.display = "none";
}

function detail(a) { 
    document.getElementById(a.name+"3").style.display = "none";
    document.getElementById(a.name+"1").style.display = "block";
    document.getElementById("target").value = a.value;    
}

function detail_back(arg) { 
    document.getElementById(arg.value+"3").style.display = "block";
    document.getElementById(arg.value+"1").style.display = "none";
}