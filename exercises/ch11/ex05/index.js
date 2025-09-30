export function detectFileType(arrayBuffer) {
    const uint8 = new Uint8Array(arrayBuffer);
    // PDF: 25 50 44 46 2D 
    if (uint8[0] === 0x25 && uint8[1] === 0x50 && uint8[2] === 0x44 && uint8[3] === 0x46) {
        return "PDF";
    }
    // ZIP: 50 4B 03 04 or 50 4B 05 06 or 50 4B 07 08
    if (uint8[0] === 0x50 && uint8[1] === 0x4b && uint8[2] === 0x03 && uint8[3] === 0x04) {
        return "ZIP";
    }
    if (uint8[0] === 0x50 && uint8[1] === 0x4b && uint8[2] === 0x05 && uint8[3] === 0x06) {
        return "ZIP";
    }
    if (uint8[0] === 0x50 && uint8[1] === 0x4b && uint8[2] === 0x07 && uint8[3] === 0x08) {
        return "ZIP";
    }
    // GIF: 47 49 46 38 37 61 or 47 49 46 38 39 61
    if (uint8[0] === 0x47 && uint8[1] === 0x49 && uint8[2] === 0x46 && uint8[3] === 0x38 && uint8[4] === 0x37 && uint8[5] === 0x61) {
        return "GIF";
    }
    if (uint8[0] === 0x47 && uint8[1] === 0x49 && uint8[2] === 0x46 && uint8[3] === 0x38 && uint8[4] === 0x39 && uint8[5] === 0x61) {
        return "GIF";
    }
    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (uint8[0] === 0x89 && uint8[1] === 0x50 && uint8[2] === 0x4E && uint8[3] === 0x47 && uint8[4] === 0x0D && uint8[5] === 0x0A && uint8[6] === 0x1A && uint8[7] === 0x0A) {
        return "PNG";
    }
    return "UNKNOWN";
}