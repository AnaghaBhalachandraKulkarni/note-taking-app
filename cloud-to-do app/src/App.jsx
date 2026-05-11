import { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'

function App() {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [authMode, setAuthMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoadingAuth(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!user) {
      setTasks([])
      return
    }

    const tasksCollection = collection(db, 'users', user.uid, 'tasks')
    const tasksQuery = query(tasksCollection, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const nextTasks = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }))
      setTasks(nextTasks)
    })

    return unsubscribe
  }, [user])

  const handleAuth = async (event) => {
    event.preventDefault()
    setError('')

    try {
      if (authMode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      setEmail('')
      setPassword('')
    } catch (authError) {
      setError(authError.message)
    }
  }

  const handleCreateTask = async (event) => {
    event.preventDefault()
    if (!taskText.trim()) return

    await addDoc(collection(db, 'users', user.uid, 'tasks'), {
      text: taskText.trim(),
      completed: false,
      createdAt: serverTimestamp()
    })
    setTaskText('')
  }

  const startEditTask = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const submitEdit = async (event) => {
    event.preventDefault()
    if (!editText.trim()) return

    await updateDoc(doc(db, 'users', user.uid, 'tasks', editingId), {
      text: editText.trim()
    })
    cancelEdit()
  }

  const toggleCompleted = async (task) => {
    await updateDoc(doc(db, 'users', user.uid, 'tasks', task.id), {
      completed: !task.completed
    })
  }

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, 'users', user.uid, 'tasks', taskId))
  }

  const handleSignOut = async () => {
    await signOut(auth)
  }

  if (loadingAuth) {
    return <div className="app-shell">Loading authentication...</div>
  }

  if (!user) {
    return (
      <div className="app-shell">
        <div className="auth-card">
          <h1>Cloud To-Do</h1>
          <p>Sign up or log in to save your tasks in Firestore.</p>

          <form onSubmit={handleAuth}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </label>

            <button type="submit">{authMode === 'signup' ? 'Create account' : 'Log in'}</button>
          </form>

          {error && <p className="error-message">{error}</p>}

          <div className="auth-switch">
            {authMode === 'signup' ? (
              <>
                <span>Already have an account?</span>
                <button type="button" onClick={() => setAuthMode('login')}>
                  Log in
                </button>
              </>
            ) : (
              <>
                <span>Need an account?</span>
                <button type="button" onClick={() => setAuthMode('signup')}>
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="task-card">
        <header className="task-header">
          <div>
            <h1>My Tasks</h1>
            <p>{user.email}</p>
          </div>
          <button className="ghost-button" onClick={handleSignOut}>
            Sign out
          </button>
        </header>

        <form className="task-form" onSubmit={handleCreateTask}>
          <input
            type="text"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            placeholder="Add a new task"
            required
          />
          <button type="submit">Add</button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks yet. Add one to get started.</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                {editingId === task.id ? (
                  <form className="edit-form" onSubmit={submitEdit}>
                    <input
                      type="text"
                      value={editText}
                      onChange={(event) => setEditText(event.target.value)}
                      required
                    />
                    <div className="edit-actions">
                      <button type="submit">Save</button>
                      <button type="button" className="ghost-button" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="task-main">
                      <button
                        className="complete-toggle"
                        onClick={() => toggleCompleted(task)}
                        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {task.completed ? '✓' : '○'}
                      </button>
                      <span>{task.text}</span>
                    </div>
                    <div className="task-actions">
                      <button onClick={() => startEditTask(task)}>Edit</button>
                      <button className="danger-button" onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
