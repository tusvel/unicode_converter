class Unicode
{
  static instance?: Unicode;

  constructor() {
    if (Unicode.instance) {
      return Unicode.instance;
    }

    Unicode.instance = this;
  }

  get(str: string): string[]
  {
    // Array or char points.
    const values: string[] = [];

    // Iterate for each char and get its number.
    for (const char of str) {
      // Get Unicode point
      const point = char.codePointAt(0).toString(16);

      // Get unicode block
      let zeroes_in_block = 0;
      if (point.length < 4)
      {
        zeroes_in_block = 4 - point.length;
      }
      values.push("U+" + "0".repeat(zeroes_in_block) + point);
    }
    return values;
  }
}

class UTF8
{
  textEncoder = new TextEncoder();
  static instance?: UTF8;

  constructor() {
    if (UTF8.instance) {
      return UTF8.instance;
    }

    UTF8.instance = this;
  }

  code(str: string): string[]
  {
    const result: string[] = [];
    for (const char of str)
    {
      const arr = this.textEncoder.encode(char);
      for (const el of arr)
      {
        const binary = el.toString(2);
        const zeroes = "0".repeat(8 - binary.length);
        result.push(zeroes + binary);
      }
    }
    return result;
  }
}

class Data
{
  text: string;
  unicode = new Unicode();
  utf8 = new UTF8();

  setText(text: string)
  {
    this.text = text;
  }

  getUnicode()
  {
    return this.unicode.get(this.text);
  }

  getUTF8()
  {
    return this.utf8.code(this.text);
  }
}

const data = new Data();

const input = document.getElementById('input') as HTMLInputElement;
const unicode = document.getElementById('unicode') as HTMLDivElement;
const utf8 = document.getElementById('utf8') as HTMLDivElement;

input.addEventListener('keyup', () => {
  data.setText(input.value);
  unicode.innerText = data.getUnicode().join(', ');
  utf8.innerText = data.getUTF8().join(' ');
})
