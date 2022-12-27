import { z } from "zod"

export interface Menu {
  id: number
  title: string
  slug: string
  menu: Food[]
}

export interface Food {
  name: string
  date: string
  price: number // in cents
}

export const menuSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    menuData: z.object({
      menus: z.array(
        z.object({
          date: z.string(),
          data: z.array(
            z.object({
              name: z.string(),
              price: z.object({
                value: z.object({
                  normal: z.string(),
                }),
              }),
            })
          ),
        })
      ),
    }),
  })
)
