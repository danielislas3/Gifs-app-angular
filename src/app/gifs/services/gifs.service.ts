import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeachGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = 'vEaPTgb1Us1xqjEeRe5Tob3Nbw2FXaDQ';
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscaGifs(termino: string) {
    termino = termino.trim().toLowerCase();

    if (!this._historial.includes(termino)) {
      this._historial.unshift(termino);
      this._historial = this._historial.slice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('offset', '10')
      .set('q', termino);

    this.http
      .get<SeachGifsResponse>(
        `${this._servicioUrl}/search`,{params}
      )
      .subscribe((res: any) => {
        this.resultados = res.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
