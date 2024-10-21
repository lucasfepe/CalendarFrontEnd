import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class ImplicitLoginService {

  constructor() { }
  YOUR_CLIENT_KEY: string = 'o4dgqqjng11vagsjrn3ncq288b';
  REDIRECT_URL: string = 'https://calendarfrontend-zx2j.onrender.com/';
  url: string = 'https://secure.meetup.com/oauth2/authorize?' +
    'client_id=' + this.YOUR_CLIENT_KEY +
    '&response_type=token' +
    '&redirect_uri=' + this.REDIRECT_URL;
  public login = async () => {
    try {
      const response = await axios.get(this.url);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

}
