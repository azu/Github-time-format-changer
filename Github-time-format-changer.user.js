// ==UserScript==
// @id             github.com-ff599db1-47d8-b14f-83b4-3e345f6d67e3@http://efcl.info/
// @name           Github-time-format-changer
// @version        1.0
// @namespace      http://efcl.info/
// @author         azu
// @license        MIT
// @description    Change Github time format.
// @include        https://github.com/*
// @run-at         document-end
// @grant          none
// @require        https://cdn.jsdelivr.net/momentjs/2.6.0/moment.min.js
// ==/UserScript==

var $ = unsafeWindow.$;
var toArray = Function.prototype.call.bind(Array.prototype.slice);
var relative = /ago/i;
function _update(body) {
    var times = body.getElementsByTagName("time");
    toArray(times).forEach(function (timeElement) {
        if (!relative.test(timeElement.textContent)) {
            timeElement.textContent = moment(timeElement.getAttribute("datetime")).fromNow();
        }
    });
}
function update(body) {
    requestAnimationFrame(function () {
        _update(body);
    });
}
$(document).on('pjax:popstate pjax:end', function pjaxEnd() {
    update(document.body);
});
var addFilterHandler = function (evt) {
    var node = evt.target;
    update(node);
};
document.body.addEventListener('AutoPagerize_DOMNodeInserted', addFilterHandler, false);
// MAIN =
setTimeout(function () {
    update(document.body);
}, 100);

window.addEventListener("load", function onLoad() {
    update(document.body);
});