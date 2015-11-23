var ami = ami || {};
ami.mensfitness = ami.mensfitness || {};
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];


/* Updated 11/09/2015 10:49am */
ami.mensfitness.ads = (function() {
    return {
        slots: {},
        elementInViewport: function(el) {
            var rect = el.getBoundingClientRect();
            return (
            rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight || rect.height))
        },
        initialize: function() {

            (function() {
                var gads = document.createElement('script');
                gads.async = true;
                gads.type = 'text/javascript';
                var useSSL = 'https:' == document.location.protocol;
                gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
                var node = document.getElementsByTagName('script')[0];
                node.parentNode.insertBefore(gads, node);
            })();

            googletag.cmd.push(function() {

                googletag.pubads().enableAsyncRendering();
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();

                if (typeof ads_targeting["kw"] !== "undefined") {
                    googletag.pubads().setTargeting("kw", ads_targeting["kw"]);
                }
                if (typeof ads_targeting["s1"] !== "undefined") {
                    googletag.pubads().setTargeting("s1", ads_targeting["s1"]);
                }
                if (typeof ads_targeting["s2"] !== "undefined") {
                    googletag.pubads().setTargeting("s2", ads_targeting["s2"]);
                }
                if (typeof ads_targeting["s3"] !== "undefined") {
                    googletag.pubads().setTargeting("s3", ads_targeting["s3"]);
                }
                if (typeof ads_targeting["pid"] !== "undefined") {
                    googletag.pubads().setTargeting("pid", ads_targeting["pid"]);
                }
                if (typeof ads_targeting["type"] !== "undefined") {
                    googletag.pubads().setTargeting("type", ads_targeting["type"]);
                }
                if (typeof ads_targeting["topic"] !== "undefined") {
                    googletag.pubads().setTargeting("topic", ads_targeting["topic"]);
                }
                if (typeof ads_targeting["galleryid"] !== "undefined") {
                    googletag.pubads().setTargeting("galleryid", ads_targeting["galleryid"]);
                }
                if (document.location.search.slice(1) === "test=on") {
                    googletag.pubads().setTargeting("test", "on");
                }

            });



            window.addEventListener('scroll', this.processElements);
            window.addEventListener('load', this.processElements);



            window.addEventListener("scroll", function() {
                var l = document.getElementById("dfp-ad-top_728x90");
                var top = l.getBoundingClientRect().top;
                var bottom = document.getElementById("dfp-ad-right1_300x250").getBoundingClientRect().top;

                var leaderboard_height = l.getBoundingClientRect().height;

                var page_height = document.getElementsByTagName("html")[0].offsetHeight;
                if (window.scrollY < bottom) {

                    if (leaderboard_height == 90) {
                        l.classList.add("fixed");
                        l.classList.add("fixed-90");
                    }
                    if (leaderboard_height == 250) {
                        l.classList.add("fixed");
                        l.classList.add("fixed-250");
                    }
                    window.setTimeout(function() {
                        l.classList.add("close");

                        l.classList.remove("fixed-90");
                        l.classList.remove("fixed-250");
                    }, 6000);

                    if (window.scrollY == 0) {
                        //  l.classList.add("close");
                        l.classList.remove("fixed");
                        l.classList.remove("fixed-90");
                        l.classList.remove("fixed-250");
                    }
                }


            });


            var position = window.scrollY;
            window.addEventListener("scroll", function() {
                /* catch scroll direction */
                var scroll = window.scrollY;
                var direction = "";
                if (scroll > position) {
                    direction = "down"
                } else {
                    direction = "up";
                }
                position = scroll;

                var ad1 = document.getElementById("dfp-ad-right1_300x250");
                var ad2 = document.getElementById("dfp-ad-right2_300x250");

                var ad1_top = ad1.getBoundingClientRect().top;
                var ad2_top = ad2.getBoundingClientRect().top;


                var leaderboard = document.getElementById("dfp-ad-top_728x90");
                var leaderboard_height = leaderboard.getBoundingClientRect().height;
                var header = document.getElementById("header");
                var header_height = header.getBoundingClientRect().height;


                var anchorTopPos = 0;
                if (leaderboard.getBoundingClientRect().top > 0) {
                    anchorTopPos = anchorTopPos + leaderboard_height;
                }
                if (header_height === 83) {
                    anchorTopPos = anchorTopPos + 83;
                }

                if (ad1_top < 250 && ad1_top >= 0 && direction == "down") {
                    if (document.getElementById("top-ad").classList.contains("nh") && leaderboard.getBoundingClientRect().height !== 1) {
                        var topValue = 82 + parseInt(leaderboard_height);
                        ad1.setAttribute("style", "position:fixed;top:" + topValue + "px;z-index:99999;background:#fff;padding-top:20px;padding-bottom:20px")
                    } else if (!document.getElementById("top-ad").classList.contains("nh") && leaderboard.getBoundingClientRect().height !== 1) {
                        ad1.setAttribute("style", "position:fixed;top:" + leaderboard_height + "px;z-index:99999;background:#fff;padding-top:20px;padding-bottom:20px")
                    } else if (header_height == 82) {
                        ad1.setAttribute("style", "position:fixed;top:82px;z-index:99999;background:#fff;padding-top:20px;padding-bottom:20px")
                    } else {
                        ad1.setAttribute("style", "position:fixed;top:0px;z-index:99999;background:#fff;padding-top:20px;padding-bottom:20px")
                    }
                    ad2.setAttribute("style", "");
                }
                if (ad2_top < 250 && ad2_top >= 0 && direction == "down") {
                    // if (leaderboard.getBoundingClientRect().bottom !== 1) {
                    //     ad2.setAttribute("style", "position:fixed;top:" + leaderboard_height + "px;z-index:99999;background:#fff;padding-top:20px;padding-bottom:20px")
                    // } 
                    if (document.getElementById("top-ad").classList.contains("nh") && leaderboard.getBoundingClientRect().height !== 1) {
                        var topValue = 82 + parseInt(leaderboard_height);
                        ad2.setAttribute("style", "position:fixed;top:" + topValue + "px;z-index:99999;background:#fff;padding-top:20px;padding-bottom:20px")
                    } else if (!document.getElementById("top-ad").classList.contains("nh") && leaderboard.getBoundingClientRect().height !== 1) {

                        ad2.setAttribute("style", "position:fixed;top:" + leaderboard_height + "px;z-index:99999;background:#fff;padding-top:20px;padding-bottom:20px")
                    } else if (header_height === 82) {
                        ad2.setAttribute("style", "position:fixed;top:82px;z-index:99999;background:#fff;padding-top:20px;padding-bottom:20px")
                    } else {
                        ad2.setAttribute("style", "position:fixed;top:0px;z-index:99999;background:#fff;padding-top:20px;padding-bottom:20px")
                    }
                    ad1.setAttribute("style", "");
                }
                if ((ad2.getBoundingClientRect().bottom + 25) > document.getElementById("footer").getBoundingClientRect().top) {
                    ad2.setAttribute("style", "");
                }
                if (window.scrollY < 50) {
                    ad1.setAttribute("style", "");
                    ad2.setAttribute("style", "");
                }
            });



            window.addEventListener('scroll', function() {
                if (document.querySelector("#top-ad.nh") !== null) {
                    var h = document.querySelector("#top-ad.nh").getBoundingClientRect().height;
                    if (h > 90) {
                        document.querySelector(".page-wrapper").setAttribute("style", "margin-top:380px");
                    }

                }
            });

        },
        processElements: function() {


            Object.keys(ami.mensfitness.ads.slots).forEach(function(key) {

                var el = document.getElementById(key);
                if (ami.mensfitness.ads.elementInViewport(el)) {
                    googletag.display(key);

                    delete ami.mensfitness.ads.slots[key];

                }
            });
        },
        addSlot: function(adObject) {
            var lazyload = adObject.lazyload;
            var targeting = adObject.targeting;
            googletag.cmd.push(function() {


                ami.mensfitness.ads.slots[adObject.idSelector] = googletag.defineSlot(adObject.adUnit, adObject.sizes, adObject.idSelector).addService(googletag.pubads());

                for (var i = 0, len = targeting.length; i < len; i++) {
                    var target = targeting[i];
                    ami.mensfitness.ads.slots[adObject.idSelector].setTargeting(target[0], target[1]);
                }


                if (lazyload !== "true") {


                    googletag.display(adObject.idSelector);
                    delete ami.mensfitness.ads.slots[adObject.idSelector];
                }


            });


        },
        addOOPSlot: function(adObject) {

            googletag.cmd.push(function() {

                ami.mensfitness.ads.slots[adObject.idSelector] = googletag.defineOutOfPageSlot(adObject.adUnit, adObject.idSelector).addService(googletag.pubads());
                var targeting = adObject.targeting;

                for (var i = 0, len = targeting.length; i < len; i++) {
                    var target = targeting[i];
                    ami.mensfitness.ads.slots[adObject.idSelector].setTargeting(target[0], target[1]);
                }
                googletag.display(adObject.idSelector);

                delete ami.mensfitness.ads.slots[adObject.idSelector];

            });



        }
    }
})();
ami.mensfitness.ads.initialize();

