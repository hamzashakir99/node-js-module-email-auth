const addDomainToVercel = async (name, gitBranch) => {
    try {
        const response = await axios.post(`https://api.vercel.com/v9/projects/${dataConstraint.clientVercelProjectID}/domains`, {
            name, // "dev-client-front-end-1.vercel.app"
            gitBranch // development or production
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
            }
        })
        return response.status == 200 ? true : false
    } catch (error) {
        console.log(error.response);
        return false;
    }
}

const deployToVercel = async (gitBranch) => {
    try {
        if(gitBranch == dataConstraint.gitBranch.dev){
            const response = await axios.get(`https://api.vercel.com/v1/integrations/deploy/prj_u59dgovz7hlzeOj28HGa22sfeCGX/xHYuEABMhm`, {
                headers: {
                    'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
                }
            })
            return response.status == 200 ? true : false
        }
    } catch (error) {
        console.log(error.response);
        return false;
    }
}



module.exports = {
    addDomainToVercel,
    deployToVercel
}