import axios from "axios";

export const uploadFile = async (file) => {
    try {
        return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/attachment`, {
            filename: file.name
        }, {headers: {"X-ROUTE": "public"}}).then(async res => {
            if (res.status === 200) {
                const {presigned_url, public_url, filename} = res.data.message;
                console.log('Uploading ... ', filename);
                return await axios.put(presigned_url, file, {headers: {"Content-Type": file.type}}).then(async res => {
                    if (res.status === 200) {
                        console.log("Upload Success", filename, public_url);
                        return {
                            name: filename,
                            path: public_url
                        }
                    }
                });
            }
        });
    } catch (err) {
        console.error(err);
    }
};

export const checkSubscription = async (user_id) => {
    try {
        const auth_token = localStorage.getItem("auth_token");
        const refresh_token = localStorage.getItem("refresh_token");
        return axios.get(`https://ghhrzz65r1.execute-api.ap-southeast-2.amazonaws.com/dev/installed-app`, {
            params: {
                userID: user_id
            },
            headers: {
                Authorization: `Bearer ${auth_token}`,
                "X-REFRESH-TOKEN": refresh_token,
            },
        }).then(async res => {
            if (res.status === 200) {
                //const {presigned_url, public_url, filename} = res.data.message;
                console.log('Subscription ... ', res);
            }
        });

    } catch (err) {
        console.error(err);
    }
};