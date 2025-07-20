import React from 'react';
import './FeatureSelection.css';

const FeatureSelection = ({ onSelectFeature }) => {
    return (
        <section className="feature-selection">
            <h2>Choose a feature:</h2>
            <div className="feature-buttons">
                <button onClick={() => onSelectFeature('quiz')}>Generate Quiz</button>
                <button onClick={() => onSelectFeature('homework')}>Homework Help</button>
                <button onClick={() => onSelectFeature('test')}>Create Mock Test</button>
            </div>
        </section>
    );
};

export default FeatureSelection;
