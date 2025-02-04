import { create } from 'zustand'

export const hasTV = create((set) => ({
    has_tv: false,
    active: () => set((state: any) => ({ has_tv: true })),
    inactive: () => set((state: any) => ({ has_tv: false })),
}))