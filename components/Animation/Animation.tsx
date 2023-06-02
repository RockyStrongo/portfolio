'use client'
import "./Animation.css"
import { useEffect, useState } from "react";

type AnimationProps = {
    isBlurred: boolean
}

export function Animation({isBlurred}: AnimationProps) {

    return (
        <div className={`animation-container ${isBlurred ? `blurred` : null }`}>
            <div className="animation-item"  ></div>
            <div className="animation-item"  ></div>
            <div className="animation-item"  ></div>
        </div>
    )
}