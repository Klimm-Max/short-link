import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

Accounts.validateNewUser((user) => {
  const emails = user.emails[0].address;

  // this try-catch is necessary because the SimpleSchema is throwing a generic Exception
  // the generic Ex. Message will not appear in our App, because we are working with Meteor.Error
  try {
    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({ email });
  } catch(e) {
    throw new Meteor.Error(400, e.message);
  }

  return true;
});