$(function() {
    const urlUrlID = location.href ? location.href.split("#") : null;
    const urlDivID = urlUrlID ? urlUrlID.pop() : null;
    const targetDiv = urlDivID ? $(`#${urlDivID}`) : null;
    if(!targetDiv) return;
    $('html, body').animate({
        scrollTop: $(targetDiv).offset().top
    }, 1000); 
});