export default function fontSize() {
    function updateFontSize() {
        var html = document.getElementsByTagName('HTML');
        html[0].style.fontSize = getFontSize() + 'px';
    }

    function getFontSize() {
        var screenWidth = window.innerWidth;
        return screenWidth / 320 * 20;
    }

    setTimeout(function () {
        updateFontSize();
    }, 100);

    window.onresize = updateFontSize;
    window.getFontSize = getFontSize;
}
