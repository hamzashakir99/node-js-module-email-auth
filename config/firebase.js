module.exports = {
    notificationConfig: firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(path.join(__dirname, './203dc-firebase-adminsdk-29saq-8256c7c475.json'))
    })
}