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