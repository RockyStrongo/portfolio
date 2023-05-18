'use client'
import "./Animation.css"
import { useEffect, useState } from "react";

export function Animation() {

    const [colorIndex, setColorIndex] = useState(0)

    const colorSchemes = [
        ["#00CFFF", "#FF736C"],
        ["#FFE600", "#00CFFF"],
        ["#f72585", "#7209b7"],
        ["#1B9CFC", "#55E6C1"],
        ["#4b4e6d", "#fc4a1a"],
        ["#d9f2d2", "#89c2a9"],
        ["#54A0FF", "#D399FF"],
        ["#00B4DB", "#0083B0"],
        ["#5F2C82", "#49A09D"],
        ["#FFC8B4", "#FFA07A"],
        ["#F1F1F1", "#333333"]
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((colorIndex) => (colorIndex === 10 ? 0 : colorIndex + 1));
        }, 1000);
      }, []);


    return (
        <div className="animation-container">
            <div className="animation-item" style={{ background: "linear-gradient(to bottom right, " + colorSchemes[colorIndex][0] + ", " + colorSchemes[colorIndex][1] + ")" }} ></div>
            <div className="animation-item" style={{ background: "linear-gradient(to bottom right, " + colorSchemes[colorIndex][0] + ", " + colorSchemes[colorIndex][1] + ")" }} ></div>
            <div className="animation-item" style={{ background: "linear-gradient(to bottom right, " + colorSchemes[colorIndex][0] + ", " + colorSchemes[colorIndex][1] + ")" }} ></div>
        </div>
    )
}