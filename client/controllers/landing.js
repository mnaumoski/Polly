if (Meteor.isClient) {
   Template.landing.onRendered(function(){
       $(".parallax").parallax('enable');
   });
}

if (Meteor.isServer) {
   Meteor.startup(function () {
       // code to run on server at startup
        $(document).ready(function(){
      $('.parallax').parallax('enable');
    });
   });
}