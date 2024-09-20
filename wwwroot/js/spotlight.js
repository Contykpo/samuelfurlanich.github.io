document.addEventListener("mousemove", function (e) {
    const spotlight = document.getElementById('spotlight');
    // Half of the spotlight size (600px total)
    const spotlightSize = 300;

    spotlight.style.left = (e.pageX - spotlightSize) + 'px';
    spotlight.style.top = (e.pageY - spotlightSize) + 'px';
});
