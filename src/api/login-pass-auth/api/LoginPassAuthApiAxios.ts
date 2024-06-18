import {LoginPassAuthApi} from "../LoginPassAuthApi";
import {LoginForm} from "../form/LoginForm";
import {LoginResponseDto} from "../response/LoginResponseDto";
import {CreateUserWithPasswordForm} from "../form/CreateUserWithPasswordForm";
import {ResetPasswordForm} from "../form/ResetPasswordForm";
import {ResetPasswordConfirmForm} from "../form/ResetPasswordConfirmForm";
import {axiosInstance} from "../../../AxiosClient";

export class LoginPassAuthApiAxios implements LoginPassAuthApi {
    login(form: LoginForm): Promise<LoginResponseDto> {
        return axiosInstance.post<LoginResponseDto>('/auth/login', form)
            .then(response => response.data);
    }
    register(form: CreateUserWithPasswordForm): Promise<void> {
        return axiosInstance.post('/auth/register', form)
            .then(() => {});
    }
    resetPasswordRequest(form: ResetPasswordForm): Promise<void> {
        return axiosInstance.post('/auth/reset-password-request', form)
            .then(() => {});
    }
    resetPassword(form: ResetPasswordConfirmForm): Promise<void> {
        return axiosInstance.put('/auth/reset-password', form)
            .then(() => {});
    }
}