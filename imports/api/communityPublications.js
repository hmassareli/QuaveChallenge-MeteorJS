import { Communities } from '../collections/communities';

// The publish method sets what the client will be able to access with the subscription
Meteor.publish('communities', function() {
  //returns everything inside the Communities Collection
  return Communities.find();
});
