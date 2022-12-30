export const unicafeRestaurants = ['kaivopiha', 'sockom', 'porthania']
export const compassGroupRestaurants = ['3134', '3294']

export const compassGroupRestaurantsInfo: {
    [key: string]: {
        name: string
        key: string
        address: string
        website: string
    }
} = {
    3134: {
        name: 'Ravintola Pääposti',
        key: 'paaposti',
        address: 'Mannerheiminaukio 1 B, 00100 Helsinki',
        website:
            'https://www.compass-group.fi/ravintolat-ja-ruokalistat/foodco/kaupungit/helsinki/paaposti/'
    },
    3294: {
        name: 'Ravintola WTC',
        key: 'wtc',
        address: 'Aleksanterinkatu 17, 00100 Helsinki',
        website:
            'https://www.compass-group.fi/ravintolat-ja-ruokalistat/foodco/kaupungit/helsinki/wtc/'
    }
}

export const hightlightKeywords = [
    'uunilohi',
    'makkara',
    'lihapulla',
    'wieninleike'
]
