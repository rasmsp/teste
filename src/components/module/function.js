export default class Function {
  static convertTimestampToDate(value) {
    if (
      typeof value === 'undefined' ||
      value === undefined ||
      value === 'undefined' ||
      value === null ||
      Number.isNaN(value)
    )
      return '';

    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(value);
  }

  static convertDateToTimestamp(value) {
    const arr = value.split('/');

    const dt = +new Date(
      new Date(`${arr[2]}-${arr[1]}-${arr[0]}`).getTime() + 24 * 60 * 60 * 1000
    );

    return dt;
  }

  static formatCurrency(prefixParam, valueParam) {
    let prefix = prefixParam;
    let value = valueParam;
    prefix = prefix === 'undefined' || prefix === undefined ? '' : prefix;
    value = value === 'undefined' || value === undefined ? 0 : value;

    let newValue = this.formatDecimal(value.toString(), 2, true);
    newValue = newValue.toString().replace('-', '');

    return parseFloat(value) >= 0
      ? `${prefix} ${newValue}`
      : `-${prefix} ${newValue}`;
  }

  static formatDecimal(valueParam, DecimalQtd, onchange) {
    let value = valueParam;
    if (onchange) {
      value = value.split('.').join('').replace(',', '');
    } else {
      value = value.toFixed(DecimalQtd).replace('.', '').replace(',', '');
    }
    const num = Number(value);

    const divisor = parseInt(`1${this.Right('0000000', DecimalQtd)}`, 10);
    if (Number.isNaN(num)) return '0,00';

    value = (num / divisor).toFixed(DecimalQtd).replace('.', ',');
    const part = value.split(',');
    const partOne = this.formatInt(part[0]).toString();
    const partTwo = part[1].toString();

    return `${partOne},${partTwo}`;
  }

  static formatInt(valueParam) {
    let value = valueParam;
    if (Number.isNaN(parseFloat(value))) return '';

    value = value.split('.').join('');
    return parseFloat(value).toLocaleString('pt-BR');
  }

  static Right(str, n) {
    if (n <= 0) return '';
    if (n > String(str).length) return str;

    const iLen = String(str).length;
    return String(str).substring(iLen, iLen - n);
  }

  static isValidDate(date) {
    const newValue = date.split('/').join('');

    if (Number.isNaN(newValue)) {
      return false;
    }
    if (date.length < 10) return true;

    const temp = date.split('/');

    const d = new Date(`${temp[1]}/${temp[0]}/${temp[2]}`);

    return (
      d &&
      d.getMonth() + 1 == temp[1] &&
      d.getDate() == Number(temp[0]) &&
      d.getFullYear() == Number(temp[2])
    );
  }

  static extentionFile(file) {
    const f = file.split('.');
    return f[1];
  }
}
