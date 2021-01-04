import fly from "@/utils/lib/request";
// import { ElMessage } from 'element-plus';

// function test_login() {
//     return fly.get('/api/auth/login', {
//         username: this.username,
//         password: this.password
//     }).then(response => {
//         ElMessage(response)
//     }).catch(() => {
//         return false
//     })
// }

export function test_login() {
    return fly.post('/login', {
        username: "admin",
        password: "admin"
    }).then(response => {
        // ElMessage(response)
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    })
}
// export function test_get_root() {
//     return fly.get('/')
// }



// //通过用户id获取信息,参数直接写在url中
// fly.get('/user?id=133')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// //query参数通过对象传递
// fly.get('/user', {
//       id: 133
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });