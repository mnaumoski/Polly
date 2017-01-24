Accounts.onCreateUser(function(choices, user) {
  user.leadership = 0;
  return user;
});
