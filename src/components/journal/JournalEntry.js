import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNoteAction } from '../../actions/notesActions';




const JournalEntry = ({id, title, body, date, url}) => {

  const dispatch = useDispatch();

  const noteDate = moment(date);

  const handleEntryClick = () => {
    dispatch(activeNoteAction(id, {title, body, url, date}));
  }


  return(
    <div className="journal__entry pointer" onClick={handleEntryClick}>
      
      {
        url &&
          (
            <div className="journal__entry-picture"
                style={{backgroundSize: 'cover', backgroundImage: `url(${url})`}}>
            </div>
          )
      }

      <div className="journal__entry-body">
        <p className="jounral__entry-title">{title}</p>
        <p className="jounral__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  );
}



export default JournalEntry;