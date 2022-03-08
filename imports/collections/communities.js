import { Mongo } from 'meteor/mongo';

export const Communities = new Mongo.Collection('communities');

Communities.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  },
});
