import { People } from '../../collections/people';
import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { DataGrid } from '@material-ui/data-grid';
import Skeleton from '@material-ui/lab/Skeleton';
import CheckinButton from './CheckinButton';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';

export default function TablePeople({ selectedCommunity , setButtonClicked }) {
  

  const useStyles = makeStyles({
    root: {
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none',
      },
    },
  });
  const classes = useStyles();

  function formatDate(date) {
    return format(date, 'MM/dd/yyyy, HH:mm');
  }
  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      width: 160,
      valueGetter: params =>
        `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(
          params.id,
          'lastName'
        ) || ''}`,
    },
    {
      field: 'companyName',
      headerName: 'Company Name',
      width: 210,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 210,
      editable: false,
    },
    {
      field: 'checkin',
      headerName: 'Check-in Date',
      width: 180,
      editable: false,
      //renderCell allows me to put customized content in the cell
      renderCell: params => {
        const person = people.find(person => person._id == params.id);

        if (person.checkin) {
          return <strong>{formatDate(person.checkin)}</strong>;
        } else {
          return <strong>N/A</strong>;
        }
      },
    },
    {
      field: 'checkout',
      headerName: 'Check-out Date',
      width: 180,
      editable: false,
      renderCell: params => {
        const person = people.find(person => person._id == params.id);
        if (person.checkout) {
          
          return <strong>{formatDate(person.checkout)}</strong>;
        } else {
          return <strong>N/A</strong>;
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 270,
      editable: false,
      renderCell: params => {
        const person = people.find(person => person._id == params.id);

        return (
          !(person.checkin && person.checkout) && (
            <CheckinButton isCheckout={person.checkin} person={person} setButtonClicked={setButtonClicked} />
          )
        );
      },
    },
  ];

  // the following statement is an object destructuring
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
  });

  return (
    <div style={{ height: 500, width: '100%' }}>
      {' '}
      {/*the following expression checks if the data has already been gotten  */}
      {!isLoading ? ( 
        <DataGrid className={classes.root}
          rows={people}
          columns={columns}
          pageSize={10}
          getRowId={r => r._id}
          disableSelectionOnClick
        />
      ) : (
        <Skeleton variant="rect" width="100%" height={400} />
      )}
    </div>
  );
}
