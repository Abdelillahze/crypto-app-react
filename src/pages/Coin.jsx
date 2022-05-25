import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoin } from "../features/coin/coinSlice";
import { useParams } from "react-router-dom";
import LineChart from "../components/LineChart";
import { hexToRgba } from "../helpers/convertHexToRgba";
import { convertNumber } from "../helpers/convertNumber";
import { fetchCoinHistory } from "../features/coin/historySlice";
import { months } from "../helpers/months";

function Coin() {
  const coin = useSelector((state) => state.coin);
  const history = useSelector((state) => state.history);
  const coinID = useParams().coin;
  const dispatch = useDispatch();
  const [timePeriod, setTimePeriod] = useState("1h");

  useEffect(() => {
    dispatch(fetchCoin(coinID));
    dispatch(fetchCoinHistory([coinID, timePeriod]));
    console.log(timePeriod);
  }, [timePeriod]);

  return (
    <>
      <section className="coin">
        <div className="container">
          {coin.loading && <h1>Loading...</h1>}
          {!coin.loading && coin.error ? <h1>error: {coin.error}</h1> : null}
          {/* {!coin.loading && console.log(coin.coin)} */}
          {!history.loading && console.log(history.history)}
          {!coin.loading && coin.coin ? (
            <div className="coin-des">
              <div className="head">
                <h1>
                  {coin.coin.data.coin.name} - {coin.coin.data.coin.symbol}
                </h1>
                <img src={coin.coin.data.coin.iconUrl} alt="" />
              </div>
              <div className="body">
                <select
                  name="time"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                >
                  <option value="1h">1h</option>
                  <option value="3h">3h</option>
                  <option value="12h">12h</option>
                  <option value="24h" selected>
                    24h
                  </option>
                  <option value="7d">7d</option>
                  <option value="30d">30d</option>
                  <option value="1y">1y</option>
                  <option value="3y">3y</option>
                  <option value="5y">5y</option>
                  <option value="all">All</option>
                </select>
                {!history.loading && history.history ? (
                  <LineChart
                    chartData={{
                      labels: history.history.data.history
                        .map((e) => {
                          const date = new Date(e.timestamp * 1000);
                          return `${date.getDay()} ${
                            months[date.getMonth()]
                          }, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} ${
                            date.getHours() > 12 ? "PM" : "AM"
                          }`;
                        })
                        .reverse(),
                      datasets: [
                        {
                          label: `${coin.coin.data.coin.name} price`,
                          data: history.history.data.history
                            .map((e) => e.price)
                            .reverse(),
                          backgroundColor: [
                            hexToRgba(coin.coin.data.coin.color, 0.3),
                          ],
                          pointBackgroundColor: hexToRgba(
                            coin.coin.data.coin.color,
                            1
                          ),
                          fill: true,
                          borderColor: coin.coin.data.coin.color,
                        },
                      ],
                    }}
                  />
                ) : null}
              </div>
              <div className="foot">
                <div className="states">
                  <div className="state">
                    <h2>Price today: </h2>
                    <p>
                      {convertNumber(
                        parseFloat(coin.coin.data.coin.price).toFixed(2)
                      )}
                    </p>
                  </div>
                  <div className="state">
                    <h2>24h change:</h2>
                    <p
                      className={
                        coin.coin.data.coin.change > 0
                          ? `change win`
                          : `change loss`
                      }
                    >
                      {coin.coin.data.coin.change}%
                    </p>
                  </div>
                  <div className="state">
                    <h2>Market Cap: </h2>
                    <p>
                      {convertNumber(
                        parseFloat(coin.coin.data.coin.marketCap).toFixed(2)
                      )}
                    </p>
                  </div>
                  <div className="state">
                    <h2>Price to btc: </h2>
                    <p>
                      {convertNumber(
                        parseFloat(coin.coin.data.coin.btcPrice).toFixed(2)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default Coin;
