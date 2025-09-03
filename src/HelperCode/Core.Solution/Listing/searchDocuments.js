// Remove particles animation
$("div#particles-foreground, div#particles-background, .vertical-centered-box").animate(
    { opacity: 0 },
    {
        duration: 333,
        complete: function () {
            $("div#particles-foreground, div#particles-background, .vertical-centered-box").remove();
        },
    }
);

changeResources();