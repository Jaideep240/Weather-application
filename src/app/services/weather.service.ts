// src/app/services/weather.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/';
  private apiKey = 'dab3af44de7d24ae7ff86549334e45bd';

  constructor(private http: HttpClient) {}

  getCurrentWeather(location: string) {
    return this.http.get(`${this.apiUrl}weather?q=${location}&appid=${this.apiKey}`);
  }

  getForecast(location: string) {
    return this.http.get(`${this.apiUrl}forecast?q=${location}&appid=${this.apiKey}`);
  }
}
