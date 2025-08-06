import {create} from 'zustand';

type WebsiteAction = {
    setWebsite: (url: WebsiteState['url']) => void
}

type WebsiteState = {
    url : string
    actions: WebsiteAction
}

const websiteStore = create<WebsiteState>((set) => ({
    url: "",
    actions: {
        setWebsite: (url) => set(() => ({url}))
    }
}))

export const getWebsiteUrl = () => websiteStore((state) => state.url);
export const useWebsiteAction = () => websiteStore((state) => state.actions);