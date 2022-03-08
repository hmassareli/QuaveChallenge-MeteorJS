import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../imports/infra/initial-data';
import '../imports/api/communityPublications';
import '../imports/api/peoplePublications';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});
