import {LoginPassAuthApi} from "../LoginPassAuthApi";
import {LoginForm} from "../form/LoginForm";
import {LoginResponseDto} from "../response/LoginResponseDto";
import {CreateUserWithPasswordForm} from "../form/CreateUserWithPasswordForm";
import {ResetPasswordForm} from "../form/ResetPasswordForm";
import {ResetPasswordConfirmForm} from "../form/ResetPasswordConfirmForm";

export class LoginPassAuthApiAxios implements LoginPassAuthApi {
    login(form: LoginForm): Promise<LoginResponseDto> {
        throw new Error("Method not implemented.");
    }
    register(form: CreateUserWithPasswordForm): Promise<void> {
        throw new Error("Method not implemented.");
    }
    resetPasswordRequest(form: ResetPasswordForm): Promise<void> {
        throw new Error("Method not implemented.");
    }
    resetPassword(form: ResetPasswordConfirmForm): Promise<void> {
        throw new Error("Method not implemented.");
    }

}