'use client'
import "./Animation.css"
import { useEffect, useState } from "react";

interface AnimationProps {
    isBlurred: boolean
}

export function Animation({isBlurred}: AnimationProps) {

    return (
        <div className={`animation-container ${isBlurred && `blurred` }`}>
            <div className="animation-item"  ></div>
            <div className="animation-item"  ></div>
            <div className="animation-item"  ></div>
        </div>
    )
}