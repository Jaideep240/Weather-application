import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  currentWeather: any;
  forecast: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // Initialize with default location, or call search function
    this.getWeather('New York');
  }

  getWeather(location: string) {
    this.weatherService.getCurrentWeather(location).subscribe((data) => {
      this.currentWeather = data;
      console.log(this.currentWeather);
    });
    this.weatherService.getForecast(location).subscribe((data) => {
      this.forecast = this.processForecastData(data);
      console.log(this.forecast); // Should now contain 5-day data
    });
  }
  processForecastData(data: any) {
    const dailyForecasts:any = [];
    // OpenWeatherMap returns data at 3-hour intervals, so we filter for 1 forecast per day.
    // A common approach is to pick the forecast for around 12:00 PM (noon) each day.
    data.list.forEach((item: any) => {
      if (item.dt_txt.includes('12:00:00')) {
        dailyForecasts.push(item);
      }
    });
  
    return dailyForecasts;
  }
}
