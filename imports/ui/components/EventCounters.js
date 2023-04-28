import { useTracker } from 'meteor/react-meteor-data';
import React, { useEffect, useState } from 'react';
import { People } from '../../collections/people';

export default function EventCounters({ selectedCommunity, buttonClicked }) {
  function getPeoplePresent(person) {
    return person.checkin && !person.checkout;
  }
  const [peopleByCompanyMessage, setPeopleByCompanyMessage] = useState('');
  const [countPeoplePresent, setCountPeoplePresent] = useState();

  const { people, isLoading } = useTracker(() => {
    const noDataAvailable = { people: [] };

    //Creating the subscription targetting the communities publication
    const handler = Meteor.subscribe('people');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    //the method find() serves as a query, in this case it returns everything inside the collection
    // fetch converts the value returned to a javascript object
    const people = People.find({ communityId: selectedCommunity }).fetch();

    return { people };
  }, [selectedCommunity, buttonClicked]);

  /*useEffect(()=>{
    
    setCountPeoplePresent(people.filter(getPeoplePresent).length) 
    console.log(people.filter(getPeoplePresent), countPeoplePresent);
  },[people]);
*/

  useEffect(() => {
    peopleByCompany = {};

    function getPeoplePresent(person) {
      return person.checkin && !person.checkout;
    }
    const peoplePresent = people.filter(getPeoplePresent); // Returns only the people who are in the event now
    setCountPeoplePresent(peoplePresent.length);

    //to find

    const peopleByCompanyFunctional = peoplePresent.reduce((acc, person) => {
      const companyName = person.companyName ?? 'Unknown Companies';
      return { ...acc, [companyName]: (acc[companyName] || 0) + 1 };
    }, {});

    if (peopleByCompanyFunctional) {
      const peopleByCompText = Object.entries(peopleByCompanyFunctional).reduce(
        (acc, [company, number], index) => {
          return acc + `${index ? `, ` : ``} ${company}: ${number}`;
        },
        ''
      );

      setPeopleByCompanyMessage(peopleByCompText);
    }

    // filter the people in the event from the people list
  }, [people]);

  return (
    <div>
      <p>People in the event right now: {countPeoplePresent}</p>
      {/* Filter who are checked-in and count it*/}
      <p>People by company in the event right now: {peopleByCompanyMessage}</p>
      <p>
        People not checked-in: {people.filter(person => !person.checkin).length}
      </p>
    </div>
  );
}
