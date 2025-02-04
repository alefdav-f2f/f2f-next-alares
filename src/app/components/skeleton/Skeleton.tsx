import React from 'react'

export default function Skeleton({ className }: any) {
    return (
        <div className={`skeleton ${className}`}>
            <div className={`skeleton_content ${className}`}></div>
        </div>
    )
}
