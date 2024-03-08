import shopImage1 from "../assets/shop_image1.png";
import shopImage2 from "../assets/shop_image2.png";
import shopImage3 from "../assets/shop_image3.png";
export function Carousel() {
  return (
    <>
      <div className="flex flex-wrap w-full mb-5 justify-center space-x-3">
        <div className="w-4/5 lg:w-2/5 ">
          <div className="carousel rounded-2xl">
            <div id="item1" className="carousel-item w-full ">
              <img src={shopImage1} className="" />
            </div>
            <div id="item2" className="carousel-item w-full ">
              <img src={shopImage2} className="" />
            </div>
            <div id="item3" className="carousel-item w-full ">
              <img src={shopImage3} className="" />
            </div>
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
            <a href="#item1" className="btn btn-xs">
              1
            </a>
            <a href="#item2" className="btn btn-xs">
              2
            </a>
            <a href="#item3" className="btn btn-xs">
              3
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 w-10/12  bg-base-200 rounded-3xl  hero">
          <div className="hero-content">
            <div className="max-w-md flex items-center flex-col">
              <h1 className="font-bold text-lg lg:text-5xl">СЕТЬ МАГАЗИНОВ</h1>
              <p className="py-6 text-center text-xs lg:text-lg">
                Откройте для себя наши тщательно продуманные магазины и студии
                по всей России
              </p>
              <button className="btn btn-primary w-4/7 lg:w-1/2">
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
