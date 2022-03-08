import { Communities } from '../../collections/communities';
import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';

//In the following parameter, I will use the {} to only get the specific property I want, this is called object destructuring
export default function SelectCommunity({ onChange }) {
  // the following code is subscribing the client in the Publication, in order to receive dynamic data from that
  const options = [];

  // the following statement is an object destructuring again
  const { communities, isLoading } = useTracker(() => {
    const noDataAvailable = { communities: [] };

    //Creating the subscription targetting the communities publication
    const handler = Meteor.subscribe('communities');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    //the method find() serves as a query, in this case it returns everything inside the collection
    // fetch converts the value returned to a javascript object
    const communities = Communities.find().fetch();

    return { communities };
  });

  useEffect(() => {
    communities &&
      communities.map((community, i) => {
        //the spread in this case
        options[i] = { value: community._id, label: community.name };
      });
  }, [communities]);

  return (
    <div>
      {' '}
      {/*the following expression checks if the data has already been retrieved  */}
      {!isLoading ? (
        <>
          {/*The onChange event will call the function 'handleSelectedCommunity' passed from the component App.js*/}
          <Select
            onChange={v => {
              onChange(v.value);
            }}
            options={options}
            placeholder="Select an option..."
          />
        </>
      ) : (
        <div className="lds-dual-ring"> </div>
      )}
    </div>
  );
}
