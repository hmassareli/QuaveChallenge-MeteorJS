import React, { useEffect, useState } from 'react';
import { People } from '../../collections/people';
import { useTracker } from 'meteor/react-meteor-data';

export default function EventCounters({ selectedCommunity }) {
  const [peopleByCompanyMessage, setPeopleByCompanyMessage] = useState('');
  const [peoplePresent, setPeoplePresent] = useState([]);
  const [teste, setTeste] = useState([]);
  let peopleByCompany = {};

  const { people, isLoading } = useTracker(() => {
    const noDataAvailable = { people: [] };

    //Creating the subscription targetting the communities publication
    const handler = Meteor.subscribe('people');
    const people = People.find({ communityId: selectedCommunity }).fetch();
    setTeste(people);
    return [people,!handler.ready()]
    /*
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    if (handler.ready()) {
      const a = People.find({ communityId: selectedCommunity }).fetch();
      console.log(a);
      
      return a;
    }
    //the method find() serves as a query, in this case it returns everything inside the collection
    // fetch converts the value returned to a javascript object

    */
  },[selectedCommunity]);
  
  function getPeoplePresent(person) {
    return person.checkin && !person.checkout;
  }

  function countPeoplePresent() {
    if (teste) {
      setPeoplePresent(teste.filter(getPeoplePresent));
      if (peoplePresent) {
        peoplePresent.forEach(function(person) {
          if (peopleByCompany[person.companyName] == undefined) {
            peopleByCompany[person.companyName] = 0;
          }
          peopleByCompany[person.companyName]++;
        });
      }
    }
  }

  function messengerPeoplePresent() {
    const propertyNames = Object.getOwnPropertyNames(peopleByCompany);

    if (peopleByCompany) {
      var index = 0;
      let message = '';
      for (var person in peopleByCompany) {
        propertyNames[index] == 'undefined'
          ? (message += 'Unreported companies(' + peopleByCompany[person] + ')')
          : (message += `${propertyNames[index]}(${peopleByCompany[person]})`);

        if (index < Object.keys(peopleByCompany).length - 1) {
          message += ', ';
        }
        console.log(peopleByCompanyMessage);

        index++;
      }
      setPeopleByCompanyMessage(message);
    }
  }
  useEffect(() => {
    countPeoplePresent();
    messengerPeoplePresent();
  }, [teste]);

  return (
    <div>
      <p><strong>People in the event right now:</strong> {peoplePresent.length}</p>
      {/* Filter who are checked-in and count it*/}
      <p><strong>People by company in the event right now:</strong> {peopleByCompanyMessage}</p>
      <p>
        <strong>People not checked-in: </strong>{' '}
        {teste ? teste.filter(person => !person.checkin).length : 0}
      </p>
    </div>
  );
}
