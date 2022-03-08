import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { People } from '../../collections/people';


export default function CheckinButton({ isCheckout, person, setButtonClicked }) {
  const [isAllowedToCheckout, setIsAllowedToCheckout] = useState();
  //console.log(new Date() - person.checkin);
  function getDate() {
    return new Date();
  }
  
  useEffect(() => {
    //the following line checks if the person checkin was done more than 5 seconds ago or not
    thisMoment = getDate();
    if (person.checkin && !person.checkout) {
      if ((thisMoment - person.checkin) / 1000 < 5) {
        setTimeout(function(){setIsAllowedToCheckout(true)}, 5 * 1000);

        
      }
      else{
        setIsAllowedToCheckout(true);
      }
    }
  }, [person.checkin]);

  
  function updateCheckOut() {
    People.update(
      { _id: person._id },
      {
        $set: {
          checkout: getDate(),
        },
      }
    );
  }

  function updateCheckIn() {
    People.update(
      { _id: person._id },
      {
        $set: {
          checkin: getDate(),
        },
      }
    );
  }

  return isCheckout ? (
    <Button
      onClick={()=> {updateCheckOut(); setButtonClicked(person.checkout)}}
      fullWidth
      className="customButton"
      variant="contained"
      color="primary"
      disabled = { !isAllowedToCheckout ?  true : false}
    >
      {`Check-out ${person.firstName} ${person.lastName}`}
    </Button>
  ) : (
    <Button
      onClick={()=> {updateCheckIn(); setButtonClicked(person.checkin)}}
      fullWidth
      className="customButton"
      variant="contained"
      color="primary"
    >
      {`Check-in ${person.firstName} ${person.lastName}`}
    </Button>
  );
}
