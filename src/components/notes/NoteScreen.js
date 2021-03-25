import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNoteAction, startDeletingNoteAction } from '../../actions/notesActions';
import { useForm } from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar';


const NoteScreen = () => {

  const dispatch = useDispatch();

  const {active:note} = useSelector(state => state.notes);
  
  const [formValues, handleInputChange, reset] = useForm(note);

  const {title, body, id} = formValues;

  const activeNoteId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeNoteId.current) {
      reset(note);
      activeNoteId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNoteAction(formValues.id, {...formValues}));
  }, [formValues, dispatch]);


  const handleDelete = () => {
    dispatch(startDeletingNoteAction(id));
  }


  return(
    <div className="notes__main-content animate__animated animate__fadeIn animate__faster">

      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          name="title"
          value={title}
          onChange={handleInputChange}
          autoComplete="off"
        />

        <textarea
          placeholder="What happened today?"
          name="body"
          value={body}
          onChange={handleInputChange}
          className="notes__textarea">
        </textarea>

        {
          note.url &&
            (
              <div className="notes__image">
                <img src={note.url} alt="imagen" />
              </div>
            )
        }

      </div>

      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
}


export default NoteScreen;