import React, { useState } from "react";

const MailSender: React.FC = () => {

  const [status,setStatus] = useState("");

  const submitForm = (ev : any) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus("SUCCESS");
      } else {
        setStatus("ERROR");
      }
    };
    xhr.send(data);
    console.log(form);
  }

  return (
    <div>
      <form
        onSubmit={submitForm}
        action="https://formspree.io/mwkkdlpb"
        method="POST"
      >
        <label>Email:</label>
        <input type="email" name="email" value="dfgdfg455@yopmail.com"/>
        <label>Message:</label>
        <input type="text" name="message" value="Rappel de réunion"/>
        {status === "SUCCESS" ? <p>Thanks!</p> : <button>Submit</button>}
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </form>
    </div>
  );
};

export default MailSender;
