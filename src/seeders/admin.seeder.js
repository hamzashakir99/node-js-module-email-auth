const run = async () => {
    try {
        const genSalt = await bcrypt.genSalt(dataConstraint.saltRounds)
        const hashPassword = await bcrypt.hash("Neesilo123!", genSalt)
        // get user by super-admin type
        const user = await models["users"].findOne({ user_type: dataConstraint.userType.superAdmin })
        // update user
        await await models["users"].updateOne({ user_type: dataConstraint.userType.superAdmin }, {
            $set: {
                first_name: user && user.first_name ? user.first_name: 'Neesilo',
                last_name: user && user.last_name ? user.last_name: 'Project',
                password: user && user.password ? user.password: hashPassword,
                user_name: user && user.user_name ? user.user_name: 'neesilo',
                email_verify: user && user.email_verify ? user.email_verify: true,
                user_type: user && user.user_type ? user.user_type: dataConstraint.userType.superAdmin,
                email: user && user.email ? user.email: 'ade@neesilo.com',
            }
        }, { upsert: true })
    } catch (error) {
        console.log(error);
    }
}

run();