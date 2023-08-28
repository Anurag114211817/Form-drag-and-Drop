import { FormEvent, MouseEvent, useState } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import CustomButton from "./Components/CustomButton";
import CustomInput from "./Components/CustomInput";
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addField, setData } from "./features/form/form-slice";
import { Result } from "./Components/Result";

function App() {
  const data = useAppSelector((state) => state.form.formData);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [lastCord, setLastCord] =   useState({x: 0, y: 0})

  const handleDrag = (e: MouseEvent<HTMLElement>) => {
    if (!e.clientX && !e.clientY) {
      if (lastCord.y > window.innerHeight/4 && lastCord.x > window.innerWidth/4 &&
      lastCord.y < (window.innerHeight/4)*3 && lastCord.x < (window.innerWidth/4)*3) {
        dispatch(addField());
      }
      setVisible(false);
      return;
    }
    setLastCord({x: e.clientX, y: e.clientY});
    setVisible(true);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <Container fluid className="py-3" style={{maxHeight: '100svh'}}>
      {
      visible &&
        <span className="position-absolute">
          <span>ADD NEW SECTION</span>
        </span>
      }
      <Row>
        <Col md={6}>
          <Card className="shadow" >
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <h3>Form</h3>
                <h6 className="gap-2 d-flex flex-wrap">
                {
                  data.map((_, idx) => {
                    return <CustomButton key={`btn_21_${idx}`} value={`Section ${idx+1}`} icon={false} />;
                  })
                }
                <CustomButton draggable onDrag={handleDrag} value="ADD" onClick={()=>{dispatch(addField())}} />
                </h6>
                <hr />
                {
                  data.map((ele, idx) => {
                    return (
                      <Row key={`sec_123_${idx}`} className="mt-3">
                        <div className="h6">{`Section ${idx+1}`}</div>
                        {
                          Object.keys(ele).map((name, id)=> <Col md={6}><CustomInput key={`input-${id}`} name={name} value={ele[name]} onChange={(e) => dispatch(setData({idx, name, value: e.target.value}))}/></Col>)
                        }
                      </Row>
                    )
                  })
                }
                <CustomButton type="submit" value="Submit" icon={false}/>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Result />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
