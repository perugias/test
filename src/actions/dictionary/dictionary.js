import { fetch } from '../../store/parse'
import { baseComponentApi } from '../../store/api'

export async function getDictionaryListApi(params) {
    return fetch({
        url: baseComponentApi + '/biz-center-web/bizcenter/dataDictionaryWeb/getDataDictionaryList', options: {
            method: 'POST',
            withCredentials: true,
            data: params || {}
        }
    })
}
export async function getMember(params) {
    return fetch({
        url: 'http://59.110.156.197:8082/api/users/', options: {
            method: 'GET',
            withCredentials: true,
            data: params || {}
        }
    })
}
export async function addMember(params) {
    return fetch({
        url: 'http://59.110.156.197:8082/api/users/', options: {
            method: 'POST',
            withCredentials: true,
            data: params || {}
        }
    })
}
export async function deleteMember(params) {
    return fetch({
        url: `http://59.110.156.197:8082/api/user/${params}/`, options: {
            method: 'DELETE',
            withCredentials: true,
            data: params || {}
        }
    })
}

export async function getTask(params) {
    return fetch({
        url: 'http://127.0.0.1:8000/api/tasks/', options: {
            method: 'GET',
            withCredentials: true,
            data: params || {}
        }
    })
}

export async function addTask(params) {
    return fetch({
        url: 'http://127.0.0.1:8000/api/tasks/', options: {
            method: 'POST',
            withCredentials: true,
            data: params || {}
        }
    })
}

export async function deleteTask(params) {
    return fetch({
        url: `http://127.0.0.1:8000/api/tasks/${params}/`, options: {
            method: 'DELETE',
            withCredentials: true,
            data: params || {}
        }
    })
}
export async function editTask(params) {
    return fetch({
        url: `http://127.0.0.1:8000/api/tasks/${params.id}/`, options: {
            method: 'PUT',
            withCredentials: true,
            data: params || {}
        }
    })
}

