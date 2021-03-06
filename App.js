import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "d3459a00a2e95f592fcf6a12a3c70902";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [temp, setTemp] = useState("");
  const [condition, setCondition] = useState("");

  const getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    setLoading(false);
    setCondition(weather[0].main);
    console.log(weather[0].main);
    setTemp(temp);
  };

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      await getWeather(latitude, longitude);
    } catch (e) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  useEffect(() => {
    getLocation();
  },[]);

  return isLoading ? (
    <Loading />
  ) : (
    <Weather temp={Math.round(temp)} condition={condition} />
  );
};

export default App;

// export default class extends React.Component {
//   state = {
//     isLoading: true,
//   };
//
//   getWeather = async (latitude, longitude) => {
//     const {
//       data: {
//         main: { temp },
//         weather,
//       },
//     } = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//     );
//     this.setState({
//       isLoading: false,
//       condition: weather[0].main,
//       temp,
//     });
//   };
//
//   getLocation = async () => {
//     try {
//       await Location.requestPermissionsAsync();
//       const {
//         coords: { latitude, longitude },
//       } = await Location.getCurrentPositionAsync();
//       this.getWeather(latitude, longitude);
//     } catch (e) {
//       Alert.alert("Can't find you.", "So sad");
//     }
//   };
//
//   componentDidMount() {
//     this.getLocation();
//   }
//
//   render() {
//     const { isLoading, temp, condition } = this.state;
//     return isLoading ? (
//       <Loading />
//     ) : (
//       <Weather temp={Math.round(temp)} condition={condition} />
//     );
//   }
// }
