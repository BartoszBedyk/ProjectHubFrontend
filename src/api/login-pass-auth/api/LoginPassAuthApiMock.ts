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
        return mockTimeout(2000).then(() => {
           console.log("User registered successfully", form);
        });
    }
    resetPasswordRequest(form: ResetPasswordForm): Promise<void> {
        return mockTimeout(2000).then(() => {
            console.log("Password reset request sent successfully", form);
        });
    }
    resetPassword(form: ResetPasswordConfirmForm): Promise<void> {
        return mockTimeout(2000).then(() => {
            console.log("Password reset successfully", form);
        });
    }
}