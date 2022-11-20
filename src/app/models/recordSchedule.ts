export interface RecordSchedule{
  id: number;
  usuarioid: number;
  total_intereses: number;
  total_amortizacion: number;
  total_seguro: number;
  comisiones: number;
  recompra: number;
  desembolso: number;
  initialScheduleid: number;
  finalScheduleid: number;
  fecha: string;

}
