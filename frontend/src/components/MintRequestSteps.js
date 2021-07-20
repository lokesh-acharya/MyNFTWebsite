import React from 'react';

export default function MintRequestSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Sign-In</div>
      <div className={props.step2 ? 'active' : ''}>File1</div>
      <div className={props.step3 ? 'active' : ''}>File2</div>
      <div className={props.step4 ? 'active' : ''}>File3</div>
      <div className={props.step5 ? 'active' : ''}>Send Mint Request</div>
    </div>
  );
}
