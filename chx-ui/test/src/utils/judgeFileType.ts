const TYPES = {
  sqlite: 199196,
  flv: 7076,
  swf: 6787,
  gif: 7173,
  jpg: 255216,
  jpeg: 255216,
  png: 13780,
  bmp: 6677,
  txt: 239187,
  aspx: 239187,
  asp: 239187,
  sql: 239187,
  xls: 208207,
  doc: 208207,
  ppt: 208207,
  xml: 6063,
  htm: 6033,
  html: 6033,
  js: 4742,
  xlsx: 8075,
  zip: 8075,
  pptx: 8075,
  mmap: 8075,
  docx: 8075,
  rar: 8297,
  exe: 7790,
  psd: 5666,
  pdf: 3780
};
const TYPE_MAP = new Map(Object.entries(TYPES));

export default function judgeFileType(file: Blob, types: Array<keyof typeof TYPES>) {
  !Array.isArray(types) && (types = [types]);
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = function() {
      try {
        const rawData = reader.result as ArrayBuffer;

        const data = new Uint8Array(rawData).join('');

        const result = types.some(type => {
          const code = TYPE_MAP.get(type);
          return code ? data.startsWith(code.toString()) : false;
        });
        resolve(result);
      } catch {
        resolve(false);
      }
    };
    try {
      reader.readAsArrayBuffer(file);
    } catch {
      resolve(false);
    }
  });
}
