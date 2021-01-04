import { ElMessage } from 'element-plus';
import fly from "@/utils/lib/request";
export function login(loginForm) {
    return fly.post('/login', {
        username: loginForm.username,
        password: loginForm.password
    }).then(response => {
        if (response.msg == 'SUCCESS') {
            //this.token = response.data.token
            return true
        } else {
            ElMessage.error(response['message'])
        }
    }).catch(function (error) {
        console.log(error);
        return false
    })
}