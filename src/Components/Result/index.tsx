import { Card, Table } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";

export const Result = () => {
  const data = useAppSelector((state) => state.form.formData);
  return (
    <>
      <Card className="shadow">
        <Card.Body>
          <h5>Data: </h5>
          <Table striped>
            <tbody>
              {data.map((ele: Record<string, string>, idx: number) => {
                return (
                  <tr key={`tr_123_${idx}`}>
                    <td>input: {ele.input1}</td>
                    <td>input: {ele.input2}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
