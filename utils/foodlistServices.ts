import { menuSchema } from "../types"

export const getUnicafeMenu = async () => {
  const response = await fetch(
    `https://unicafe.fi/wp-json/swiss/v1/restaurants/?lang=fi`
  )

  const menu = await response.json()
  return menuSchema.parse(menu)
}
