import React from 'react';

function UserInfo(props) {

  return (
  	<div>
      <div>
          <strong>Email ID </strong>  
          <input type="email" name="email" placeholder="example@domain.com" onChange={props.onEmailChanged} value={props.emailId} required/>
      </div>
      <div>
         <input type="submit" onClick={props.onSubmitAnswer} value={"Submit Test"}/>
      
      </div>
    </div>
  );

};

UserInfo.propTypes = {
};

export default UserInfo;
