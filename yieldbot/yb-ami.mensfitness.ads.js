var ami = ami || {};
ami.mensfitness = ami.mensfitness || {};
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
var ybotq = ybotq || [];
var adUnit;


var gpt_targeting = {};

if (ads_targeting["s2"]) {
    adUnit = "/" + ads_targeting["s1"] + "/" + ads_targeting["s2"];
} else {
    adUnit = "/" + ads_targeting["s1"];
}

var food = new pubfood();


food.addSlot({
       name: '4216/mensfitness'+adUnit + "/728x90",
       sizes: [
            [728, 90],
            [970, 66],
            [970, 90],
            [970, 250]
       ],
       elementId: 'dfp-ad-top_728x90',
       bidProviders: ["yieldbot"]
});


 googletag.cmd.push(function() {
    googletag.defineSlot('/4216/mensfitness'+adUnit, 
      [
            [300, 250],
            [300, 251],
            [300, 600],
            [300, 1050]      
      ], 
      'dfp-ad-right1_300x250').addService(googletag.pubads());
    // googletag.pubads().enableSingleRequest();
    // googletag.enableServices();
  });


// food.addSlot({
//        name: '4216/mensfitness'+adUnit + "/right1",
//        sizes: [
//             [300, 250],
//             [300, 251],
//             [300, 600],
//             [300, 1050]
//        ],
//        elementId: 'dfp-ad-right1_300x250',
//        bidProviders: ["yieldbot"]
// });

food.addSlot({
       name: '4216/mensfitness'+adUnit + "/right2",
       sizes: [
            [300, 250],
            [300, 252]
       ],
       elementId: 'dfp-ad-right2_300x250',
       bidProviders: ["yieldbot"]
});





food.addBidProvider({
   name: 'yieldbot',
   libUri: '//cdn.yldbt.com/js/yieldbot.intent.js',
   slotParams: {
    "dfp-ad-interstitial":"interstitial",
    "dfp-ad-wallpaper":"wallpaper",
    "dfp-ad-top_728x90": "top_728x90",
    // "dfp-ad-right1_300x250":"right1_300x250",
    "dfp-ad-right2_300x250":"right2_300x250",
    "dfp-ad-mobile_top":"mobile_top",
    "dfp-ad-mobile_bottom":"mobile_bottom",
    "dfp-ad-mobile_interstitia":"mobile_interstitial"
    },
   init: function(slots, pushBid, done) {
       var slotMap = {};
       var slotParams = this.slotParams;

       ybotq.push(function() {
        if(document.documentElement.clientWidth >= 768){
          yieldbot.pub('4534');
        }else{
          yieldbot.pub('0651');
        };
        for (var k = 0; k < slots.length; k++) {
                     var slot = slots[k];
                     var ybslot = slotParams[slot.name];

                     yieldbot.defineSlot(ybslot, {
                       sizes: slot.sizes
                     });
                     slotMap[ybslot] = slot.name;
                   }
               yieldbot.enableAsync();
               yieldbot.go();
             });
             ybotq.push(function() {
                var pageCriteria = yieldbot.getPageCriteria();
                var pageSlots = pageCriteria !== '' ? pageCriteria.split(',') : [];

               for (var i = 0; i < pageSlots.length; i++) {
                 var slotInfo = pageSlots[i].split(':');
                 var slot = slotInfo[0];
                 var size = slotInfo[1];
                 var bid = 0;
                 if (slotInfo.length && slotInfo[2]) {
                   bid = parseFloat(slotInfo[2], 10);
                 }
                 var sizes = size.split('x');
                 sizes[0] = parseInt(sizes[0], 10);
                 sizes[1] = parseInt(sizes[1], 10);
                 // submit my bid...
                 var bidObject = {
                   slot: slotMap[slot] || 'undefined_slot',
                   value: bid,
                   sizes: sizes,
                   targeting: {
                     ybot_size: size,
                     ybot_cpm: bid,
                     ybot_ad: 'y',
                     ybot_slot: slot
                   }
                 };
                 pushBid(bidObject);
               }
           done();
       });
   },
   refresh: function(slots, pushBid, done) {
   }
});


food.setAuctionProvider({
     name: 'Google',
     libUri: '//www.googletagservices.com/tag/js/gpt.js',
     targeting: {
      "dfp-ad-interstitial": [["pos","interstitial"]],
      "dfp-ad-wallpaper": [["pos","wallpaper"]],
      "dfp-ad-top_728x90": [["pos","top"]],
      // "dfp-ad-right1_300x250": [["pos","right1"]],
      "dfp-ad-right2_300x250": [["pos","right2"]],
      "dfp-ad-mobile_top": [["pos","mobile_top"]],
      "dfp-ad-mobile_box": [["pos","mobile_box"]],
      "dfp-ad-mobile_bottom": [["pos","mobile_bottom"]],
      "dfp-ad-mobile_interstitial": [["pos","mobile_interstitial"]]
     },
     init: function(targeting, done) {
          var gpt_targeting = this.targeting;
           googletag.cmd.push(function() {
             var i;
             for (i = 0; i < targeting.length; i++) {
               var slot = targeting[i];
               var gptslot = googletag.defineSlot(slot.name, slot.sizes, slot.elementId)
                 .addService(googletag.pubads());

                 for(i = 0; i < gpt_targeting[slot.elementId].length; i++){
                  pair = gpt_targeting[slot.elementId][i];
                  key = pair[0];
                  value = pair[1];
                 gptslot.setTargeting(key,value);

                 }
             }
           });
           googletag.cmd.push(function() {
             googletag.enableServices();
             done();
           });
       },
       refresh: function(targeting, done) {


       }
   });


food.timeout(1500);
food.observe(function(ev) {
  console.log(ev);
});
food.start();

food.observe('AUCTION_POST_RUN', function() {
  googletag.cmd.push(function() {
    googletag.display('dfp-ad-top_728x90');
    googletag.display('dfp-ad-right1_300x250');
    googletag.display('dfp-ad-right2_300x250');
  });
});

