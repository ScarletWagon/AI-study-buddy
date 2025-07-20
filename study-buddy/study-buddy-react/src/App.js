import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ContentArea from './components/ContentArea';
import Footer from './components/Footer';
import './App.css';

function App() {
    const [selectedFeature, setSelectedFeature] = useState('quiz');

    return (
        <div className="App app-layout">
            <Sidebar selectedFeature={selectedFeature} onSelectFeature={setSelectedFeature} />
            <div className="main-content">
                <Header />
                <ContentArea selectedFeature={selectedFeature} />
                <Footer />
            </div>
        </div>
    );
}

export default App;
