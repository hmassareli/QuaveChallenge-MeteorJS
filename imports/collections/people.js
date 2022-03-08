import { Mongo } from 'meteor/mongo';

export const People = new Mongo.Collection('people');

People.allow({
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
