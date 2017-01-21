// In the configuration, we declare the layout, 404, loading,
// navbar, and footer templates.
Router.configure({
  layoutTemplate: 'masterLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    navbar: {to: 'navbar'},
    footer: {to: 'footer'},
  }
});

// In the map, we set our routes.
Router.map(function () {
  // Index Route
  this.route('landing', {
    path: '/',
    template: 'landing',
    layoutTemplate: 'masterLayout',
  });


this.route('user-profile', {
    path: '/user-profile',
    template: 'userdashboard',
    layoutTemplate: 'homepageLayout',
  });


  this.route('pollList', {
    path: '/pollList',
    template: 'pollList',
    layoutTemplate: 'homepageLayout',
    waitOn: function(){
      var collections = [
        Meteor.subscribe('polls')
      ];
      return collections;
    }
  });

  this.route('poll', {
    path: '/poll/:_id',
    template: 'poll',
    layoutTemplate: 'masterLayout',
    waitOn: function () {   
      console.log(this.params._id) 
      return Meteor.subscribe('polls', this.params._id);
    },
  });

  this.route('loading', {
    path: 'loading',
    template: 'loading',
    layoutTemplate: 'masterLayout'
  });
  // User Mgmt Route
  this.route('usermgmt', {
    path: '/usermgmt',
    template: 'userManagement',
    layoutTemplate: 'masterLayout',
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
          this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
          this.redirect('/');
      }
      this.next();
    },
    loadingTemplate: 'loading'
  });
  // Sign In Route
  AccountsTemplates.configureRoute('signIn', {
      name: 'signin',
      path: '/sign-in',
      template: 'signIn',
      layoutTemplate: 'masterLayout',
      redirect: '/',
  });
  // Sign Up Route
  AccountsTemplates.configureRoute('signUp', {
      name: 'sign-up',
      path: '/sign-up',
      template: 'signUp',
      layoutTemplate: 'homepageLayout',
      redirect: '/pollList',
  });
  // Sign Out Route
  this.route('/sign-out', function(){
      Meteor.logout(function(err) {
          if (err) alert('There was a problem logging you out.');
          Router.go("/");
          $(".button-collapse").sideNav("hide");
      });
      Router.go("/");
  });
});
