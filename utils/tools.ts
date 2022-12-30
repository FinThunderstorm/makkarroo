import { hightlightKeywords } from './config'

export const isItemHighlighted = (item: string): boolean => {
    return hightlightKeywords.some((keyword) =>
        item.toLowerCase().includes(keyword)
    )
}

export const generateDateArray = (from: Date, to: Date): Date[] => {
    let dateArray = []
    let date = new Date(from)
    while (date <= to) {
        dateArray.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }
    return dateArray
}
