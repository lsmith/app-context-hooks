import React from 'react';
import './IconX.css';

export default function IconX() {
    return (
        <svg className="icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="20" x2="80" y2="80" />
            <line x1="20" y1="80" x2="80" y2="20" />
        </svg>
    );
}
