var keepFooter = function() {
    var windowHeight = $(window).height();
    console.log(windowHeight);
    var footerHeight = $('#footer').height();
    var beforeHeight = $('#indexBefore').height();

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