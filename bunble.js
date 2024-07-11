import nationsglory from '@api/nationsglory';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const clientSecret = 'SECRET_8X0lfEhQU5%29PAm%29zXI%5EeHXjOASNCOHj%4063075fc09bfecdebe8a06e4eae88ac6a';

    if (accessToken) {
        document.getElementById('accessToken').textContent = `Access Token: ${accessToken}`;

        nationsglory.auth('Bearer NGAPI_2QcqcEVbl%B%C(AxitjS$FLzMN8PtR)K714229c08db526fcf6db83f6d8e72e92');
        nationsglory.checktoken({
            access_token: accessToken,
            client_secret: clientSecret
        })
        .then(({ data }) => {
            const userInfoDiv = document.getElementById('userInfo');
            userInfoDiv.innerHTML = `
                <p>Username: ${data.username}</p>
                <p>IP: ${data.ip}</p>
                <p>Granted At: ${data.granted_at}</p>
                <p>Revoked At: ${data.revoked_at}</p>
            `;
        })
        .catch(err => console.error(err));
    }
});
