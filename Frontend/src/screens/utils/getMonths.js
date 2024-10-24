export function getMonth() {
    const month = new Date().getMonth() + 1;
    var monthName;
  
    if (month == 1) monthName = 'Enero';
    else if (month == 2) monthName = 'Febrero';
    else if (month == 3) monthName = 'Marzo';
    else if (month == 4) monthName = 'Abril';
    else if (month == 5) monthName = 'Mayo';
    else if (month == 6) monthName = 'Junio';
    else if (month == 7) monthName = 'Julio';
    else if (month == 8) monthName = 'Agosto';
    else if (month == 9) monthName = 'Septiembre';
    else if (month == 10) monthName = 'Octubre';
    else if (month == 11) monthName = 'Noviembre';
    else if (month == 12) monthName = 'Diciembre';
    
    return monthName;
  }
  
  export function getMonths() {
    const monthsAbbreviated = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const currentDate = new Date();
    const months = [];
  
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthValue = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = monthsAbbreviated[date.getMonth()]; // Solo el nombre del mes
      months.push({ label: monthLabel, value: monthValue });
    }
  
    return months;
  }
  
  export function getMonthName(index) {
    const month = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
  
    return month[index];
  }
  