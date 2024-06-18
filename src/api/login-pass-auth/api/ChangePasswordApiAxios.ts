import {ChangePasswordApi} from "../ChangePasswordApi";
import {ChangePasswordForm} from "../form/ChangePasswordForm";
import {axiosInstance} from "../../../AxiosClient";

export class ChangePasswordApiAxios implements ChangePasswordApi {
    changePassword(form: ChangePasswordForm): Promise<void> {
        return axiosInstance.put('/password/change-password', form)
            .then(() => {});
    }

}