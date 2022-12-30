import { hightlightKeywords } from './config'

export const isItemHighlighted = (item: string): boolean => {
    return hightlightKeywords.some((keyword) =>
        item.toLowerCase().includes(keyword)
    )
}

export const getPriceFromString = (str: string) => {
    const priceRegex = /(\d+,\d+)\€/
    const price = priceRegex.exec(str)
    return price ? price[0] : ''
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
