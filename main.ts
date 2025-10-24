class Unicode
{
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
  code(str: string)
  {

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
  }
}

const data = new Data();

const input = document.getElementById('input') as HTMLInputElement;
const unicode = document.getElementById('unicode') as HTMLDivElement;
const utf8 = document.getElementById('utf8') as HTMLDivElement;
const utf16 = document.getElementById('utf16') as HTMLDivElement;
const utf32 = document.getElementById('utf32') as HTMLDivElement;

input.addEventListener('keyup', () => {
  data.setText(input.value);
  unicode.innerText = data.getUnicode().join(', ');
})

document.getElementById('utf')
