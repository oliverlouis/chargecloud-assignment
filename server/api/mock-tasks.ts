export default defineEventHandler(() => {
  return [
    {id: 101, title: 'Inspect Station #A1', description: 'Check cables and connectors', completed: false},
    {id: 102, title: 'Update Firmware on Station #B3', description: 'Apply latest security patch', completed: true},
    {id: 103, title: 'Clean Charging Ports at Station #C5', description: 'Remove debris and dust', completed: false},
    {id: 104, title: 'Verify Network Connectivity for Station #D2', description: 'Ensure stable internet connection', completed: false},
    {id: 105, title: 'Replace Broken Screen on Station #E4', description: 'Order and install new display', completed: true},
  ];
})
