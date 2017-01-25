Template.cleanLayout.rendered = function () {
  $(".button-collapse").sideNav();
  $("select").material_select();
  $(".dropdown-button").dropdown();
};

Template.cleanLayout.events({
    "click ul#mobile-nav.side-nav li a": function(event){
      $(".button-collapse").sideNav("hide");
    }
});

