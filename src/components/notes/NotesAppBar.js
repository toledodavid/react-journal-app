import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingImageAction, startSaveNoteAction } from '../../actions/notesActions';



const NotesAppBar = () => {

  const dispatch = useDispatch();
  const {active:note} = useSelector(state => state.notes);

  const handleSave = () => {
    dispatch(startSaveNoteAction(note));
  }

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) { 
      dispatch(startLoadingImageAction(file));
    }
  }

  return(
    <div className="notes__appbar">
      <span>28 de Agosto 2020</span>

      <input id="fileSelector"
            type="file" style={{display: 'none'}}
            name="file"
            onChange={handleFileChange}
      />

      <div>
        <button className="btn" onClick={handlePictureClick} >Picture</button>
        <button className="btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}



export default NotesAppBar;