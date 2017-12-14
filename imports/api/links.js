import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

/* Meteor.userId() is working anywhere but in publish functions.
That's why we have to use this.userId. Since the keyword this is not working 
with es6 arrow functions, we also have to switch to a es5 anonymous func. */
if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({ userId: this.userId});
  });
}
