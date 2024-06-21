import { Col,Container, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import ChatRoom from './components/ChatRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
const[conn,setConnection]=useState();
const[messages,SetMessages]=useState([]);

const joinChatRoom=async(username,chatroom)=>{
  try{
    const conn= new HubConnectionBuilder()
              .withUrl("http://localhost:5183/chat")
              .configureLogging(LogLevel.Information)
              .build();
    // set up handler
    conn.on("JoinSpecificChatRoom",(username,msg)=>{
      console.log("msg: ",msg);
    });

    conn.on("RecieveSpecificMessage",(username,msg)=>{
      SetMessages(messages=>[...messages,{username,msg}]);
    })

    await conn.start();
    await conn.invoke("JoinSpecificChatRoom", {username,chatroom});

    setConnection(conn);
  }catch(e){
    console.log(e);
  }
}

const sendMessage=async(message)=>{
  try{
    await conn.invoke("SendMessage",message);
  }catch(e){
    console.log(e);
  }
}

  return (
    <div>
      <main>
        <Container>
          <Row class='px-5 my-5'>
            <Col sm='12'>
            <h1 className='font-weight-light'>Welcome to thr F1 ChatApp</h1>
            </Col>
          </Row>
          {!conn 
            ?<WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom messages ={messages} sendMessage={sendMessage}></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
