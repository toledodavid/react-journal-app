import React from 'react';



const JournalEntry = () => {
  return(
    <div className="journal__entry pointer">
      <div className="journal__entry-picture" style={{backgroundSize: 'cover', backgroundImage: 'url(https://static.addtoany.com/images/dracaena-cinnabari.jpg)'}}></div>

      <div className="journal__entry-body">
        <p className="jounral__entry-title">Un nuevo dia</p>
        <p className="jounral__entry-content">asdas dakedoqe oqwiednmoqwed dikwdnwd wdkwd wdwmdwowd.</p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>25</h4>
      </div>
    </div>
  );
}



export default JournalEntry;