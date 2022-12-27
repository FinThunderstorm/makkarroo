import "@styles/dist.css"
import Providers from "@components/Providers"

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fi" data-theme="night">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
