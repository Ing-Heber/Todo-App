import { TodoForm, TodoEmpty, TodoList } from "./components/index";
import { useTodos } from "./hooks/useTodos";
import 'animate.css'

export const TodoApp = () => {
    const {
        todos,
        onAddTodo,
        onToggleTodo,
        onDeleteTodo,
        emptyTodos,
        allTodos,
        completedTodos,
        pendingTodos,
    } = useTodos();

    const [filterTodosByStatus, setFilterTodosByStatus] = useState(showTypes.all);
    const completed = `${completedTodos} of ${allTodos}`;
    const filteredTodos = useMemo(() => getFilteredTodosByStatus(filterTodosByStatus, todos), [filterTodosByStatus, todos]);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="main__header">
        <div className="container">
          <h1 className='text-center'><span className='color-blue'>To</span><span className='color-purple'>do</span></h1>
          <TodoForm onNewTodo={onAddTodo} />
        </div>
      </div>

      <div className="main__body">
        <div className="container">

          <div className="d-flex justify-content-between">

            <div className="d-flex count__container">
              <h4 className="color-blue">Todos</h4>
              <p className="count small">{allTodos}</p>
            </div>

            <div className="d-flex count__container">
              <h4 className="color-purple">Completed</h4>
              <p className="count small">
                {completedTodos}
              </p>
            </div>
          </div>

                    {(emptyTodos || !filteredTodos.length)
                        ? <TodoEmpty pendingTodos={pendingTodos}/>
                        : <TodoList todos={filteredTodos} toggleTodo={onToggleTodo} deleteTodo={onDeleteTodo}/>
                    }
                </div>
            </div>
        </div>
    )
}