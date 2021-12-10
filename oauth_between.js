const accessTokens = [];

function getAccessTokens(){
    return accessTokens;
}

function pushAccessTokens(token){
    accessTokens.push(token);
}

function popAccessTokens(){
    accessTokens.pop();
}

module.exports = {getAccessTokens, pushAccessTokens, popAccessTokens};