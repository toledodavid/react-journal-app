import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogoutAction } from '../../actions/authActions';
import { startNewEntryNoteAction } from '../../actions/notesActions';
import JournalEntries from './JournalEntries';


const Sidebar = () => {

  const dispatch = useDispatch();

  const {name} = useSelector(state => state.auth);


  const handleLogout = () => {
    dispatch(startLogoutAction());
  }

  const handleAddNewEntry = () => {
    dispatch(startNewEntryNoteAction());
  }

  return(
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> {name}</span>
        </h3>

        <button className="btn" onClick={handleLogout}>logout</button>
      </div>

      <div className="journal__new-entry" onClick={handleAddNewEntry}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
}


export default Sidebar;