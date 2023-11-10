import { Driver } from 'src/modules/driver/interfaces';
import { Category } from './category';

export interface License {
  nro_lic: string;
  fecha_expedicion: Date;
  fecha_vencimiento: Date;
  cedula?: Driver;
  cod_categoria?: Category;
}
