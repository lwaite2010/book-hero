import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
// Layouts
import '../../ui/layouts/BaseLayout/BaseLayout.js';
import '../../ui/layouts/AccountLayout/AccountLayout.js';

// Templates
import '../../ui/pages/not-found/not-found.js';
import '../../ui/components/profile/profile.js';
import '../../ui/components/book-list/book-list.js';
import '../../ui/pages/accounts/accounts.js';
import '../../ui/pages/discover/discover.js';
import '../../ui/pages/feed/feed.js';
import '../../ui/pages/contribute/contribute.js';

var setupUserProfile = function(password, info) {
  info.profile.level = 1;
  info.profile.xp = 0;
  info.profile.list_id = "";
  info.profile.attributes = [
    {
      name : "Intelligence",
      progress : 0,
      level : 0,
    },
    {
      name : "Creativity",
      progress : 0,
      level : 0,
    },
    {
      name : "Imagination",
      progress : 0,
      level : 0,
    },
    {
      name : "Endurance",
      progress : 0,
      level : 0,
    },
    {
      name : "Clairvoyance",
      progress : 0,
      level : 0,
    }
  ]
}

var onChangeNavbar = function() {
  var routeName = FlowRouter.getRouteName().toLowerCase();
  if (routeName == "feed") {
    routeName = "";
  }
  const selector = '.nav a[href="/' + routeName + '"]';
  $('.active').removeClass('active');
  setTimeout(function() {
    $(selector).parent("li").addClass('active');
  },10)
}

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn, onChangeNavbar]);

AccountsTemplates.configure({
  defaultLayout: 'AccountLayout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main',
  preSignUpHook: setupUserProfile,
})

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);

AccountsTemplates.configureRoute('signIn');

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Feed',
  action() {
    BlazeLayout.render('BaseLayout', {left:'profile', main: 'feed', right:'bookList' });
  },
});

FlowRouter.route('/discover', {
  name: 'Discover',
  action() {
    BlazeLayout.render('BaseLayout', {left:'profile', main: 'discover', right:'bookList'});
  }
});

FlowRouter.route('/contribute', {
  name: 'Contribute',
  action() {
    BlazeLayout.render('BaseLayout', {left: 'profile', main: 'contribute', right:'bookList'});
  }
});

FlowRouter.route('/logout', {
  name: "Logout",
  action() {
    AccountsTemplates.logout()
  }
})
