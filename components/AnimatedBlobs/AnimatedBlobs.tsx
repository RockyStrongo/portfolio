'use client'
import "./AnimatedBlobs.css"
import { useEffect, useState } from "react";

interface AnimationProps {
    isBlurred: boolean
}

export function AnimatedBlobs({isBlurred}: AnimationProps) {

    return (
        <div className={`animation-container ${isBlurred && `blurred` }`}>
            <div className="animation-item"  ></div>
            <div className="animation-item"  ></div>
            <div className="animation-item"  ></div>
        </div>
    )
}