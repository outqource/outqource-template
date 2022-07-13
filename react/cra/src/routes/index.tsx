import styles from './routes.module.scss'
import TodoList from './TodoList'

const Routes = () => {
  return (
    <div className={styles.app}>
      <TodoList />
    </div>
  )
}

export default Routes
