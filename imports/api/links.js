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
  /* This method will insert a new DB Object by the given URL. It also checks, if
  there is a currently logged in user and validates the given URL for a URL Schema. */
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
  /* This method will set the Object attribute 'visible' of a link to the called param.
  it checks if the user ownes the given linkId. If so, the DB Model will be updated.   */
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // validate calling params
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });

    Links.update({ 
      _id, userId: this.userId
    }, {
      $set: {visible}                 
    });
  }

});
