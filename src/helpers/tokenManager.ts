

const getValue = (item: string): string => {
    return (localStorage.getItem(item));
}

const setHeaders = (token: boolean) => {
    const headerObj = {};
    headerObj['Content-Type'] = 'application/json';
    if (token) {
        const accessToken = getValue('token');
        headerObj['Authorization'] = `${accessToken}`;
    }
    return headerObj;

}



const saveValue = (label: string, item: string): void => {
    localStorage.setItem(label, item);
}



const removeValue = (item: string): void => {
    localStorage.removeItem(item);
}


export { setHeaders, getValue, saveValue, removeValue };