var adUnit;
if (ads_targeting["s2"]) {
    adUnit = "/" + ads_targeting["s1"] + "/" + ads_targeting["s2"];
} else {
    adUnit = "/" + ads_targeting["s1"];
}

if (document.documentElement.clientWidth >= 768) {
    ami.mensfitness.ads.addOOPSlot({
        slotName: "interstitial",
        adUnit: "/4216/mensfitness" + adUnit,
        idSelector: "dfp-ad-interstitial",
        targeting: [

            ["pos", "interstitial"]
        ]
    });
    ami.mensfitness.ads.addOOPSlot({
        slotName: "wallpaper",
        adUnit: "/4216/mensfitness" + adUnit,
        idSelector: "dfp-ad-wallpaper",
        targeting: [

            ["pos", "wallpaper"]
        ]
    });
    ami.mensfitness.ads.addSlot({
        slotName: "top_728x90",
        adUnit: "/4216/mensfitness" + adUnit,
        sizes: [
            [728, 90],
            [970, 66],
            [970, 90],
            [970, 250]
        ],
        idSelector: "dfp-ad-top_728x90",
        targeting: [

            ["pos", "top"]
        ],
        lazyload: "false"
    });

    ami.mensfitness.ads.addSlot({
        slotName: "right1_300x250",
        adUnit: "/4216/mensfitness" + adUnit,
        sizes: [
            [300, 250],
            [300, 251],
            [300, 600],
            [300, 1050]
        ],
        lazyload: "false",
        idSelector: "dfp-ad-right1_300x250",
        targeting: [

            ["pos", "right1"]
        ]
    });

    ami.mensfitness.ads.addSlot({
        slotName: "right2_300x250",
        adUnit: "/4216/mensfitness" + adUnit,
        sizes: [
            [300, 250],
            [300, 252]
        ],
        idSelector: "dfp-ad-right2_300x250",
        lazyload: "true",
        targeting: [

            ["pos", "right2"]
        ]
    });


}




if (document.documentElement.clientWidth < 768) {
    ami.mensfitness.ads.addSlot({
        slotName: "mobile_top",
        adUnit: "/4216/mob.mensfitness" + adUnit,
        sizes: [
            [320, 50],
            [300, 50],
            [300, 100]
        ],
        idSelector: "dfp-ad-mobile_top",
        lazyload: "false",
        targeting: [

            ["pos", "mobile_top"]

        ]
    });

    ami.mensfitness.ads.addSlot({
        slotName: "mobile_bottom",
        adUnit: "/4216/mob.mensfitness" + adUnit,
        sizes: [
            [300, 50],
            [320, 50],
            [300, 100]
        ],
        idSelector: "dfp-ad-mobile_bottom",
        lazyload: "false",
        targeting: [

            ["pos", "mobile_bottom"]
        ]
    });

    ami.mensfitness.ads.addOOPSlot({
        slotName: "mobile_interstitial",
        adUnit: "/4216/mob.mensfitness" + adUnit,
        idSelector: "dfp-ad-mobile_interstitial",
        targeting: [

            ["pos", "mobile_interstitial"]
        ]
    });

}