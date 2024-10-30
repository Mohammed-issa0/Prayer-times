import React, { useEffect, useState } from "react";
import Prayer from "./component/Prayer";
function App() {
  const [prayer, setPrayer] = useState(null);
  const [city, setCity] = useState("aleppo");
  const cities = [
    { name: "حلب", value: "Aleppo" },
    { name: "دمشق", value: "damascus" },
    { name: "ادلب", value: "idleb" },
    { name: "اللاذقية", value: "latakia" },
    { name: "طرطوس", value: "Tartous" },
    { name: "حماة", value: "hama" },
    { name: "حمص", value: "homs" },
    { name: "الرقة", value: "Raqqa" },
    { name: "الحسكة", value: "Hasakah" },
    { name: "دير الزور", value: "Deir Ezzor" },
  ];

  async function fetchApiData() {
    const url = `https://api.aladhan.com/v1/timingsByCity/29-10-2024?city=${city}&country=syria`;
    try {
      const res = await fetch(url);
      const apiData = await res.json();
      console.log("DATA\n", apiData);
      setPrayer(apiData.data.timings);
    } catch (err) {
      console.log(err.message);
    }
  }

  // async function timePrayer(){
  //   const url = "https://api.aladhan.com/v1/timingsByCity/29-10-2024?city=aleppo&country=syria";
  //   try{
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     console.log(data)
  //   }carch(err){
  //     console.log(err.message)
  //   }
  // }

  useEffect(() => {
    fetchApiData();
    console.log("time :", prayer);
  }, [prayer]);
  console.log(city);

  const formatTime = (time) => {
    if (!time) return "00:00";

    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينة</h3>

            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option value={city.value} key={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>3-9-2024</h4>
          </div>
        </div>
        <hr />
        <div className="prayers">
          <Prayer name="الفجر :" time={formatTime(prayer?.Fajr)} />
          <Prayer name="الشروق :" time={formatTime(prayer?.Sunrise)} />
          <Prayer name="الظهر :" time={formatTime(prayer?.Dhuhr)} />
          <Prayer name="العصر :" time={formatTime(prayer?.Asr)} />
          <Prayer name="المغرب :" time={formatTime(prayer?.Maghrib)} />
          <Prayer name="العشاء :" time={formatTime(prayer?.Isha)} />
        </div>
      </div>
    </section>
  );
}

export default App;
