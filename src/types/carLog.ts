export interface CarLog {
  id: string;
  plateNumber: string;
  entryTime: string;
  exitTime?: string;
  duration?: string;
  fee?: number;
  status: 'parked' | 'exited';
}
