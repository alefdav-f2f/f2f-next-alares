import { create } from 'zustand'

export const useIsOpen = create((set) => ({
    is_open: false,
    hidden: false,
    active: () => set((state: any) => ({ is_open: !state.is_open })),

    hide: () => set(() => ({ hidden: true })),
    show: () => set(() => ({ hidden: false })),
}))