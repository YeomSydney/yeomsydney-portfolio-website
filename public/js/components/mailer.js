export function SendMail(form) {
    return new Promise((resolve, reject) => {
        const data = new FormData(form);
        fetch('public/includes/mail/send.php', {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(result => {
            if (result.message) {
                resolve(result);
            } else {
                reject(result);
            }
            })
            .catch(error => {
            reject({ message: "Unable to send email." });
            });
        });
    }