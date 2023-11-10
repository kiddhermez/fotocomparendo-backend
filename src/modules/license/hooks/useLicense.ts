import { License } from '../interfaces';

export interface LicenceDto {
  nro_lic: string;
  fecha_expedicion: Date;
  fecha_vencimiento: Date;
  cod_categoria: string;
  clase_vehiculo: string;
}

export function useLicense(data: LicenceDto[]) {
  const formatedData: License[] = data.map((dataLicense) => ({
    nro_lic: dataLicense.nro_lic,
    fecha_expedicion: dataLicense.fecha_expedicion,
    fecha_vencimiento: dataLicense.fecha_vencimiento,
    categoria: {
      cod_categoria: dataLicense.cod_categoria,
      clase_vehiculo: dataLicense.clase_vehiculo,
    },
  }));

  return {
    formatedData: formatedData,
    length: formatedData.length,
  };
}
