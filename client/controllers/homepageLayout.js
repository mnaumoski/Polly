Template.homepageLayout.rendered = function () {
  $(".button-collapse").sideNav();
  $("select").material_select();
};

Template.homepageLayout.events({
    "click ul#mobile-nav.side-nav li a": function(event){
      $(".button-collapse").sideNav("hide");
    }
});

