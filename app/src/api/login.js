import { request } from '@/utils/request';
function login(method, url, params) {
    return request(method, url, params)
}
function getCode(method, url, params) {
    return request(method, url, params)
}
export {
    login,
    getCode
}