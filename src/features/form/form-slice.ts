// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid";

type FormState = {
	items: {
		id: string;
		name: string;
	}[];
	sections: {
		id: string;
		name: string;
		items: {
			id: string;
			name: string;
		}[];
	}[];
};

const initialState: FormState = {
	items: [],
	sections: [],
};

// const initialState1: FormState = {
// 	items: [],
// 	sections: [
// 		{
// 			id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
// 			name: "Walmart",
// 			items: [
// 				{ id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
// 				{ id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
// 			],
// 		},
// 		{
// 			id: "487f68b4-1746-438c-920e-d67b7df46247",
// 			name: "Indigo",
// 			items: [
// 				{
// 					id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
// 					name: "Designing Data Intensive Applications",
// 				},
// 				{ id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
// 			],
// 		},
// 		{
// 			id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
// 			name: "Lowes",
// 			items: [
// 				{ id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
// 				{ id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
// 			],
// 		},
// 	],
// };

const formSlice = createSlice({
	name: "form",
	initialState,
	// initialState: initialState1,
	reducers: {
		addTodo(state, action: PayloadAction<string>) {
			const id = v4();
			state.items.push({ id, name: action.payload });
		},
		addField(state, action: PayloadAction<string>) {
			const id = v4();
			state.sections.push({ id, name: action.payload, items: [] });
		},
		moveField(state, action: PayloadAction<DropResult>) {
			const { source, destination, type } = action.payload;

			if (type === "group") {
				const sourceIndex = source.index;
				const destinationIndex = destination!.index;

				const [removedSection] = state.sections.splice(sourceIndex, 1);
				state.sections.splice(destinationIndex, 0, removedSection);
			} else if (source.droppableId === "Items") {
				const dIdx = state.sections.findIndex(
					(section) => section.id === destination!.droppableId
				);
				const [removedItem] = state.items.splice(source.index, 1);
				state.sections[dIdx].items.splice(destination!.index, 0, removedItem);
			} else if (destination!.droppableId === "Items") {
				const sIdx = state.sections.findIndex(
					(section) => section.id === source.droppableId
				);
				const [removedItem] = state.sections[sIdx].items.splice(
					source.index,
					1
				);
				state.items.splice(destination!.index, 0, removedItem);
			} else {
				const sIdx = state.sections.findIndex(
					(section) => section.id === source.droppableId
				);
				const dIdx = state.sections.findIndex(
					(section) => section.id === destination!.droppableId
				);

				const [removedItem] = state.sections[sIdx].items.splice(
					source.index,
					1
				);
				state.sections[dIdx].items.splice(destination!.index, 0, removedItem);
			}
		},
	},
});

export const { addTodo, addField, moveField } = formSlice.actions;
export default formSlice.reducer;
