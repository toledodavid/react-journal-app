import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar';


const NoteScreen = () => {

  const {active:note} = useSelector(state => state.notes);
  
  const [formValues, handleInputChange] = useForm(note);

  const {title, body} = formValues;


  return(
    <div className="notes__main-content">

      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          value={title}
          onChange={handleInputChange}
          autoComplete="off"
        />

        <textarea
          placeholder="What happened today?"
          value={body}
          onChange={handleInputChange}
          className="notes__textarea">
        </textarea>

        {
          note.url &&
            (
              <div className="notes__image">
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt="imagen" />
              </div>
            )
        }

      </div>
    </div>
  );
}


export default NoteScreen;