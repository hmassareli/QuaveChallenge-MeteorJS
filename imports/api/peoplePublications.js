import { People } from '../collections/people';

// The publish method sets what the client will be able to access with the subscription
Meteor.publish('people', function() {
  //returns everything inside the Communities Collection
  return People.find();
});
