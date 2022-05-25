import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../features/coins/cryptoSlice";
import { convertJsToText } from "../helpers/convertJsToText";
import { convertNumber } from "../helpers/convertNumber";

function Home() {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.coins);

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  return (
    <section className="home">
      <div className="container">
        <h1>Global Crypto State</h1>
        <div className="states">
          {coin.loading && <h1>Loading...</h1>}
          {!coin.loading && coin.error ? <h1>error: {coin.error}</h1> : null}
          {!coin.loading && coin.coins.data
            ? Object.keys(coin.coins.data.stats).map((key, i) => (
                <div key={i} className="state">
                  <h3>{convertJsToText(key)}</h3>
                  <p>{convertNumber(+coin.coins.data.stats[key])}</p>
                </div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}

export default Home;
