import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/profile-1.jpg";
import dayjs from "dayjs";
import './ChatMessage.css';

// console.log(UserProfileImage);

function ChatMessage({ message, sender, time }) {
  // const message = props.message;
  // const sender = props.sender;

  // Shortcut property
  // const {message, sender} = props;

  /*
  if(sender === "robot") {
    return (
      <div>
        <img src='robot.png' width='50'/>
        {message}
    </div>
    );
  }
  */
 // Exercise 5i: add a time under each message
  // const time = dayjs().valueOf();
  
  return (
    // && Guard Operator = this was a shortcut for if-statement in JSX
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
        <p className="chat-message-time">
          {dayjs(time).format("h:mma")}
        </p>
      </div>

      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
  
}

export default ChatMessage;
