import { Menu, Day, Food } from '../types'

const MenuCard = ({ menu }: { menu: Menu }) => {
    console.log(menu)
    return (
        <div key={menu.id} className="card bg-red-100">
            <h2 className="card-header">{menu.restaurant}</h2>
            <div className="card-body">
                <p className="text-content2">{menu.address}</p>
                {menu.menu.map((item: Day) => (
                    <div>
                        <p>{item.date}</p>
                        {item.items.map((food: Food) => (
                            <p>
                                {food.name}{' '}
                                <span className="badge badge-outline-success badge-xs">
                                    {food.price}
                                </span>
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenuCard
