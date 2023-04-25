import { HotkeysProvider } from '@blueprintjs/core';
import { Column, Table2, Cell, EditableCell2 } from '@blueprintjs/table';
import React from 'react';
import { useQuery } from 'react-query';
import { controller } from './actionsController';

const ManageTherapists: React.FC = () => {
  const searchQuery = { searchString: '' };
  const { data, isLoading } = useQuery(
    ['therapists', searchQuery],
    async () => {
      return await controller.searchTherapists(searchQuery);
    }
  );

  if (data == null) {
    return <p>Loading...</p>;
  }

  console.log(data);
  const fullNameRenderer = (rowIndex: number) => (
    <EditableCell2 value={data[rowIndex].fullName} />
  );
  const therapyTypeRenderer = (rowIndex: number) => (
    <EditableCell2 value={data[rowIndex].therapyType} />
  );
  const titleRenderer = (rowIndex: number) => (
    <EditableCell2 value={data[rowIndex].title} />
  );
  const addressRenderer = (rowIndex: number) => (
    <EditableCell2 value={data[rowIndex].address} />
  );
  const emailRenderer = (rowIndex: number) => (
    <EditableCell2 value={data[rowIndex].email} />
  );
  const phoneRenderer = (rowIndex: number) => (
    <EditableCell2 value={data[rowIndex].phone} />
  );

  return (
    <div style={{ marginBlock: 24 }}>
      <HotkeysProvider>
        <Table2 numRows={data.length}>
          <Column name="Full Name" cellRenderer={fullNameRenderer} />
          <Column name="Therapy Type" cellRenderer={therapyTypeRenderer} />
          <Column name="Title" cellRenderer={titleRenderer} />
          <Column name="Address" cellRenderer={addressRenderer} />
          <Column name="Email" cellRenderer={emailRenderer} />
          <Column name="Phone" cellRenderer={phoneRenderer} />
        </Table2>
      </HotkeysProvider>
    </div>
  );
};

export default ManageTherapists;
