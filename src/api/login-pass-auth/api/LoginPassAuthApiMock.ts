import {LoginPassAuthApi} from "../LoginPassAuthApi";
import {LoginResponseDto} from "../response/LoginResponseDto";
import {mockTimeout} from "../../ApiUtils";
import {LoginForm} from "../form/LoginForm";
import {CreateUserWithPasswordForm} from "../form/CreateUserWithPasswordForm";
import {ResetPasswordForm} from "../form/ResetPasswordForm";
import {ResetPasswordConfirmForm} from "../form/ResetPasswordConfirmForm";

export class LoginPassAuthApiMock implements LoginPassAuthApi {
    login(form: LoginForm): Promise<LoginResponseDto> {
        return mockTimeout(2000).then(() => ({
            token: "TOKEN",
            type: "TYPE",
        }))
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