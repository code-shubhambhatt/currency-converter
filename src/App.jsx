import React, { useState } from "react";
import useCurrnecyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";

function App() {
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrnecyInfo(from);
  const options = Object.keys(currencyInfo);
  const BackgroundImage = "https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg";

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('${BackgroundImage}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white">
        <h1 className="text-2xl font-bold text-center mb-6">Currency Converter</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-6"
        >
          {/* From Input */}
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            onAmountChange={(val) => setAmount(val)}
            selectCurrency={from}
          />

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-full shadow-md"
            >
              ⬌ Swap
            </button>
          </div>

          {/* To Input */}
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold"
          >
            Convert {`${from.toUpperCase()} → ${to.toUpperCase()}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
