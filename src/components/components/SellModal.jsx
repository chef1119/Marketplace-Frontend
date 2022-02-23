import { useState, React } from "react";
import { format } from 'fecha';
import {Button, Modal, Container, Row, Col} from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {Oval} from "react-loader-spinner";
import 'react-notifications/lib/notifications.css';

function MydModalWithGrid(props) {

  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [utcTimeStamp, setUtcTimeStamp] = useState(0);
  const [dateTime, setDateTime] = useState("");


  const setInitPrice = (event) => {
    setPrice(parseInt(event.target.value));
  }

  const dateChanged = (event) => {
    setDate(format(new Date(event.target.value), 'MMMM, DD, YYYY'));
    setDateTime(format(new Date(event.target.value), 'MMMM, DD, YYYY'));
    let createdUTC  = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
    let difference = Date.parse(new Date())- Date.parse(new Date().toLocaleString("en-US", {timeZone: "Europe/London"}));
    setUtcTimeStamp(Math.floor(Date.parse(event.target.value)/1000));
  }

  const timeChanged = (event) => {
    setDateTime(date + ", " + event.target.value);
  }

  const descriptionChanged = (event) => {
    setDescription(event.target.value);
  }

  const func_save = async () => {
    let modal = document.getElementById("myModal");
    if(price <= 0 || !price) NotificationManager.error("Please input initial price correctly", "Invalid input");
    else if(!date || !dateTime) NotificationManager.error("Please input date and time", "Invalid input");
    else {
      let difference = Date.parse(new Date())- Date.parse(new Date().toLocaleString("en-US", {timeZone: "Europe/London"}));
      let timeStamp = (Date.parse(new Date(dateTime)) + difference)/1000;
      let createdUTC  = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
      let createdTime = format(new Date(createdUTC), 'MMMM,DD,YYYY HH:mm:ss');
      props.onHide(true);
      modal.style.display = "block";
      let successed = await props.wrapper?.placeAuction(props.name, props.tokenid, props.owner, props.uri, timeStamp, price, 1, description, createdTime, dateTime);
      modal.style.display = "none";
      console.log("data =================> ", successed);
      if(successed  == 0)
        NotificationManager.error("Please check all options were correct", "Failed");
      else NotificationManager.success("Congragulations, your NFT is listed on auction", "Confirmed");
      
      
      
      
    }
    
  }

  return (
    <>
    <Modal {...props} className="modal_body" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.name} Auction Setting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <center>
        <Container>
          <Row>
            <Col xs={12} md={12}>
              <Row>
                <span> Initial Price :
                  <input className="amount_input" type="number" onChange={setInitPrice} min={0}></input>
                  <span>  CRACE</span>
                </span>
                
                
              </Row>
              <br></br>
              <Row>
                <span> Time Limit : </span>
                <input className="timeLimit_input" type="date" onInput={dateChanged} required></input>
                <input className="timeLimit_input" type="time" onInput={timeChanged} required></input>
              </Row>
              <br></br>
              <span>Please input date and time in UTC timezone</span>
              <br></br>
              <br></br>
              <Row>
                <span> Add Description </span>
                <textarea className="description_input" onChange={descriptionChanged}></textarea>
              </Row>
            </Col>
          </Row>
        </Container>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn_common btn_modal_save" onClick={func_save}>Place to auction</button>
      </Modal.Footer>
    </Modal>
    <div id="myModal" className="modal-oval">
    <div className="modal-oval-content">
      <Oval className="time-oval">
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          color="red"
          secondaryColor="yellow"
      </Oval>
      <h3>Please wait for a moment</h3>
    </div>
  </div>
  </>
  );
}
// props.onHide
function App(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button className="btn_common" variant="primary" onClick={() => setModalShow(true)}>
        Sell Nft
      </button>

      <MydModalWithGrid 
        show={modalShow} 
        name={props.name} 
        uri={props.uri} 
        tokenid={props.tokenid} 
        owner={props.owner} 
        wrapper={props.wrapper} 
        onHide={() => setModalShow(false)} 
      />
    </>
  );
}

export default App;