// <------- SLIDER IMAGES -------> //
var slideImages = [

    [
        { img_url: "images/01 (2).jpg" },
        { img_url: "images/02 (2).jpg" },
        { img_url: "images/03 (2).jpg" },
        { img_url: "images/04 (2).jpg" },
        { img_url: "images/05.jpg" },
        { img_url: "images/06.jpg" },
        { img_url: "images/07.jpg" },
        { img_url: "images/08.jpg" },


    ],
];

var z = null;

//script for media queries

var value = window.matchMedia("(max-width: 550px)");
mFunction(value);
value.addListener(mFunction);
function mFunction(value) {
    if (value.matches) {
        z = slideImages[1];
    } else {
        z = slideImages[0];
    }
}

z.map(function (ele, index) {
    var slideDiv = document.createElement("div");
    switch (index) {
        case 0:
            slideDiv.setAttribute("class", "slide first");
            break;
        default:
            slideDiv.setAttribute("class", "slide");
    }

    var images = document.createElement("img");
    images.src = ele.img_url;

    slideDiv.append(images);
    document.getElementById("slides").append(slideDiv);
});
