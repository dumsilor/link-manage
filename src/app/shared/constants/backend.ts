const MAIN_URL = "http://118.67.213.117:3000/api"

export const BACKUP_GET_URL = `${MAIN_URL}/backup`;
export const UPDATE_GET_URL = `${MAIN_URL}/update`;
export const UPDATE_ADD_URL = `${UPDATE_GET_URL}/add`;
export const UPDATE_COMPLETE_URL = `${UPDATE_GET_URL}/complete`;
export const UPDATE_DELETE_URL = `${UPDATE_GET_URL}/delete`;
export const SECRET_URL = `${MAIN_URL}/secrets`;
export const DELIVERY_URL = `${MAIN_URL}/delivery`
export const DELIVERY_CREATE_URL = `${DELIVERY_URL}/create`
export const DELIVERY_UPDATE_URL = `${DELIVERY_URL}/update`
