import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";
import {
	Button,
	Card,
	Col,
	Container,
	FloatingLabel,
	Form,
	Row,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { addField, addTodo, moveField } from "./features/form/form-slice";
import { ChangeEvent, useState } from "react";

type sectionType = {
	id: string;
	name: string;
	items: {
		id: string;
		name: string;
	}[];
};

function App() {
	const sections = useAppSelector((state) => state.form.sections);
	const items = useAppSelector((state) => state.form.items);
	const dispatch = useAppDispatch();
	const [input, setInput] = useState("");
	const [disable, setDisable] = useState(true);

	const onButtonClick = (name: string) => {
		if (name === "todo") {
			dispatch(addTodo(input));
		} else {
			dispatch(addField(input));
		}
		setInput("");
		setDisable(true)
	};

	const handleDragAndDrop = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		)
			return;

		console.log(result);

		dispatch(moveField(result));
	};

	return (
		<>
			<Container>
				<Card
					className='m-auto mt-3 shadow border-0'
					style={{ width: "min(90%, 700px)", minHeight: 'calc(100svh - 32px)' }}>
					<Card.Body>
						<div className='h3 text-center lh-sm pb-2'>Drag & Drop</div>
						<Row className='my-3'>
							<Col>
								<FloatingLabel
									controlId='floatingInput'
									label='Enter something...'>
									<Form.Control
										type='text'
										placeholder='Enter something...'
										autoComplete='off'
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											setInput(e.target.value);
											if (e.target.value === "") setDisable(true);
											else setDisable(false);
										}}
										value={input}
										maxLength={70}
									/>
								</FloatingLabel>
							</Col>
							<Col xs={5} className='d-flex justify-content-evenly'>
								<Button
									onClick={() => onButtonClick("section")}
									className='fw-bold px-3'
									disabled={disable}>
									Add Section
								</Button>
								<Button
									onClick={() => onButtonClick("todo")}
									className='fw-bold px-3'
									disabled={disable}>
									Add Todo
								</Button>
							</Col>
						</Row>
						<DragDropContext onDragEnd={handleDragAndDrop}>
							<Droppable droppableId='Items'>
								{(provided) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										className='d-flex gap-2 flex-wrap'>
										{items.map((element, idx) => (
											<Draggable
												draggableId={element.id}
												index={idx}
												key={element.id}>
												{(provided) => (
													<Card
														{...provided.dragHandleProps}
														{...provided.draggableProps}
														ref={provided.innerRef}
														className='shadow-sm'>
														<Card.Body className='p-2'>
															{element.name}
														</Card.Body>
													</Card>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							<Droppable droppableId='Sections' type='group'>
								{(provided) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										className='mt-3'>
										{sections.map((element, idx) => (
											<Draggable
												draggableId={element.id}
												index={idx}
												key={element.id}>
												{(provided) => (
													<Card
														{...provided.dragHandleProps}
														{...provided.draggableProps}
														ref={provided.innerRef}
														className='border-black text-capitalize mt-3 shadow-sm'>
														<Card.Body className="position-relative">
															<Section {...element} />
														</Card.Body>
													</Card>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
}

const Section = ({ name, id, items }: sectionType) => {
	return (
		<Droppable droppableId={id}>
			{(provided) => (
				<div {...provided.droppableProps} ref={provided.innerRef}>
					<div className='h5 bg-white px-2 rounded-pill position-absolute'>{name}</div>
					{items.map((item, index) => (
						<Draggable draggableId={item.id} index={index} key={item.id}>
							{(provided) => (
								<Card
									className='mt-2 p-2 border rounded shadow-sm'
									{...provided.dragHandleProps}
									{...provided.draggableProps}
									ref={provided.innerRef}>
									<div className='fs-6'>{item.name}</div>
								</Card>
							)}
						</Draggable>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default App;
