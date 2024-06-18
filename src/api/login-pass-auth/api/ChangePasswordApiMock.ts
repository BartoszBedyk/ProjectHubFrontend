import {ChangePasswordApi} from "../ChangePasswordApi";
import {ChangePasswordForm} from "../form/ChangePasswordForm";
import {mockTimeout} from "../../ApiUtils";

export class ChangePasswordApiMock implements ChangePasswordApi {
    changePassword(form: ChangePasswordForm): Promise<void> {
        return mockTimeout(2000).then(() => {
            console.log("Password changed successfully", form);
        });
    }

}