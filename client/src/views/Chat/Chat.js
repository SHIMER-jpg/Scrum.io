import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage, getMessages } from "../../redux/Chat/actions";

export function Chat() {
  const projectId = useSelector((state) => state.managerView.project._id);
  const userId = useSelector((state) => state.app.loggedUser._id);
  const chatMap = useSelector((state) => state.chatInfo.messages);

  console.log(projectId);

  const dispatch = useDispatch();

  const [messages, setMessages] = useState("");
  const [change, setChange] = useState("");

  useEffect(() => {
    dispatch(getMessages(projectId));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createMessage(userId, projectId, messages));
  }

  function buttonChange(count = 0) {
    count = count + 1;
    setChange(count);
  }
  return (
    <div>
      {chatMap !== undefined && chatMap.length !== 0
        ? chatMap.map((message, i) => {
            return <div key={i}> {message.content} </div>;
          })
        : []}
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input onChange={(e) => setMessages(e.target.value)} />
          <button
            onClick={() => {
              buttonChange();
            }}
            type="submit "
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
