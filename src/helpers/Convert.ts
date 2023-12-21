export const formatFileSize = (bytes: number, dm: number = 0) =>  {
    if (bytes === 0) return '0 octets';

    const k = 1024;
    const sizes = ['octets', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}