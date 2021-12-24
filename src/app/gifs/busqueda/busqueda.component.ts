import { Component, ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar() {
    console.log('Buscar',);
    const valor = this.txtBuscar.nativeElement.value;
    console.log('valor: ', valor);
    this.txtBuscar.nativeElement.value=''
  }
}
