import React from "react";
import styled from "styled-components";
import {WeatherIcons} from "../App";

export const WeatherInfoIcons = {
    sunset: "./icons/temp.svg",
    sunrise: "./icons/temp.svg",
    humidity: "./icons/humidity.svg",
    wind: "./icons/wind.svg",
    min_temp: "./icons/mintemp.svg",
    max_temp: "./icons/mintemp.svg"
};
const Location = styled.span`
  margin: 18px auto;
  margin-top: 10px;
  text-transform: capitalize;
  font-size: 30px;
  color:  #0a0a7a;
  font-weight: bold;
  font-family: Georgia;
  font-style: italic;
`;
const Condition = styled.span`
  margin: 10px auto;
  text-transform: capitalize;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
`;
const WeatherInfoLabel = styled.span`
  margin: 20px 10px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 85%;
  font-weight: bold;
  font-size: 18px;
`;
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 3px auto;
`;
const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 20px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const WeatherInfoComponent = (props) => {
    const {name, value} = props;
    return (
        <InfoContainer>
            <InfoIcon src={WeatherInfoIcons[name]}/>
            <InfoLabel>
                {value}
                <span>{name}</span>
            </InfoLabel>
        </InfoContainer>
    );
};
const WeatherComponent = (props) => {
    const {weather} = props;
    const isDay = weather?.weather[0].icon?.includes('d')
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }
    return (
        <>
            <WeatherContainer>
                <Condition>
                    <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
                    {`  |  ${weather?.weather[0].description}`}
                </Condition>
                <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]}/>
            </WeatherContainer>
            <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>

            <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
            <WeatherInfoContainer>
                <WeatherInfoComponent name={"min_temp"} value={`${Math.floor(weather?.main?.temp_min-273)}°C`}/>
                <WeatherInfoComponent name={"max_temp"} value={`${Math.floor(weather?.main?.temp_max-273)}°C`}/>
                <WeatherInfoComponent name={"sunrise"} value={`${getTime(weather?.sys["sunrise"])}`}/>
                <WeatherInfoComponent name={"sunset"} value={`${getTime(weather?.sys["sunset"])}`}/>
                <WeatherInfoComponent name={"humidity"} value={weather?.main?.humidity}/>
                <WeatherInfoComponent name={"wind"} value={weather?.wind?.speed}/>
            </WeatherInfoContainer>
        </>
    );
};

export default WeatherComponent;