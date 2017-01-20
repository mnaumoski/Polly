
   Template.landing.onRendered(function(){
//       $('.parallax').parallax('enable');
//     });
       this.$('.slider').slider({full_width: true});
       // Pause slider
$('.slider').slider('pause');
// Start slider
$('.slider').slider('start');
// Next slide
$('.slider').slider('next');
// Previous slide
$('.slider').slider('prev');
   });


// if (Meteor.isServer) {
//    Meteor.startup(function () {
//        // code to run on server at startup
//         $(document).ready(function(){
//       $('.parallax').parallax('enable');
//     });
//    });
// }