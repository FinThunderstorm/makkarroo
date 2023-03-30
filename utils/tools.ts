import { hightlightKeywords } from './config'

export const isItemHighlighted = (item: string): boolean => {
    return hightlightKeywords.some((keyword) =>
        item.toLowerCase().includes(keyword)
    )
}

export const getPriceFromString = (str: string): string => {
    const priceRegex = /(\d+,\d+)\€/
    const price = priceRegex.exec(str)
    return price ? price[0] : ''
}

export const parseUnicafeDate = (date: string): Date => {
    // TODO: check if year changes and bump it up ( in other words check that date is not in past more than month )
    const [day, month] = date.split(' ')[1].split('.')
    const year = new Date().getFullYear()
    return new Date(year, parseInt(month) - 1, parseInt(day))
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
