export type Todo = {
  label: string;
  done: boolean;
  id: number;
  createDate: number;
};

export const EmptyTodo: Todo = {
  label: '',
  done: false,
  id: 0,
  createDate: 0,
};
