document.addEventListener("DOMContentLoaded", function () {

    var el = document.querySelector(".custom-page");
    if (el) {
        el.remove();
    }

    var images = document.querySelectorAll("img:not([loading])");
    images.forEach(function (img) {
        img.setAttribute("loading", "lazy");
    });

    if (window.location.hostname === "app.planet-88.org") {
        var style = document.createElement("style");
        style.innerHTML = ".downloadapk { display: none !important; }";
        document.head.appendChild(style);
    }

});
