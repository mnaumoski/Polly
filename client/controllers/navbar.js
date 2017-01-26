Template.navbar.helpers({
  // check if user is an admin
  'isAdminUser': function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }
});

Template.navbar.events({
  'click .sort-collection': function(event){
    var btn = '<i class=\"material-icons right\">arrow_drop_down</i>'
    var sortBy = $(event.target).data('value');    
    var newLabel = (sortBy + " " + btn);
    $('.sort-collection-label').html(newLabel);
    Session.set('sortby', sortBy);    
  },
  'click .sort-order': function(event){
    var btn = '<i class=\"material-icons right\">arrow_drop_down</i>'
    var sortOrder = $(event.target).data('value');    
    var sortOrderText = $(event.target).text();    
    var newLabel = (sortOrderText + " " + btn);
    $('.sort-order-label').html(newLabel);
    Session.set('sortorder', sortOrder);    
  },
  "click #modalTrigger": function(event){
    $('#modal1').openModal({
    });
  },
});

Template.navbar.onRendered(function(){
  $('.collapsible').collapsible();
});