import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

/* Meteor.userId() is working anywhere but in publish functions.
That's why we have to use this.userId. Since the keyword this is not working 
with es6 arrow functions, we also have to switch to a es5 anonymous func. */
if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({ userId: this.userId});
  });
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your Link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true
    });
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // validate calling params
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });
    new SimpleSchema({
      visible: {
        type: Boolean
      }
    }).validate({ visible });

    Links.update({ _id, userId: this.userId }, {$set: {visible}});
  }

});
