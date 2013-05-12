var keepFooter = function() {
    var windowHeight = $(window).height();
    console.log(windowHeight);
    var footerHeight = $('#footer').height();
    var beforeHeight = $('#indexBefore').height();
    if(windowHeight > footerHeight + beforeHeight) {
        $('#footer').css({position: 'absolute', bottom: 0});
    } else {
        $('#footer').css({position: 'static'});
    }
};
if (window.addEventListener){
    window.addEventListener('resize', function() {
        keepFooter();
    });
} else if (window.attachEvent){
    // for ie
    window.attachEvent('resize', function() {
        keepFooter();
    });
}
keepFooter();