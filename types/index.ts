import { z } from 'zod'
import { randomUUID } from 'crypto'
import { compassGroupRestaurantsInfo } from '@utils/config'
import {
    isItemHighlighted,
    getPriceFromString,
    parseUnicafeDate
} from '@utils/tools'
export interface Menu {
    id: string
    key: string
    restaurant: string
    address: string
    website: string
    menu: Day[]
}

export interface Day {
    key: string
    date: Date
    items: Food[]
}

export interface Food {
    key: string
    name: string
    price: string
    isHighlighted: boolean
}

export const unicafeMenuSchema = z
    .array(
        z.object({
            id: z.number(),
            title: z.string(),
            address: z.string(),
            slug: z.string(),
            permalink: z.string(),
            menuData: z.object({
                menus: z.array(
                    z.object({
                        date: z.string(),
                        data: z.array(
                            z.object({
                                name: z.string(),
                                price: z.object({
                                    value: z.object({
                                        normal: z.string()
                                    })
                                })
                            })
                        )
                    })
                )
            })
        })
    )
    .transform((menus) => {
        return menus.map((menu) => {
            return {
                id: randomUUID(),
                key: menu.slug,
                restaurant: `Unicafe ${menu.title}`,
                address: menu.address,
                website: menu.permalink,
                menu: menu.menuData.menus.map((item) => {
                    return {
                        key: randomUUID(),
                        date: parseUnicafeDate(item.date),
                        items: item.data.map((item) => {
                            return {
                                key: randomUUID(),
                                name: item.name,
                                price: `${item.price.value.normal}€`,
                                isHighlighted: isItemHighlighted(item.name)
                            }
                        })
                    }
                })
            }
        })
    })

export const compassGroupMenuSchema = z
    .object({
        id: z.string(),
        menu: z.object({
            menus: z.array(
                z.object({
                    date: z.string(),
                    menuPackages: z.array(
                        z.object({
                            name: z.string(),
                            price: z.string(),
                            meals: z.array(
                                z.object({
                                    name: z.string()
                                })
                            )
                        })
                    )
                })
            )
        })
    })
    .transform((menu) => {
        return [
            {
                id: randomUUID(),
                key: compassGroupRestaurantsInfo[menu.id].key,
                restaurant: compassGroupRestaurantsInfo[menu.id].name,
                address: compassGroupRestaurantsInfo[menu.id].address,
                website: compassGroupRestaurantsInfo[menu.id].website,
                menu: menu.menu.menus
                    ? menu.menu.menus
                          .map((item) => {
                              return item.menuPackages.map((subitem) => {
                                  const test = {
                                      key: randomUUID(),
                                      date: new Date(item.date),
                                      items: subitem.meals.map((meal) => {
                                          return {
                                              key: randomUUID(),
                                              name: meal.name,
                                              price:
                                                  subitem.price === ''
                                                      ? getPriceFromString(
                                                            subitem.name
                                                        )
                                                      : subitem.price,
                                              isHighlighted: isItemHighlighted(
                                                  meal.name
                                              )
                                          }
                                      })
                                  }
                                  return test
                              })
                          })
                          .flat()
                    : []
            }
        ]
    })
