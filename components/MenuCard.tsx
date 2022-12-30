import { Menu, Day, Food } from '../types'

const MenuCard = ({ menu }: { menu: Menu }) => {
    return (
        <div key={menu.id} className="card bg-red-100">
            <h2 className="card-header bg-gradient-to-r from-yellow-600 to-red-800 bg-clip-text font-mono text-3xl font-extrabold uppercase text-transparent">
                {menu.restaurant}
            </h2>
            <div className="card-body">
                <p className="mt-0 mb-2 font-mono lowercase">{menu.address}</p>
                {menu.menu.map((item: Day) => (
                    <div className="mt-2 mb-2">
                        <p className="font-mono font-bold uppercase">
                            {item.date}
                        </p>
                        <ul className="ml-8 list-disc">
                            {item.items.map((food: Food) => (
                                <li className="leading-relaxed">
                                    {food.name}{' '}
                                    <span className="badge badge-outline-success badge-xs">
                                        {food.price}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenuCard
