import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Home } from './screens/Home'
import { Coach } from './screens/Coach'
import { Add } from './screens/Add'
import { CategoryDetail } from './screens/CategoryDetail'
import { ItemDetail } from './screens/ItemDetail'

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/add" element={<Add />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/item/:itemId" element={<ItemDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
