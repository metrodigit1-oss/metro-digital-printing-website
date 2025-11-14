import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import About from "./pages/About"
import CreateItem from "./pages/CreateItem.jsx"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Banners from './assets/Banners.png'
import PhotoFrames from './assets/Photo Frame.png'
import BookCovers from './assets/Book Cover.png'
import Stickers from './assets/Stickers.png'
import VisitingCards from './assets/Visiting Card.png'
import Posters from './assets/Posters.png'
import Calender from './assets/Calender.png'
import Brochures from './assets/Brochures.png'
import Admin from "./pages/Admin.jsx"




export default function App() {

  const categoriesData = [
      { id: 1, name: 'Photo Frame', image: PhotoFrames },
      { id: 2, name: 'Visiting Card', image: VisitingCards },
      { id: 3, name: 'Posters', image: Posters },
      { id: 4, name: 'Banners', image: Banners },
      { id: 5, name: 'Calender', image: Calender },
      { id: 6, name: 'Book Cover', image: BookCovers },
      { id: 7, name: 'Stickers', image: Stickers },
      { id: 8, name: 'Brochures', image: Brochures }
    ]

  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home categories={categoriesData}/>} />
    <Route path="/about" element={<About />} />
    <Route path="/admin/24863971" element={<Admin />} />
    <Route path="/admin/24863971/create-item" element={<CreateItem />} />
  </Routes>
  <Footer productCategories={categoriesData} />
  </BrowserRouter>
  
}
