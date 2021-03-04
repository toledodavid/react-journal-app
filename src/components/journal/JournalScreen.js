import React from 'react';
import Sidebar from './Sidebar';
//import NothingSelected from './NothingSelected';
import NoteScreen from '../notes/NoteScreen';



const JournalScreen = () => {
  return(
    <div className="journal__main-content">
      <Sidebar />

      <main>
        <NoteScreen />

        {/* <NothingSelected /> */}
      </main>
    </div>
  );
}


export default JournalScreen;