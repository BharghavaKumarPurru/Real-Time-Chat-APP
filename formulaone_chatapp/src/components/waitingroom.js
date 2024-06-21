import { useState } from "react";
import { Form,Button,Col,Row } from "react-bootstrap";

const WaitingRoom=({joinChatRoom})=>{
    const[username,setUsername]=useState();
    const[chatroom,setChatroom]=useState();

    return <Form onSubmit={ e =>{
        e.preventDefault();
        joinChatRoom(username,chatroom);
    }}>

    <Row className="px-5 py-5">
        <Col sm={12}>
            <Form.Group>
                <Form.Control placeholder='Username' 
                        onChange={e=>setUsername(e.target.value)}/>
                <Form.Control placeholder='ChatRoom' 
                        onChange={e=>setChatroom(e.target.value)}/>
            </Form.Group>
        </Col>
        <Col sm={12}>
        <hr/>
        <button variant='success' type='submit'>Join</button>
        </Col>

        
    </Row>

    </Form>
}

export default WaitingRoom;