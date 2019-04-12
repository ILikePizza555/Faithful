interface RGBAValues {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

export class Color {
    private _data: Uint8ClampedArray;

    /**
     * Creates a new Color object from rgba values in the range of [0, 255].
     */
    public constructor(red = 0, green = 0, blue = 0, alpha = 255) {
        this._data = new Uint8ClampedArray([red, green, blue, alpha])
    }

    public get hex6(): string {
        return "#" +
            this._data[0].toString(16) +
            this._data[1].toString(16) +
            this._data[2].toString(16)
    }

    public get hex8(): string {
        return this.hex6 + this._data[3].toString(16);
    }

    public get rgba(): RGBAValues {
        return {
            red: this._data[0],
            green: this._data[1],
            blue: this._data[2],
            alpha: this._data[3]
        };
    }

    public get intensity(): number {
        return (this._data[0] / 255 + 
                this._data[1] / 255 +
                this._data[2] / 255) / 3;
    }

    public get luminance(): number {
        return (this._data[0] / 255 * 0.2989 +
                this._data[1] / 255 * 0.5970 +
                this._data[2] / 255 * 0.1140);
    }
}

/**
 * Splits a string into n-sized chunks.
 * @param str 
 * @param n 
 */
function chunkString(str: string, n: number): string[] {
    const r = new RegExp(`(.{${n}}`, "g");
    return str.split(r).filter(o=>o);
}

export function fromHex(hexcode: string): Color {
    const hexRegex = /^#?((?:[a-f0-9]{3}|[a-f0-9]{6}|[a-f0-9]{8})(?!.))/i;
    const matches = hexcode.match(hexRegex);

    // Validate the match
    if (!matches) {
        throw new Error("Invalid hexcode " + hexcode);
    }

    // Split the hex string into groups of 2
    let hexString: string[] = [];
    if(matches[1].length == 3) {
        hexString = [
            matches[1].charAt(0) + matches[1].charAt(0), 
            matches[1].charAt(1) + matches[1].charAt(1),
            matches[1].charAt(2) + matches[1].charAt(2),
            "ff"
        ];
    } else if (matches[1].length == 6) {
        hexString = chunkString(matches[1] + "ff", 2);
    } else if (matches[1].length == 8) {
        hexString = chunkString(matches[1], 2);
    }

    return new Color(...hexString.map(s => parseInt(s, 16)));
}