import React, { useEffect, useState, useRef } from "react";
import "./index.css"


function App() {
  const [feedback, setFeedback] = useState([]);// imamo sve feedback
  const [text, setText] = useState();// imamo samo jedan feedback current one
  const [editID, setEditID] = useState(null)
  const textArea = useRef()

  useEffect(() => {
    fetchFeedback();
  }, []);
  const fetchFeedback = async () => {
    const response = await fetch(
      "http://localhost:5000/feedback?_sort=id&_order=desc"
    );
    const data = await response.json();
    setFeedback(data);
  };  
  const displayFeedback = () => {
    return feedback.map((el, index) => {
      return (
        <div key={index} className="feedback_card">
          <p>ID: {el.id}</p>
          <p>Rate: {el.text}</p>
          <p>Rating: {el.rating}</p>
          <p onClick={() => { deleteRating(el.id) }}>X</p>
          <button type="button" onClick={() => { updateRating( index) }}>edit</button>
        </div>
      );
    });
  }; 
  const deleteRating = async (id) => { 
    if (window.confirm("Are you sure you want to delete this review")) {
      let deletedArray = feedback.filter((el) => el.id !== id)
      setFeedback(deletedArray)
      displayFeedback()
      const response = await fetch(`http://localhost:5000/feedback/${id}`, {
      method: "DELETE",
    });
    
   }
  }
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const addFeedback = async () => {
    const newFeedback = {
      text: text
    };
    const response = await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeedback),
    });
    const data = await response.json();
    setFeedback([data, ...feedback]);
  };
  const updateRating = async (index) => { 
    textArea.current.value = feedback[index].text
    setEditID(feedback[index].id)
  }
  const saveEdited =async () => { 
    const response = await fetch(`http://localhost:5000/feedback/${editID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textArea.current.value }),
    });
    fetchFeedback()
    setEditID(null)
  }

  return (
    <div>
    
      {feedback ? displayFeedback() : <p>Error 404</p>}
      <form>
        <textarea
          ref={textArea}
          name="addtext"
          id=""
          cols="30"
          rows="10"
          onChange={handleTextChange}
        ></textarea>
        { editID ? null : <button type="reset" onClick={addFeedback}>Submit</button>  }
        { editID && <button type="reset" onClick={saveEdited}>Save Edit</button>}
      </form>
    </div>
  );
}

export default App;
