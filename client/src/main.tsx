import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './apps/routes/Routes.tsx'
import './apps/layout/index.css'
import { Provider } from 'react-redux'
import { store } from './apps/redux/Store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
