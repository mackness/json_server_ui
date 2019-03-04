import axios, { AxiosResponse, AxiosPromise } from 'axios';

export function getLocalDbState(): AxiosPromise<string> {
    return axios.get('http://localhost:8080/api/db');
}

export function updateLocalDb(payload: string): AxiosPromise<string> {
    return axios.post('http://localhost:8080/api/local', {
        payload: JSON.stringify(payload),
    });
}

export function updateRemoteDb(payload: string): AxiosPromise<string> {
    return axios.post('http://localhost:8080/api/remote', {
        payload,
    });
}

export function openExternal(payload: string): AxiosPromise<string> {
    return axios.post('http://localhost:8080/api/external', {
        payload,
    });
}

export function displayContextMenu(payload: string): AxiosPromise<string> {
    return axios.post('http://localhost:8080/api/menu', {
        payload,
    });
}
