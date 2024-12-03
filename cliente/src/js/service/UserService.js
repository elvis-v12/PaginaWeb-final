export class UserService {
    findPostulantesBeca = async () => {
        try {
            const response = await fetch('/cliente/src/data/dataUsers.json');
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    findUsersDetallesPago = async () => {
        try {
            const response = await fetch('/cliente/src/data/dataUserPagos.json');
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}