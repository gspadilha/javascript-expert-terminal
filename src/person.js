const ENTRY_SEPARATOR = " ";
const VEHICLES_ENTRY_SEPARATOR = ",";

const DEFAULT_LOCALE = "pt-BR";
export default class Person {
  constructor({ id, vehicles, kmTraveled, from, to, value }) {
    this.language = DEFAULT_LOCALE;

    this.id = Number(id);
    this.vehicles = vehicles;
    this.kmTraveled = Number(kmTraveled);
    this.from = new Date(from);
    this.to = new Date(to);
    this.value = Number(value);
  }

  setLocale(language) {
    this.language = language;
    return this;
  }

  static getInformation(text) {
    const [id, vehicles, kmTraveled, from, to, value] =
      text.split(ENTRY_SEPARATOR);

    return new Person({
      id,
      vehicles: vehicles
        .split(VEHICLES_ENTRY_SEPARATOR)
        .map((item) => item.trim()),
      kmTraveled,
      from,
      to,
      value,
    });
  }

  format() {
    return {
      id: Number(this.id),
      vehicles: this.implode(this.vehicles),
      kmTraveled: this.toKilometer(this.kmTraveled),
      from: this.toDate(this.from),
      to: this.toDate(this.to),
      value: this.toMoney(this.value),
    };
  }

  implode(data) {
    return new Intl.ListFormat(this.language, {
      style: "long",
      type: "conjunction",
    }).format(data);
  }

  toKilometer(data) {
    return new Intl.NumberFormat(this.language, {
      style: "unit",
      unit: "kilometer",
    }).format(data);
  }

  toDate(data) {
    return new Intl.DateTimeFormat(this.language, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(data);
  }

  toMoney(data) {
    return new Intl.NumberFormat(this.language, {
      style: "currency",
      currency: "BRL",
    }).format(data);
  }
}
