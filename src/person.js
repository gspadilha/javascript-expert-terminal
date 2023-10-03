export default class Person {
  language = "en-US";

  constructor({ id, vehicles, kmTraveled, from, to, value }) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
    this.value = value;
  }

  setLocale(language) {
    this.language = language;
    return this;
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
    }).format(new Date(data));
  }

  toMoney(data) {
    return new Intl.NumberFormat(this.language, {
      style: "currency",
      currency: "BRL",
    }).format(data);
  }
}
