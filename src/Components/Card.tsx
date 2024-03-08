import { CardPropsInterface } from "../interfaces/CardItem.interface";

export function Card(item: CardPropsInterface) {
  return (
    <div className="card  bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="h-2/3 space-y-2 flex flex-col">
          <h2 className="card-title">{item.product}</h2>
          <div>
            <span className="font-semibold">Артикул:</span>
            <span>{item.id}</span>
            <div>
              {item.brand != null ? (
                <span>
                  <span className="font-semibold">Бренд:</span> {item.brand}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="card-actions items-center justify-end mt-5">
          <div className="stat-value text-3xl">₽{item.price}</div>
          <button className="btn btn-primary">Купить</button>
        </div>
      </div>
    </div>
  );
}
