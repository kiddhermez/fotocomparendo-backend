import {
  CreateSoatDto,
  CreateTechnoDto,
  Soat,
  Techno,
  Vehicle,
} from './interfaces';

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

interface CreateVehicleDto {
  letra: string;
  numero: string;
  linea: string;
  marca: string;
  cedula: string;
  soat: Soat;
  tecnomecanica: Techno;
  codigo: string;
  id_color: string;
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

export function useCreateVehicle(data: CreateVehicleDto) {
  const formatedVehicle: Vehicle = {
    letra: data.letra.toUpperCase(),
    numero: data.numero,
    linea: data.linea,
    marca: data.marca,
    cedula: data.cedula,
    id_color: data.id_color,
    codigo: data.codigo,
    nro_acreditacion: data.tecnomecanica.nro_acreditacion,
    nro_poliza: data.soat.nro_poliza,
  };

  const formatedTechno: CreateTechnoDto = {
    nro_acreditacion: data.tecnomecanica.nro_acreditacion,
    fecha_expedicion: data.tecnomecanica.fecha_expedicion,
  };

  const formatedSoat: CreateSoatDto = {
    nro_poliza: data.soat.nro_poliza,
    fecha_vigencia: data.soat.fecha_vigencia,
    costo: data.soat.costo,
  };

  return {
    newVehicle: formatedVehicle,
    newTechno: formatedTechno,
    newSoat: formatedSoat,
  };
}
