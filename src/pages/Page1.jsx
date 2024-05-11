import React from "react";
import { Link } from "react-router-dom";

export default function Page1() {
  return (
    <div>
      <Link className="secret-link" to={"/download"}>Secret Link</Link>
      <h1>Consent Form</h1>

      <p>
        You are about to take part in a survey experiment conducted by a master
        student from the University of Paris 1 – Panthéon-Sorbonne. 
        <br />
        <br />
        The data
        related to the choices you make and the answers you give will be
        recorded. All responses will remain strictly anonymous and will only be
        accessible to the experimenter. However, no information will be
        collected which links you personally to the research. 
        <br />
        <br />
        You will not
        receive any form of monetary compensation for your participation, though
        I ask that you participate in the tasks imagining that you will. 
        <br />
        <br />
        If you
        have any questions or requests concerning the experiment, your rights,
        or any other matter, please contact the researcher, Oghenefejiro AGBI,
        at the following address: oghenefejiro.agbi@gmail.com. 
        <br />
        <br />
        You are free to
        participate or not in this experiment. You can also choose to withdraw
        at any time. 
        <br />
        <br />
        By clicking “Next”, you agree to participate in accordance
        with the above framework.
      </p>
      <Link to="/instructions" className="button-link">Next</Link>
    </div>
  );
}
