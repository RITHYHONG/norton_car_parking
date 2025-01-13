"use client";
import Image from 'next/image';
import { CarLog } from '@/types/carLog';
import { formatDate } from '@/utils/dateFormatter';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { useState } from 'react';

interface CarLogsTableProps {
  logs: CarLog[];
}

export default function CarLogsTable({ logs }: CarLogsTableProps) {
  const [selectedLog, setSelectedLog] = useState<CarLog | null>(null);

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plate Number</TableHead>
            <TableHead>Entry Time</TableHead>
            <TableHead>Exit Time</TableHead>
            <TableHead>Slot Number</TableHead>
            <TableHead>License Plate Image</TableHead>
            <TableHead className="text-right py-2 flex justify-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.plateNumber}</TableCell>
              <TableCell>{formatDate(log.entryTime)}</TableCell>
              <TableCell>{formatDate(log.exitTime)}</TableCell>
              <TableCell>{log.slotNumber}</TableCell>
              <TableCell>
                <Image
                  src={log.licensePlateImage}
                  alt={`License plate ${log.plateNumber}`}
                  width={100}
                  height={50}
                  className="object-cover rounded-md"
                />
              </TableCell>
              <TableCell className="text-right flex justify-center items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedLog(log)}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Car Log Details</DialogTitle>
                            <DialogDescription>
                              Detailed information about the car log entry.
                            </DialogDescription>
                          </DialogHeader>
                          {selectedLog && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Log ID:</span>
                                <span>{selectedLog.id}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Plate Number:</span>
                                <span>{selectedLog.plateNumber}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Entry Time:</span>
                                <span>{formatDate(selectedLog.entryTime)}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Exit Time:</span>
                                <span>{formatDate(selectedLog.exitTime)}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Slot Number:</span>
                                <span>{selectedLog.slotNumber}</span>
                              </div>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <span className="font-bold">Status:</span>
                                <Badge variant={selectedLog.exitTime ? "default" : "secondary"}>
                                  {selectedLog.exitTime ? "Exited" : "Parked"}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 items-center gap-4">
                                <span className="font-bold">License Plate Image:</span>
                                <Image
                                  src={selectedLog.licensePlateImage}
                                  alt={`License plate ${selectedLog.plateNumber}`}
                                  width={200}
                                  height={100}
                                  className="object-cover rounded-md"
                                />
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View car log details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

