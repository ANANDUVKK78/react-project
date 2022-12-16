import * as fetchWrapper from './fetchWrapper';
import * as storageManager from './tokenManager';
import history from './utils/history'

const prefix:string = "emp-";
const joinClass = (...classNames): string => {
    return classNames
        .filter((className: string) => !!className)
        .map((className: string) =>
            className.startsWith(prefix) ? className : `${prefix}${className}`
        )
        .join(" ");
};

export {joinClass,fetchWrapper,storageManager,history}
