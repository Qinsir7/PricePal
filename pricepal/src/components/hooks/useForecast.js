import { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const useForecast = () => {
    const [forecastData, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        AWS.config.update({
            region: 'us-west-2',
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        });
        const fetchForecast = async () => {
            setIsLoading(true);
            try {
                const forecast = new AWS.ForecastQueryService({ region: 'us-west-2' });

                let params = {
                    ForecastArn: 'arn:aws:forecast:us-west-2:199602861615:forecast/eth_gasprice_forecast',
                    StartDate: "2023-06-08T00:00:00",
                    EndDate: "2023-06-17T00:00:00",
                    Filters: {
                        item_id: '1'
                    }
                };

                forecast.queryForecast(params, function (err, data) {
                    if (err) {
                        setError(err);
                    } else {
                        setForecastData(data.Forecast.Predictions.p10);
                    }
                    setIsLoading(false);
                });
            } catch (err) {
                setIsLoading(false);
                setError(err);
            }
        };

        fetchForecast();
    }, []);

    return { forecastData, isLoading, error };
};

export default useForecast;
