function backAdd(){
    window.location.href= window.location.href.slice(0,window.location.href.indexOf('/add'));
}

function backUpd(){
    window.location.href= window.location.href.slice(0,window.location.href.indexOf('/upd'));
}

function delete1(){
    fetch(`delete?phone=${document.getElementById('phone').value}`, {
        method:'POST',
    });
    window.location.href= window.location.href.slice(0,window.location.href.indexOf('u'));
}

// function disBtn(){
//     console.log(123);
//     if(nameInp.value.length <= 1){
//         document.getElementById('deleteBtn').disabled = true;
//     } else {
//         document.getElementById('deleteBtn').disabled = false;
//     }
// }

let nameInp;
let i = 0;

function getNameInp(){
    if(i == 0){
        nameInp = document.getElementById('nameInp').value;
        i++;
    } else {
        console.log(nameInp);
    }
}

function disBtn(){
    if(document.getElementById('nameInp').value != nameInp){
        document.getElementById('deleteBtn').disabled = true;
    } else {
        document.getElementById('deleteBtn').disabled = false;
    }
}
