import { create } from 'zustand'

export const searchControls = create((set) => ({
    is_open: false,
    search: '',
    open: () => set((state: any) => ({ is_open: true })),
    close: () => set((state: any) => ({ is_open: false })),

    setSearch: (value: string) => set((state: any) => ({ search: value })),
}))