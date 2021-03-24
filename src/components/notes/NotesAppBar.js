import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNoteAction } from '../../actions/notesActions';



const NotesAppBar = () => {

  const dispatch = useDispatch();
  const {active:note} = useSelector(state => state.notes);

  const handleSave = () => {
    dispatch(startSaveNoteAction(note));
  }

  return(
    <div className="notes__appbar">
      <span>28 de Agosto 2020</span>

      <div>
        <button className="btn">Picture</button>
        <button className="btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}



export default NotesAppBar;