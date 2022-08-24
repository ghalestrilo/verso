import create from "zustand";

type Selection = { row: number | null ; column: number | null; }
type Direction = 'down' | 'up' | 'left' | 'right'

type State = {
  selection: Selection,
  moveSelection: (direction: Direction) => void
};

const directions = {
  up: [-1,0],
  down: [1,0],
  left: [0,-1],
  right: [0,1],
}


export const useControlState = create<State>((set) => ({
  selection: {
    row: 0,
    column: 0
  },
  moveSelection: (direction: Direction) => set(state => {
    const [rowUpdate, columnUpdate] = directions[direction] || [0,0]
    return {
      ...state,
      selection: {
        row: state.selection.row + rowUpdate,
        column: state.selection.column + columnUpdate
      }
    }
  })
}));
