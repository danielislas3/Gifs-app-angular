import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeachGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = 'vEaPTgb1Us1xqjEeRe5Tob3Nbw2FXaDQ';
  private _historial: string[] = [];

  public resultados : Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscaGifs(termino: string) {
    termino = termino.trim().toLowerCase();
    if (!this._historial.includes(termino)) {
      this._historial.unshift(termino);
      this._historial = this._historial.slice(0, 10);
      this.http
        .get<SeachGifsResponse>(
          `https://api.giphy.com/v1/gifs/search?q=${termino}&api_key=${this._apiKey}&limit=10&lang=es`
        )
        .subscribe((res) => {
          console.log(res.data);
          this.resultados = res.data;
        });
    }
  }
}
