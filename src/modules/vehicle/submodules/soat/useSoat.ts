import { CreateSoatDto, UpdateSoatDto } from '../../interfaces';

export function useCreateSoat(soat: CreateSoatDto) {
  const endDate = new Date(soat.fecha_vigencia);
  endDate.setFullYear(endDate.getFullYear() + 1);

  return {
    ...soat,
    fecha_final: endDate,
  };
}

export function useUpdateSoat(soat: UpdateSoatDto) {
  if (!soat.fecha_vigencia) {
    return soat;
  }

  const endDate = new Date(soat.fecha_vigencia);
  endDate.setFullYear(endDate.getFullYear() + 1);

  return {
    ...soat,
    fecha_final: endDate,
  };
}
