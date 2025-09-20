import "./notification.css";

const Notification = ({ message, classNames }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={`notification ${classNames ? classNames : ""}`}>
      {message}
    </div>
  );
};

export default Notification;
