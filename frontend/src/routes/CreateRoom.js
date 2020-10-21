// import React from "react";
// import { v1 as uuid } from "uuid";

// const CreateRoom = props => {
//   function create() {
//     const id = uuid();
//     props.history.push(`/room/${id}`);
//   }

//   return <button onClick={create}> Create Room</button>;
// };

// export default CreateRoom;

import React from "react";
import { v1 as uuid } from "uuid";

const CreateRoom = props => {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }

  return (
    <div>
      <h3>Adda Baji (Video Calling App)</h3>
      <span>👋 🤚 🖐 ✋ 🖖 👌 🤏</span>
      <br></br>
      <hr></hr>
      <button onClick={create}>Create Room 🧑‍💻 </button>
    </div>
  );
};

export default CreateRoom;
