import React, { useState } from 'react';
import { TEXTS } from '../infra/constants';
import SelectCommunity from './components/SelectCommunity';
import TablePeople from './components/TablePeople';
import EventCounters from './components/EventCounters';

export const App = () => {
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [buttonClicked, setButtonClicked] = useState();
  function handleSelectCommunity(community) {
    setSelectedCommunity(community);
  }
  return (
    <div>
      <h1>{TEXTS.HOME_TITLE}</h1>
      <SelectCommunity onChange={handleSelectCommunity} />
        <EventCounters selectedCommunity={selectedCommunity} buttonClicked={setButtonClicked} />
      <TablePeople selectedCommunity={selectedCommunity} setButtonClicked={setButtonClicked} />
    </div>
  );
};
