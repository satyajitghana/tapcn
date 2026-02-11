'use client';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './theme';

const rows = [
  { invoice: 'INV001', status: 'Paid', amount: '$250.00' },
  { invoice: 'INV002', status: 'Pending', amount: '$150.00' },
  { invoice: 'INV003', status: 'Unpaid', amount: '$350.00' },
];

export function TablePreview() {
  return (
    <View style={s.table}>
      <View style={s.headerRow}>
        <Text style={[s.cell, s.headerText, s.col1]}>Invoice</Text>
        <Text style={[s.cell, s.headerText, s.col2]}>Status</Text>
        <Text style={[s.cell, s.headerText, s.col3]}>Amount</Text>
      </View>
      {rows.map((row, i) => (
        <View key={i} style={s.row}>
          <Text style={[s.cell, s.col1, s.cellBold]}>{row.invoice}</Text>
          <Text style={[s.cell, s.col2]}>{row.status}</Text>
          <Text style={[s.cell, s.col3, s.cellRight]}>{row.amount}</Text>
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  table: { width: 340, borderWidth: 1, borderColor: colors.border, borderRadius: 8, overflow: 'hidden' },
  headerRow: {
    flexDirection: 'row', backgroundColor: colors.muted, borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  cell: { paddingVertical: 10, paddingHorizontal: 12, fontSize: 14, color: colors.foreground },
  headerText: { fontWeight: '500', color: colors.mutedForeground },
  col1: { flex: 1 },
  col2: { flex: 1 },
  col3: { width: 90 },
  cellBold: { fontWeight: '500' },
  cellRight: { textAlign: 'right' },
});
