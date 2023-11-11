import { Driver } from 'src/modules/driver/interfaces';
import { Color, Soat, Techno, Type } from '..';

export interface Vehicle {
  numero?: string;
  letra?: string;
  cedula?: string;
  placa?: string;
  codigo?: string;
  nro_acreditacion?: string;
  nro_poliza?: string;
  id_color?: string;

  linea: string;
  marca: string;
  conductor?: Driver;
  tecnomecanica?: Techno;
  soat?: Soat;
  tipo_vehiculo?: string;
  color?: string;
}
