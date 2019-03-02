import axios, { AxiosResponse, AxiosPromise } from 'axios';

export function updateLocalDb(payload: string): AxiosPromise<string> {
    return axios.post('http://localhost:8080/api/local', {
        payload: JSON.stringify(payload)
    });
}

export function updateRemoteDb(payload: string): AxiosPromise<string> {
    return axios.post('http://localhost:8080/api/remote', {
        payload
    })
}
