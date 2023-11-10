import { Driver } from 'src/modules/driver/interfaces';
import { Color, Soat, Techno, Type } from '.';

export interface Vehicle {
  placa: string;
  linea: string;
  marca: string;
  conductor?: Driver;
  tecnomecanica: Techno;
  soat: Soat;
  tipo_vehiculo: string;
  color: string;
}
