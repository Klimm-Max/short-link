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

/* The Built-In Meteor Invoke Handler for calling methods anywhere in Code. */
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
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },
  /* This method will set the Object attribute 'visible' of a link to the called param.
  It checks if the user ownes the given link (over ID). If so, the DB Model will be updated.   */
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
  },
  /* This method will take the link ID and increase the visitedCount by 1.
  The lastVisitedAt Field will be filled with the current Date&Time. */
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update({ _id }, 
      {
        $set: { lastVisitedAt: new Date().getTime() },
        $inc: { visitedCount: 1 }
      }
    );
  }

});
