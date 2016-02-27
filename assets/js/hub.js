 /*
    Highlight code for plain theme of waypointer
 */

addEventListener('load', function() {
    var nodeList = document.querySelectorAll('pre code');
    for (var i = 0; i < nodeList.length; ++i) {
        hljs.highlightBlock(nodeList[i]);
    }
});