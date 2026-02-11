'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Text } from '@/components/ui/text';

const rows = [
  { invoice: 'INV001', status: 'Paid', amount: '$250.00' },
  { invoice: 'INV002', status: 'Pending', amount: '$150.00' },
  { invoice: 'INV003', status: 'Unpaid', amount: '$350.00' },
];

export function TablePreview() {
  return (
    <Table className="w-[340px]">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Text>Invoice</Text>
          </TableHead>
          <TableHead>
            <Text>Status</Text>
          </TableHead>
          <TableHead className="items-end">
            <Text>Amount</Text>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.invoice}>
            <TableCell>
              <Text className="font-medium">{row.invoice}</Text>
            </TableCell>
            <TableCell>
              <Text>{row.status}</Text>
            </TableCell>
            <TableCell className="items-end">
              <Text>{row.amount}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
