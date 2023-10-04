declare global {
  interface String {
    getValueBySplit(idx: number, defVal?: string): string;
    getValue(): string;
  }
}

export function getValueBySplit(idx: number, defVal: string = ""): string {
    const parts = this.split("|");

    if (idx >= 0 && idx < parts.length) {
      return parts[idx];
    }

    return defVal;
}

export function getValue(): string {
  try {
    if (
      this == undefined ||
      this === null ||
      this.toUpperCase() === 'NULL' ||
      this.toUpperCase() === 'INVALID DATE'
    ) {
      return '';
    }
  } catch (err) {
    return '';
  }

  return this;
}
