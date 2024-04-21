import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './app/layouts/index.css'
import { router } from './app/routes/Routes.tsx'
import { Provider } from 'react-redux'
import { store } from './app/redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
