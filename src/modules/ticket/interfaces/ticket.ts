import { Comune } from './comune';
import { Vehicle } from '../../vehicle/interfaces/';

export interface Ticket {
  letra?: string;
  costo_inf: number;
  velocidad: string;
  longitud: number;
  latitud: number;
  fecha: Date;
  cod_infraccion: string;
  comuna: Comune;
  vehicle: Vehicle;
}
