import { Vehicle } from '../interfaces';

export interface VehicleDto {
  placa: string;
  linea: string;
  marca: string;
  cedula?: string;
  tecnomecanica?: string;
  fecha_expedicion: Date;
  fecha_vencimiento?: Date;
  soat?: string;
  costo: number;
  fecha_vigencia: Date;
  fecha_final: Date;
  tipo: string;
  color: string;
}

export function useVehicle(data: VehicleDto[]) {
  const formatedData: Vehicle[] = data.map((dataLicense) => ({
    placa: dataLicense.placa,
    linea: dataLicense.linea,
    marca: dataLicense.marca,
    cedula: dataLicense.cedula,
    tecnomecanica: {
      nro_acreditacion: dataLicense.tecnomecanica,
      fecha_expedicion: dataLicense.fecha_expedicion,
      fecha_vencimiento: dataLicense.fecha_vencimiento,
    },
    soat: {
      nro_poliza: dataLicense.soat,
      fecha_vigencia: dataLicense.fecha_vigencia,
      fecha_final: dataLicense.fecha_final,
      costo: dataLicense.costo,
    },
    tipo_vehiculo: dataLicense.tipo,
    color: dataLicense.color,
  }));

  return {
    formatedData: formatedData,
    length: formatedData.length,
  };
}
