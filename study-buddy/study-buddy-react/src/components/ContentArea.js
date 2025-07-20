import React from 'react';
import QuizGenerator from './QuizGenerator';
import HomeworkHelper from './HomeworkHelper';
import MockTestGenerator from './MockTestGenerator';
import './ContentArea.css';

const ContentArea = ({ selectedFeature }) => {
    const renderFeature = () => {
        switch (selectedFeature) {
            case 'quiz':
                return <QuizGenerator />;
            case 'homework':
                return <HomeworkHelper />;
            case 'test':
                return <MockTestGenerator />;
            default:
                return <div className="placeholder">Please select a feature to get started.</div>;
        }
    };

    return (
        <main className="content-area">
            {renderFeature()}
        </main>
    );
};

export default ContentArea;
