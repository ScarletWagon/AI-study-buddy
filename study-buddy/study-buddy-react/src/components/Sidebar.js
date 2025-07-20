import React from 'react';
import './Sidebar.css';

const Sidebar = ({ selectedFeature, onSelectFeature }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-title">AI Study Buddy</div>
            <nav className="sidebar-nav">
                <button className={selectedFeature === 'quiz' ? 'active' : ''} onClick={() => onSelectFeature('quiz')}>
                    📝 Generate Quiz
                </button>
                <button className={selectedFeature === 'homework' ? 'active' : ''} onClick={() => onSelectFeature('homework')}>
                    📚 Homework Help
                </button>
                <button className={selectedFeature === 'test' ? 'active' : ''} onClick={() => onSelectFeature('test')}>
                    🧪 Create Mock Test
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
