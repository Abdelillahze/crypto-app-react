import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../features/coins/cryptoSlice";
import { convertNumber } from "../helpers/convertNumber";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.coins);

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);
  return (
    <section className="coins">
      <div className="container">
        {coin.loading && <h1>Loading...</h1>}
        {!coin.loading && coin.error ? <h1>error: {coin.error}</h1> : null}
        {!coin.loading && coin.coins.data
          ? coin.coins.data.coins.map((e) => {
              return (
                <div key={e.uuid} className="card">
                  <Link to={`/coins/${e.uuid}`}>
                    <div className="head">
                      <h1>
                        {e.symbol} - {e.name}
                      </h1>
                      <img src={e.iconUrl} alt="" />
                    </div>
                    <div className="body">
                      <p>$ {convertNumber(parseInt(e.price))}</p>
                      <p
                        className={e.change > 0 ? `change win` : `change loss`}
                      >
                        {e.change}%
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
}

export default HomePage;
