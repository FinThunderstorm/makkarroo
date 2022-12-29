import { getUnicafeMenu } from "utils/foodlistServices"

const Home = async () => {
  const menu = await getUnicafeMenu()
  return (
    <div>
      <div className="navbar bg-red-600">
        <div className="navbar-start">
          <a className="navbar-item">Makkarroo</a>
        </div>
      </div>
      {menu.map((item) => (
        <div key={item.id} className="card">
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      ))}
    </div>
  )
}

export default Home
