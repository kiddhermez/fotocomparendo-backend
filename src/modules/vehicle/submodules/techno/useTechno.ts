import { CreateTechnoDto, UpdateTechnoDto } from '../../interfaces';

export function useCreateTechno(techno: CreateTechnoDto) {
  const endDate = new Date(techno.fecha_expedicion);
  endDate.setFullYear(endDate.getFullYear() + 1);

  return {
    ...techno,
    fecha_vencimiento: endDate,
  };
}

export function useUpdateTechno(techno: UpdateTechnoDto) {
  if (!techno.fecha_expedicion) {
    return techno;
  }

  const endDate = new Date(techno.fecha_expedicion);
  endDate.setFullYear(endDate.getFullYear() + 1);

  return {
    ...techno,
    fecha_vencimiento: endDate,
  };
}
