import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<CaseStudy />} />
            </Routes>
        </Layout>
    );
}

export default App;
