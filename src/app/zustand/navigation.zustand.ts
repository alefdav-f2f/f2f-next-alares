import { create } from 'zustand'

export const navigationZustand = create((set) => ({
    hidden: false,
    hide: () => set(() => ({ hidden: true })),
    show: () => set(() => ({ hidden: false })),
}))