// Interfaces
import {
  getItemsInterface,
  getIdsInterface,
  getIdsResponseInterface,
  getItemsResponseInterface,
  getFilteredIdsInterface,
} from "./interfaces/Requests.interface";
import "./App.css";
import { Md5 } from "ts-md5";
import { useEffect, useRef, useState } from "react";
import { Card } from "./Components/Card";
import { Header } from "./Components/Header";
import { Carousel } from "./Components/Carousel";
import { SkeletonCard } from "./Components/SkeletonCard";
import { itemInterface } from "./interfaces/CardItem.interface";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredIds, setFilteredIds] = useState<string[]>([]);
  const [filteredState, setFilteredState] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<itemInterface[]>([]);
  const [filterNotFound, setFilterNotFound] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const productFilterInput = useRef<HTMLInputElement>(null);
  const priceFilterInput = useRef<HTMLInputElement>(null);
  const brandFilterInput = useRef<HTMLInputElement>(null);

  function checkMonthOrDay(num: number): string {
    if (num < 10) return `0${num}`;
    return num.toString();
  }

  function getUTCDate(): string {
    const today = new Date();
    return (
      today.getUTCFullYear().toString() +
      checkMonthOrDay(today.getUTCMonth() + 1) +
      checkMonthOrDay(today.getUTCDate())
    );
  }

  function getHashedToken(): string {
    const token: string = import.meta.env.VITE_API_KEY + "_" + getUTCDate();
    return Md5.hashStr(token);
  }

  function deleteDublicatedIds(ids: getIdsResponseInterface) {
    const uniquedIds: string[] = [];
    ids.result.map((id: string) => {
      if (!uniquedIds.includes(id)) uniquedIds.push(id);
    });

    setFilteredIds(uniquedIds);
  }

  function deleteDublicatedItems(items: getItemsResponseInterface) {
    let uniquedItems = [];

    uniquedItems = items.result.reduce(
      (Items: itemInterface[], currentItem: itemInterface) => {
        // Проверяем, есть ли уже объект с таким id в массиве uniquedItems
        let existingItem = Items.find(
          (item: itemInterface) => item.id === currentItem.id
        );
        // Если объекта с таким id еще нет в массиве, добавляем его
        if (!existingItem) {
          Items.push(currentItem);
        }
        return Items;
      },
      []
    );

    setFilteredItems(uniquedItems);
    setLoading(false);
  }

  async function getIds(params: getIdsInterface) {
    await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": getHashedToken(),
      },
      body: JSON.stringify({
        action: "get_ids",
        params: { offset: params.offset, limit: params.limits },
      }),
    })
      .then((response) => {
        if (response.status != 200) {
          return getIds(params);
        }
        return response.json();
      })
      .then((jsonData) => {
        deleteDublicatedIds(jsonData);
      });
  }

  async function getItems(params: getItemsInterface) {
    await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": getHashedToken(),
      },
      body: JSON.stringify({
        action: "get_items",
        params: { ids: params.ids },
      }),
    })
      .then((response) => {
        if (response.status != 200) {
          return getItems(params);
        }
        return response.json();
      })
      .then((jsonData) => deleteDublicatedItems(jsonData));
  }

  async function getFilteredIds(params: getFilteredIdsInterface) {
    let requestParams: getFilteredIdsInterface = {};
    if (params.product) requestParams.product = params.product;
    if (params.brand) requestParams.brand = params.brand;
    if (params.price) requestParams.price = params.price;
    await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": getHashedToken(),
      },
      body: JSON.stringify({
        action: "filter",
        params: requestParams,
      }),
    })
      .then((response) => {
        if (response.status != 200) {
          return getFilteredIds(params);
        }
        return response.json();
      })
      .then((data) => {
        setLoading(true);
        if (data.result.length != 0) {
          console.log(data.result.length);
          setFilteredState(true);
          setFilterNotFound(false);
          deleteDublicatedIds(data);
        } else {
          setFilterNotFound(true);
        }
      });
  }

  useEffect(() => {
    getIds({ offset: 50 * pageNumber, limits: 50 });
  }, []);

  useEffect(() => {
    // костыль чтобы при инициализации стейта не выполнялся запрос
    if (filteredIds.length != 0) {
      getItems({ ids: filteredIds });
    }
  }, [filteredIds]);

  function checkPage(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    let input = event.target as HTMLInputElement;
    let eventPageNumber = Number(input.id.split("-")[1]);
    if (pageNumber != eventPageNumber) {
      setPageNumber(eventPageNumber);
      setLoading(true);
      getIds({ offset: 50 * pageNumber, limits: 50 });
    }
  }

  return (
    <>
      <Header />
      <Carousel />
      <div className=" px-10 lg:px-20 bg-base-200   ">
        <h1 className="text-5xl pt-2 mb-10 text-center lg:text-start">
          Список товаров
        </h1>

        <div className="flex flex-col items-center ">
          <div className="flex flex-col-reverse lg:flex-row lg:space-x-5">
            {!filterNotFound ? (
              <>
                <div className="grid lg:grid-cols-4 gap-5">
                  {!loading ? (
                    <>
                      {filteredItems.map((item) => {
                        return (
                          <Card
                            key={item.id}
                            id={item.id}
                            brand={item.brand}
                            price={item.price}
                            product={item.product}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {Array.from({ length: 20 }, (_, index) => {
                        return <SkeletonCard key={index} />;
                      })}
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="hero  lg:w-full lg:mr-96 bg-base-200">
                <div className="hero-content text-center">
                  <div className="lg:w-full">
                    <h1 className="text-5xl font-bold">
                      {"Ничего не найдено :("}
                    </h1>
                    <p className="py-6">
                      Сожалем что так произошло, попробуйте поменять ваши фильры
                    </p>
                    <button
                      onClick={() => {
                        getIds({ limits: 50 });
                        setLoading(true);
                        setFilterNotFound(false);
                        setFilteredState(false);
                      }}
                      className="btn btn-primary w-full"
                    >
                      Отменить фильтры
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col justify-center items-center h-full lg:w-1/2 mb-5 ">
              <span className="text-4xl pt-2 mb-2 text-center lg:text-start">
                Фильтр
              </span>
              <div className="flex flex-col items-center justify-center space-y-2">
                <label className="input w-full input-bordered flex items-center gap-2">
                  Название:
                  <input
                    type="text"
                    ref={productFilterInput}
                    className="grow"
                  />
                </label>
                <label className="input w-full input-bordered flex items-center gap-2">
                  Бренд:
                  <input type="text" ref={brandFilterInput} className="grow" />
                </label>
                <label className="input w-full input-bordered flex items-center gap-2">
                  Цена:
                  <input type="text" ref={priceFilterInput} className="grow" />
                </label>
                <button
                  onClick={() => {
                    getFilteredIds({
                      brand: brandFilterInput.current?.value,
                      product: productFilterInput.current?.value,
                      price: Number(priceFilterInput.current?.value),
                    });
                  }}
                  className="btn btn-primary w-full"
                >
                  Фильтровать
                </button>
                {filteredState ? (
                  <button
                    onClick={() => {
                      getIds({ limits: 50 });
                      setLoading(true);
                      setFilteredState(false);
                    }}
                    className="btn btn-primary w-full"
                  >
                    Отменить фильтры
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          {!filteredState ? (
            <div className="join my-5">
              <input
                id="page-0"
                onClick={(event) => {
                  checkPage(event);
                }}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label="1"
                defaultChecked
              />
              <input
                id="page-1"
                onClick={(event) => {
                  checkPage(event);
                }}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label="2"
              />
              <input
                id="page-2"
                onClick={(event) => {
                  checkPage(event);
                }}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label="3"
              />
              <input
                id="page-3"
                onClick={(event) => {
                  checkPage(event);
                }}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label="4"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
